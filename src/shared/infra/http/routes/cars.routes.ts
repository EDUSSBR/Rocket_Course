import { Router } from 'express'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController'
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { ensureAdmin } from '../middleware/ensureAdmin'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/available', listAvailableController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

export { carsRoutes }
