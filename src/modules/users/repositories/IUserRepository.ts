import { ICreateUserDTO } from '../dtos/ICreateUserInterface'
import { User } from '../infra/typeorm/entities/User'
export interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<void>
  findByEmail: (email: string) => Promise<User>
  findById: (id: string) => Promise<User>
}
