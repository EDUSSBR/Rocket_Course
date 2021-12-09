import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateSpecificationUseCase {
  constructor (private readonly specificationsRepository: ISpecificationRepository) {}

  async execute ({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name)
    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!')
    }
    await this.specificationsRepository.create({
      name,
      description
    })
  }
}
