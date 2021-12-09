import { Response, Request } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor (private readonly listCategoryUseCase: ListCategoriesUseCase) {}
  async handle (req: Request, resp: Response): Promise<Response> {
    const all = await this.listCategoryUseCase.execute()
    return resp.json(all)
  }
}
