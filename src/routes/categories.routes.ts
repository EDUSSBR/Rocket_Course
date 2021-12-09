import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController'
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController'

const categoriesRoutes = Router()
const upload = multer({
  dest: './tmp'
})
const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoryController.handle)

categoriesRoutes.post('/import', importCategoryController.handle)

export { categoriesRoutes }
