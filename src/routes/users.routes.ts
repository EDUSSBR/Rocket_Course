import Router from 'express'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { CreateUserController } from '../modules/users/useCases/CreateUserUseCase/CreateUserController'
import { UpdateUserAvatarController } from '../modules/users/useCases/UpdateUserAvatar/UpdateUserAvatarController'
import multer from 'multer'
import uploadConfig from '../config/upload'
const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle)

export { usersRoutes }
