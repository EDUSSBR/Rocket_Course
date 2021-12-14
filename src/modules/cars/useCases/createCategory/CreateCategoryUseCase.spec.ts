import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CategoryRepositoryInMemory } from '../../repositories/in-memory/CategoryRepositoryInMemory'

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
})
