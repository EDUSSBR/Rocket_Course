import { Router } from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/createSpecificationController'
import { ensureAdmin } from '../middleware/ensureAdmin'

export const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
specificationRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle)
