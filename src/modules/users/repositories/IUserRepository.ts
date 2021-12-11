import { ICreateUserDTO } from '../dtos/ICreateUserInterface'

export interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<void>
  findByEmail: (email: string) => Promise<boolean>
}
