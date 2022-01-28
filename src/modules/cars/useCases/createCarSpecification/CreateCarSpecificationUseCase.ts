import { AppError } from '../../../../shared/errors/AppError'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'
import { injectable, inject } from 'tsyringe'

interface IRequest{
  car_id: string
  specifications_id: string[]
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor (
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationRepository
  ) { }

  async execute ({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)
    if (!carExists) {
      throw new AppError('Cars does not exists')
    }
    const specifications = await this.specificationsRepository.findByIds(specifications_id)
    console.log(specifications)
    carExists.specifications = specifications
    console.log(carExists)

    const carWithSpecification = await this.carsRepository.create(carExists)

    return carWithSpecification
  }
}
