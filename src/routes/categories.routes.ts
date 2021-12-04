import { Router } from 'express'
import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'

const categoriesRoutes = Router()
categoriesRoutes.post('/', (req, resp) => {
  return createCategoryController.handle(req, resp)
})

categoriesRoutes.get('/', (req, resp) => {
  return listCategoriesController.handle(req, resp)
})

export { categoriesRoutes }
