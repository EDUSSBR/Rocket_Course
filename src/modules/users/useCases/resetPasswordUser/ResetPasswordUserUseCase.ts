import { inject, injectable } from 'tsyringe'
import { IDateProvider } from '../../../../shared/container/providers/DateProviders/IDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { IUserRepository } from '../../repositories/IUserRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { hash } from 'bcrypt'

interface IRequest{
  token: string
  password: string
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor (
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('UserRepository')
    private readonly usersRepository: IUserRepository
  ) {}

  async execute ({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token Invalid')
    }
    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError('Token expired!')
    }
    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)
    await this.usersRepository.create(user)
    await this.usersTokensRepository.deleteById(userToken.id)
  }
}
