import { Response, Request } from 'express'
import { CreateSpecificationUseCase } from './createSpecificationUseCase'

export class CreateSpecificationController {
  constructor (private readonly createSpecificationService: CreateSpecificationUseCase) {}
  handle (req: Request, resp: Response): Response {
    const { name, description } = req.body
    this.createSpecificationService.execute({ name, description })
    return resp.status(201).send()
  }
}
