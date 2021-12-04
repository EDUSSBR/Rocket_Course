import { Specification } from '../../model/Specification'
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository'

export class SpecificationRepository implements ISpecificationRepository {
  private readonly specifications: Specification[]
  private static INSTANCE: SpecificationRepository
  constructor () {
    this.specifications = []
  }

  public static getInstance (): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository()
    }
    return SpecificationRepository.INSTANCE
  }

  create ({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()
    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    })
    this.specifications.push(specification)
  }

  findByName (name: string): Specification {
    const specification = this.specifications.find((specification)=> specification.name === name)
    return specification
  }
}
