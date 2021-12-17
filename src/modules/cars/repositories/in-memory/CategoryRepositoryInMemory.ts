import { Category } from '../../infra/typeorm/entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

export class CategoryRepositoryInMemory implements ICategoriesRepository {
  categories: Category[]=[]

  async findByName (name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name)
    return category
  }

  async list (): Promise<Category[]> {
    const all = this.categories
    return all
  }

  async create ({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category()
    Object.assign(newCategory, { name, description })
    this.categories.push(newCategory)
  }
}
