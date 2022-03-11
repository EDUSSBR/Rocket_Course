import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../repositories/IUserRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from '../../../../shared/errors/AppError'
import auth from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/container/providers/DateProviders/IDateProvider'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}
interface IRequest {
  email: string
  password: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor (
    @inject('UserRepository')
    private readonly usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth
    if (!user) {
      throw new AppError('email or password incorrect')
    }
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new AppError('email or password incorrect')
    }
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    }
    return tokenReturn
  }
}
