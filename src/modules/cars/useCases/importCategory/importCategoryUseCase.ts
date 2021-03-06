import fs from 'fs'
import { parse } from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface IImportCategory {
  name: string
  description: string
}
@injectable()
export class ImportCategoryUseCase {
  constructor (
    @inject('CategoriesRepository')
    private readonly categoriesRepositories: ICategoriesRepository) {}

  async loadCategories (file: Express.Multer.File): Promise<IImportCategory[]> {
    return await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []
      const parseFile = parse()
      stream.pipe(parseFile)
      parseFile.on('data', (line) => {
        const [name, description] = line
        categories.push({
          name,
          description
        })
      }).on('end', () => {
        void fs.promises.unlink(file.path)
        resolve(categories)
      }).on('error', (err) => reject(err))
    })
  }

  async execute (file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    categories.map(async (category) => {
      const { name, description } = category
      const existCategory = await this.categoriesRepositories.findByName(name)
      if (!existCategory) {
        await this.categoriesRepositories.create({
          name,
          description
        })
      }
    })
  }
}
