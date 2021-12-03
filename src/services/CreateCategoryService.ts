import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryService {
  constructor (private readonly categoriesRepository: ICategoriesRepository) {}

  execute ({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists!')
    }
    this.categoriesRepository.create({ name, description })
  }
}
