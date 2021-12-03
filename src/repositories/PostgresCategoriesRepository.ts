import { Category } from '../model/Category'
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository'

export class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName: (name: string) => Category
  list: () => Category[]
  create: ({ name, description }: ICreateCategoryDTO) => void
}
