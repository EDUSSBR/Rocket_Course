import { Response, Request } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor (private readonly listCategoryUseCase: ListCategoriesUseCase) {}
  handle (req: Request, resp: Response): Response {
    const all = this.listCategoryUseCase.execute()
    return resp.json(all)
  }
}
