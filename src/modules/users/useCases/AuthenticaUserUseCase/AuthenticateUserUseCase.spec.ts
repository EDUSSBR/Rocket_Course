import { DayjsDateProvider } from '../../../../shared/container/providers/DateProviders/implementations/DayjsDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserInterface'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory'
import { CreateUserUseCase } from '../CreateUserUseCase/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let dateProvider: DayjsDateProvider

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })
  it('Should be possible to authenticate an user ', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '000000',
      email: 'naotem@main.com',
      password: '123123',
      name: 'Name Test'
    }
    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(result).toHaveProperty('token')
  })
  it('Should not be able to authenticate a nonexistent user', async () => {
    void expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@mail.com',
        password: '123444'
      })
    }).rejects.toEqual(new AppError('email or password incorrect'))
  })
  it('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '9999',
      email: 'user@user.com',
      password: '1234',
      name: 'User Test Error'
    }
    await createUserUseCase.execute(user)
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrectpassword'
    })
    ).rejects.toEqual(new AppError('email or password incorrect'))
  })
})
