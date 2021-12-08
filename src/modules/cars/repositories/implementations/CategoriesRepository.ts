import { getRepository, Repository } from 'typeorm'
import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>

  constructor () {
    this.repository = getRepository(Category)
  }

  async create ({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    })
    await this.repository.save(category)
  }

  async list (): Promise<Category[]> {
    return await this.repository.find()
  }

  async findByName (name: string): Promise<Category> {
    return await this.repository.findOne({ name })
  }
}
