import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../repositories/IUserRepository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '../../../../shared/errors/AppError'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}
interface IRequest {
  email: string
  password: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor (
    @inject('UserRepository')
    private readonly repository: IUserRepository) {}

  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.repository.findByEmail(email)
    if (!user) {
      throw new AppError('email or password incorrect')
    }
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError('email or password incorrect')
    }
    const token = sign({}, '816596b9c78402ccc8e46fd6b79aab65', { subject: user.id, expiresIn: '1d' })
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }
    return tokenReturn
  }
}
