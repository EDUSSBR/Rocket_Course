import { Repository, getRepository } from 'typeorm'
import { ICreateUserDTO } from '../../../dtos/ICreateUserInterface'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { User } from '../entities/User'

export class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>
  constructor () {
    this.repository = getRepository(User)
  }

  async findByEmail (email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async findById (id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async create (data: ICreateUserDTO): Promise<void> {
    const { name, email, driverLicense, password, id, avatar } = data
    const user = this.repository.create({
      name,
      email,
      driverLicense,
      password,
      id,
      avatar
    })
    await this.repository.save(user)
  }
}
