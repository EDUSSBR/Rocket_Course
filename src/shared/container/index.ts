import { container } from 'tsyringe'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { UserRepository } from '../../modules/users/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '../../modules/users/repositories/IUserRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository'

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository)
container.registerSingleton<ISpecificationRepository>('SpecificationsRepository', SpecificationRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
