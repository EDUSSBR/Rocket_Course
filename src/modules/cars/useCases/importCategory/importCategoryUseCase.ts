import fs from 'fs'
import { parse } from 'csv-parse'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

export class ImportCategoryUseCase {
  constructor (private readonly categoriesRepositories: ICategoriesRepository) {}

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
        fs.promises.unlink(file.path)
        resolve(categories)
      }).on('error', (err) => reject(err))
    })
  }

  async execute (file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    categories.map((category) => {
      const { name, description } = category
      const existCategory = this.categoriesRepositories.findByName(name)
      if (!existCategory) {
        this.categoriesRepositories.create({
          name,
          description
        })
      }
    })
  }
}
