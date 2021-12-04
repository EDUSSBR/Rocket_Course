import { Category } from '../../model/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

export class ListCategoriesUseCase {
  constructor (private readonly categoriesRepository: ICategoriesRepository) {}
  execute (): Category[] {
    const categories = this.categoriesRepository.list()
    return categories
  }
}
