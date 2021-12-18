import { CreateCarUseCase } from './createCarUseCase'
import { container } from 'tsyringe'
export class CreateCarController {
  async handle (req: Request, resp: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    } = req.body

    const createCarUseCase = container.resolve(CreateCarUseCase)
    const car = await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })
    return resp.status(201).json(car)
  }
}
