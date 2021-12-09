import { ImportCategoryUseCase } from './importCategoryUseCase'
import Response from 'express'
export class ImportCategoryController {
  constructor (private readonly importCategoryUseCase: ImportCategoryUseCase) {}
  async handle (req: Express.Multer.File, resp: Response): Promise<Response> {
    const { file } = req
    await this.importCategoryUseCase.execute(file)
    return resp.status(200).send()
  }
}
