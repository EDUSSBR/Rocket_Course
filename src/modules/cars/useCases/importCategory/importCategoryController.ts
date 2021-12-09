import { ImportCategoryUseCase } from './importCategoryUseCase'
import Response from 'express'
import { container } from 'tsyringe'
export class ImportCategoryController {
  constructor (private readonly importCategoryUseCase: ImportCategoryUseCase) {}
  async handle (req: Express.Multer.File, resp: Response): Promise<Response> {
    const { file } = req
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    await importCategoryUseCase.execute(file)
    return resp.status(200).send()
  }
}
