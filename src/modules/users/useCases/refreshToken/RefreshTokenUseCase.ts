import { verify, sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import auth from '../../../../config/auth'
import { AppError } from '../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../shared/container/providers/DateProviders/IDateProvider'

interface IPayload {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor (
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute (token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload
    const user_id = sub
    const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)
    if (!userTokens) {
      throw new AppError('Refresh Token does not exists!')
    }
    await this.usersTokensRepository.deleteById(userTokens.id)
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })
    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}
