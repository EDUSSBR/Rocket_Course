import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor (
    @inject('CategoryRepository')
    private readonly categoriesRepository: ICategoriesRepository) {}

  async execute ({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists!')
    }
    await this.categoriesRepository.create({ name, description })
  }
}
