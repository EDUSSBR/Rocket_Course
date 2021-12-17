import Router from 'express'
import { AuthenticateUserController } from '../../../../modules/users/useCases/AuthenticaUserUseCase/AuthenticateUserController'
const authRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authRoutes.post('/sessions', authenticateUserController.handle)

export { authRoutes }
