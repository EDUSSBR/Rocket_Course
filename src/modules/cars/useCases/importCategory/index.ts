import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ImportCategoryController } from './importCategoryController'
import { ImportCategoryUseCase } from './importCategoryUseCase'

const categoriesRepositories = CategoriesRepository.getInstance()
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepositories)
export const importCategoryController = new ImportCategoryController(importCategoryUseCase)
