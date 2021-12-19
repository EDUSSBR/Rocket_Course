import { Router } from 'express'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController'
import { ensureAdmin } from '../middleware/ensureAdmin'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const carsRoutes = Router()

let createCarController = new CreateCarController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes }
