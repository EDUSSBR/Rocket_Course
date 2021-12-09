import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
export class CreateCategoryController {
  async handle (req: Request, resp: Response): Promise<Response> {
    const { name, description } = req.body
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    await createCategoryUseCase.execute({ name, description })
    return resp.status(201).send()
  }
}
