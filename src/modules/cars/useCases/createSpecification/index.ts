import { CreateSpecificationController } from './createSpecificationController'
import { CreateSpecificationUseCase } from './createSpecificationUseCase'
import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository'

const specificationRepository = SpecificationRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)
export const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)
