import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../../repositories/ICarsRepository'

export class ListCarsUseCase {
  constructor (private readonly carsRepository: ICarsRepository) {}
  async execute (): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable()
    return cars
  }
}
