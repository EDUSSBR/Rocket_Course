import { Router } from 'express'
import { CategoriesRepository } from '../repositories/CategoriesRepository'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req, resp) => {
  const { name, description } = req.body
  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if (categoryAlreadyExists) {
    return resp.status(400).json({ error: 'Category Already Exists!' })
  }
  categoriesRepository.create({ name, description })

  return resp.status(201).send()
})

categoriesRoutes.get('/', (req, resp) => {
  const all = categoriesRepository.list()
  return resp.json(all)
})
export { categoriesRoutes }
