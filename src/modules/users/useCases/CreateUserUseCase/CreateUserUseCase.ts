import { ICreateUserDTO } from '../../dtos/ICreateUserInterface'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { IUserRepository } from '../../repositories/IUserRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
export class CreateUserUseCase {
  constructor (
    @inject('UserRepository')
    private readonly repository: IUserRepository) {}

  async execute ({ name, email, driverLicense, password }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 12)
    const userAlreadyExists = await this.repository.findByEmail(email)
    if (userAlreadyExists) {
      throw new AppError('Account already exists')
    }
    await this.repository.create({
      name,
      email,
      driverLicense,
      password: passwordHash
    })
  }
}
