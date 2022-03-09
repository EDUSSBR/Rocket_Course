import { AppError } from '../../../../shared/errors/AppError'
import dayjs from 'dayjs'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProviders/implementations/DayjsDateProvider'
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(24, 'hour').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayJsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory)
  })
  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create(
      {
        name: 'Car0 name',
        description: 'Car0 description',
        daily_rate: 1000,
        license_plate: 'abd-1234',
        fine_amount: 62,
        brand: 'Brand0',
        category_id: '0category'
      }
    )
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })
  it('Should not be able to create a new rental when another is already open for the same user', async () => {
    const car = await carsRepositoryInMemory.create(
      {
        name: 'Car0 name',
        description: 'Car0 description',
        daily_rate: 1000,
        license_plate: 'abd-1234',
        fine_amount: 62,
        brand: 'Brand0',
        category_id: '0category'
      }
    )
    await rentalsRepositoryInMemory.create({
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
      user_id: '12345'
    })
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })
    ).rejects.toEqual(new AppError('There is a rental in progress for user!'))
  })
  it('Should not be able to create a new rental when the car is already rented', async () => {
    const car = await carsRepositoryInMemory.create(
      {
        name: 'Car0 name',
        description: 'Car0 description',
        daily_rate: 1000,
        license_plate: 'abd-1234',
        fine_amount: 62,
        brand: 'Brand0',
        category_id: '0category'
      }
    )
    await rentalsRepositoryInMemory.create({
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
      user_id: '12345'
    })
    await expect(
      createRentalUseCase.execute({
        user_id: '123123',
        car_id: car.id,
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })
  it('Should not be able to create a new rental with invalid return time', async () => {
    const car = await carsRepositoryInMemory.create(
      {
        name: 'Car0 name',
        description: 'Car0 description',
        daily_rate: 1000,
        license_plate: 'abd-1234',
        fine_amount: 62,
        brand: 'Brand0',
        category_id: '0category'
      }
    )
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: car.id,
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError('Invalid return time'))
  })
})
