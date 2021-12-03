import { Router } from 'express'
import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req, resp) => {
  const { name, description } = req.body
  const createCategoryService = new CreateCategoryService(categoriesRepository)
  createCategoryService.execute({ name, description })
  return resp.status(201).send()
})

categoriesRoutes.get('/', (req, resp) => {
  const all = categoriesRepository.list()
  return resp.json(all)
})
export { categoriesRoutes }
