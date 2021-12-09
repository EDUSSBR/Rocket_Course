import { Response, Request } from 'express'
import { CreateSpecificationUseCase } from './createSpecificationUseCase'

export class CreateSpecificationController {
  constructor (private readonly createSpecificationUseCase: CreateSpecificationUseCase) {}
  async handle (req: Request, resp: Response): Promise<Response> {
    const { name, description } = req.body
    await this.createSpecificationUseCase.execute({ name, description })
    return resp.status(201).send()
  }
}
