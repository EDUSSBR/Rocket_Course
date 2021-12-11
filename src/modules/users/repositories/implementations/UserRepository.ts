import { Repository, getRepository } from 'typeorm'
import { User } from '../../entities/User'
import { IUserRepository } from '../IUserRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserInterface'

export class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>
  constructor () {
    this.repository = getRepository(User)
  }

  async create (data: ICreateUserDTO): Promise<void> {
    const { name, email, driverLicense, password } = data
    const user = this.repository.create({
      name,
      email,
      driverLicense,
      password
    })
    await this.repository.save(user)
  }
}
