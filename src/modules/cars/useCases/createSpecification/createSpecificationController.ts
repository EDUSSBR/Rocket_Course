import { Response, Request } from 'express'
import { CreateSpecificationUseCase } from './createSpecificationUseCase'
import { container } from 'tsyringe'
export class CreateSpecificationController {
  constructor (private readonly createSpecificationUseCase: CreateSpecificationUseCase) {}
  async handle (req: Request, resp: Response): Promise<Response> {
    const { name, description } = req.body
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
    await createSpecificationUseCase.execute({ name, description })
    return resp.status(201).send()
  }
}
