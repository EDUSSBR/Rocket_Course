import { Router } from 'express'
import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

export const specificationRoutes = Router()
const specificationRepository = new SpecificationRepository()

specificationRoutes.post('/', (req, resp) => {
  const { name, description } = req.body
  const createCategoryService = new CreateSpecificationService(specificationRepository)
  createCategoryService.execute({ name, description })
  return resp.status(201).send()
})
