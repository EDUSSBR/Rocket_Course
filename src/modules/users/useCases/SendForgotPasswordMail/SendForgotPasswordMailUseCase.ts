import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IUserRepository } from '../../repositories/IUserRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { v4 as uuidV4 } from 'uuid'
import { IDateProvider } from '../../../../shared/container/providers/DateProviders/IDateProvider'
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider'
import { resolve } from 'path'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor (
    @inject('UserRepository')
    private readonly usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private readonly mailProvider: IMailProvider
  ) {}

  async execute (email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists')
    }
    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs')
    const token = uuidV4()
    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })
    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }
    await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath)
  }
}
