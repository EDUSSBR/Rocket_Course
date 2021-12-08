import { Category } from '../entities/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository'

export class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName: (name: string) => Promise<Category>
  list: () => Promise<Category[]>
  create: ({ name, description }: ICreateCategoryDTO) => Promise<void>
}
