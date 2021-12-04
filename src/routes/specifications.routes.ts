import { Router } from 'express'
import { createSpecificationController } from '../modules/cars/useCases/createSpecification'

export const specificationRoutes = Router()

specificationRoutes.post('/', (req, resp) => {
  return createSpecificationController.handle(req, resp)
})
