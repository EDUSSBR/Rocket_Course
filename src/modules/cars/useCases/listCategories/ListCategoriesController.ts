import { Response, Request } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { container } from 'tsyringe'

export class ListCategoriesController {
  async handle (req: Request, resp: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase)
    const all = await listCategoryUseCase.execute()
    return resp.json(all)
  }
}
