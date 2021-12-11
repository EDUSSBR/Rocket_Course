import { Repository } from 'typeorm'
import { User } from '../entities/User'
import { ICreateUserDTO } from '../dtos/ICreateUserInterface'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateUserUseCase {
  constructor (
    @inject('UserRepository')
    private readonly repository: Repository<User>) {}

  async execute ({ name, email, driverLicense, password }: ICreateUserDTO): Promise<void> {
    await this.repository.create({
      name,
      email,
      driverLicense,
      password
    })
  }
}
