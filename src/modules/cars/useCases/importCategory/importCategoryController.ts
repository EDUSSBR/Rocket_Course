import { ImportCategoryUseCase } from './importCategoryUseCase'
import Response from 'express'
export class ImportCategoryController {
  constructor (private readonly importCategoryUseCase: ImportCategoryUseCase) {}
  handle (req: Express.Multer.File, resp: Response): Response {
    const { file } = req
    this.importCategoryUseCase.execute(file)
    return resp.status(200).send()
  }
}
