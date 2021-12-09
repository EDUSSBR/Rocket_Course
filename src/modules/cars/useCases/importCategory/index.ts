import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ImportCategoryController } from './importCategoryController'
import { ImportCategoryUseCase } from './importCategoryUseCase'

export default (): ImportCategoryController => {
  const categoriesRepositories = new CategoriesRepository()
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepositories)
  const importCategoryController = new ImportCategoryController(importCategoryUseCase)
  return importCategoryController
}
