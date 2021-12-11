import { container } from 'tsyringe'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository'
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository'
import { IUserRepository } from '../../modules/users/repositories/IUserRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository'

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<ISpecificationRepository>('SpecificationsRepository', SpecificationRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
