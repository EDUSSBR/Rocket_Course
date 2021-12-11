import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle (req: Request, resp: Response): Promise<Response> {
    const { name, email, password, driverLicense } = req.body
    const createUserUseCase = container.resolve(CreateUserUseCase)
    await createUserUseCase.execute({ name, email, password, driverLicense })
    return resp.status(201).send()
  }
}
