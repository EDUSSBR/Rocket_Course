import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/createCarController'
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController'
import { ensureAdmin } from '../middleware/ensureAdmin'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', listAvailableController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImagesController.handle)

export { carsRoutes }
