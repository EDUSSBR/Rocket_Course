import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecificationController'

export const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post('/', createSpecificationController.handle)
