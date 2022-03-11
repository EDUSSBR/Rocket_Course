import Router from 'express'
import { AuthenticateUserController } from '../../../../modules/users/useCases/AuthenticaUserUseCase/AuthenticateUserController'
import { RefreshTokenController } from '../../../../modules/users/useCases/refreshToken/RefreshTokenController'
const authRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post('/sessions', authenticateUserController.handle)
authRoutes.post('/refresh-token', refreshTokenController.handle)

export { authRoutes }
