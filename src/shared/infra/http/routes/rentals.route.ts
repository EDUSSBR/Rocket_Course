import { Router } from 'express'
import { CreateRentalController } from '../../../../modules/rentals/usecases/createRental/CreateRentalController'
import { DevolutionRentalController } from '../../../../modules/rentals/usecases/DevolutionRental/DevolutionRentalController'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle)

export { rentalRoutes }
