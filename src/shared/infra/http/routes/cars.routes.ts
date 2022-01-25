import { Router } from 'express'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { ensureAdmin } from '../middleware/ensureAdmin'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const carsRoutes = Router()

let createCarController = new CreateCarController()
const listAvailableController = new ListAvailableCarsController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/available', listAvailableController.handle)

export { carsRoutes }
