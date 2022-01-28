import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { container } from 'tsyringe'

export class AuthenticateUserController {
  async handle (req: Request, resp: Response): Promise<Response> {
    try {
      const { email, password } = req.body
      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
      const token = await authenticateUserUseCase.execute({ email, password })
      return resp.status(200).json(token)
    } catch (e) {
      return resp.status(400).json(e)
    }
  }
}
