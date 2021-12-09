import { Router } from 'express'
import multer from 'multer'
import createCategoryController from '../modules/cars/useCases/createCategory'
import listCategoriesController from '../modules/cars/useCases/listCategories'
import importCategoryController from '../modules/cars/useCases/importCategory'

const categoriesRoutes = Router()
const upload = multer({
  dest: './tmp'
})

categoriesRoutes.post('/', (req, resp) => {
  return createCategoryController().handle(req, resp)
})

categoriesRoutes.get('/', (req, resp) => {
  return listCategoriesController().handle(req, resp)
})

categoriesRoutes.post('/import', upload.single('file'), (req, resp) => {
  return importCategoryController().handle(req, resp)
})

export { categoriesRoutes }
