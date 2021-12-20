import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { ListCarsUseCase } from './ListCarsUseCase'

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })
  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car0 name1',
      description: 'Car0 description1',
      daily_rate: 1001,
      license_plate: 'abd-1238',
      fine_amount: 69,
      brand: 'Brand1',
      category_id: 'category_ic'
    })
    const cars = await listCarsUseCase.execute(car)
    expect(cars).toEqual([car])
  })
  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car0 name2',
      description: 'Car0 description2',
      daily_rate: 1004,
      license_plate: 'abd-1235',
      fine_amount: 65,
      brand: 'Brand5',
      category_id: 'category_ic5'
    })
    const cars = await listCarsUseCase.execute({ brand: 'CarBrand' })
    expect(cars).toEqual([car])
  })
})
