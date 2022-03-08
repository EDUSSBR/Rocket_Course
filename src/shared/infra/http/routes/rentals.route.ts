import { Router } from 'express'
import { CreateRentalController } from '../../../../modules/rentals/usecases/createRental/CreateRentalController'
import { DevolutionRentalController } from '../../../../modules/rentals/usecases/DevolutionRental/DevolutionRentalController'
import { ListRentalsByUserController } from '../../../../modules/rentals/usecases/ListRentalsByUser/ListRentalsByUserController'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle)
export { rentalRoutes }
