import { getRepository, Repository } from 'typeorm'
import { ICategoriesRepository, ICreateCategoryDTO } from '../../../repositories/ICategoriesRepository'
import { Category } from '../entities/Category'

export class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>

  constructor () {
    this.repository = getRepository(Category)
  }

  async create ({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = await this.repository.create({
      name,
      description
    })
    await this.repository.save(category)
  }

  async list (): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName (name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
}
