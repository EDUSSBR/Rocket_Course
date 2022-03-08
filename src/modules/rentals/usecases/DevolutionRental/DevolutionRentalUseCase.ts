import { inject, injectable } from 'tsyringe'
import { IDateProvider } from '../../../../shared/container/providers/DateProviders/IDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  id: string
  user_id
}

@injectable()
export class DevolutionRentalUseCase {
  constructor (
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute ({ id, user_id }: IRequest): Promise<Rental> {
    const minimunDaily = 1
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)
    if (!rental) {
      throw new AppError('Rental do not exists')
    }
    if (!car) {
      throw new AppError('Car not found')
    }
    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow())
    if (daily <= 0) {
      daily = minimunDaily
    }
    const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)
    let total = 0
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }
    total += daily * car.daily_rate
    rental.end_date = this.dateProvider.dateNow()
    rental.total = total
    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)
    return rental
  }
}
