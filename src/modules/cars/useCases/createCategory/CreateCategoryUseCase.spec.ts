import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory'
import { AppError } from '../../../../shared/errors/AppError'

let createCategoryUseCase: CreateCategoryUseCase
let categoryRepositoryInMemory: CategoryRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory)
  })
  it('should be able to create a new category', async () => {
    const category = {
      name: 'New Category',
      description: 'New category description test'
    }
    await createCategoryUseCase.execute(category)
    const categoryCreated = await categoryRepositoryInMemory.findByName(category.name)
    expect(categoryCreated).toHaveProperty('id')
  })
  it('should not be able to create a new category with the same name', async () => {
    void expect(async () => {
      const category = {
        name: 'New Category',
        description: 'New category description test'
      }
      await createCategoryUseCase.execute(category)
      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
