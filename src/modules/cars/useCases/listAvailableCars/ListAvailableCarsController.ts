import { Request, Response } from 'express'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'
import { container } from 'tsyringe'

export class ListAvailableCarsController {
  async handle (req: Request, resp: Response): Promise<Response> {
    const { brand, name, category_id } = req.query
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const cars = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string
    })
    return resp.json(cars)
  }
}
