import { AppError } from '../../../../shared/errors/AppError'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationRepositoryInMemory'
let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory)
  })
  it('Should not be able to add a new specification to a car that doesnt exists', async () => {
    void expect(async () => {
      const car_id = '1234'
      const specifications_id = ['54321']
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car0 name',
      description: 'Car0 description',
      daily_rate: 1000,
      license_plate: 'abd-1234',
      fine_amount: 62,
      brand: 'Brand0',
      category_id: '0category'
    })

    const specification = await specificationRepositoryInMemory.create({
      description: 'Test',
      name: 'Test'
    })

    const specifications_id = [specification.id]
    const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })
    // expect(specificationsCars).toHaveProperty('specifications')
    // expect(specificationsCars.specifications.length).toBe(1)
  })
})
