import { CreateCarUseCase } from './createCarUseCase'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '../../../../shared/errors/AppError'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })
  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute(
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
    expect(car).toBeTruthy()
  })
  it('Should not be able to create a car that is already created (check with license plate)', async () => {
    await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'abc-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category'
    })
    await expect(createCarUseCase.execute({
      name: 'Car2 name',
      description: 'Car2 description',
      daily_rate: 101,
      license_plate: 'abc-1234',
      fine_amount: 61,
      brand: 'Brand1',
      category_id: 'category1'
    })
    ).rejects.toEqual(new AppError('Car already exists'))
  })
  it('Should create a car with available true by default', async () => {
    const car = await createCarUseCase.execute(
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
    expect(car.available).toBeTruthy()
  })
})
