import { AppError } from '../../../../shared/errors/AppError'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

interface IRequest{
  car_id: string
  specifications_id: string[]
}

export class CreateCarSpecificationUseCase {
  constructor (
    // @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
    // private readonly specificationRepository: ISpecificationRepository
  ) { }

  async execute ({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id)
    if (!carExists) {
      throw new AppError('Cars does not exists')
    }
    // const specifications = await this.specificationRepository.findByIds(specifications_id)
  }
}
