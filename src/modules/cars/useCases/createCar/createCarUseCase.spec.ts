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
    await createCarUseCase.execute(
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
  })
})
