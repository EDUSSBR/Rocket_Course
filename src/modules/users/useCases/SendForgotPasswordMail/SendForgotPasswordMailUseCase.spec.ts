import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProviders/implementations/DayjsDateProvider'
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory'
import { AppError } from '../../../../shared/errors/AppError'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe('Send Forgot Email', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })
  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')
    await usersRepositoryInMemory.create({
      driverLicense: '416738',
      name: 'Todd Williams',
      email: 'wugwukbac@vita.iq',
      password: '1234'
    })
    await sendForgotPasswordMailUseCase.execute('wugwukbac@vita.iq')
    expect(sendMail).toHaveBeenCalled()
  })
  it('Should not be able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('bef@maci.it')).rejects.toEqual(new AppError('User does not exists'))
  })
  it('Should not be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create')
    await usersRepositoryInMemory.create({
      driverLicense: '746924',
      name: 'Sally Vega',
      email: 'fip@cur.re',
      password: '1234'
    })
    await sendForgotPasswordMailUseCase.execute('fip@cur.re')
    expect(generateTokenMail).toBeCalled()
  })
})
