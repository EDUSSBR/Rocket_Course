import { ICreateCarDTO } from '../../dtos/ICreateCarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async findByLicensePlate (license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate)
    return car
  }

  async create ({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDTO): Promise<void> {
    const car = new Car()
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })
    this.cars.push(car)
  }
}
