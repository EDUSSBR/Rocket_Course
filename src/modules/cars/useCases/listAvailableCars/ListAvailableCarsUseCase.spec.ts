import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
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
    const cars = await listAvailableCarsUseCase.execute(car)
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
    const cars = await listAvailableCarsUseCase.execute({ brand: 'CarBrand' })
    expect(cars).toEqual([car])
  })
  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car7',
      description: 'Car0 description2',
      daily_rate: 1004,
      license_plate: 'abd-1235',
      fine_amount: 65,
      brand: 'Brand5',
      category_id: 'category_ic5'
    })
    const cars = await listAvailableCarsUseCase.execute({ name: 'Car7' })
    expect(cars).toEqual([car])
  })
  it('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car7',
      description: 'Car0 description2',
      daily_rate: 1004,
      license_plate: 'abd-1235',
      fine_amount: 65,
      brand: 'Brand5',
      category_id: '123123123'
    })
    const cars = await listAvailableCarsUseCase.execute({ category_id: '123123123' })
    expect(cars).toEqual([car])
  })
})
