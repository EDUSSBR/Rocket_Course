import { IUsersTokensRepository } from '../IUsersTokensRepository'
import { UserTokens } from '../../infra/typeorm/entities/UserTokens'
import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = []
  async create ({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })
    this.usersTokens.push(userToken)
    return userToken
  }

  async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserTokens> {
    const userTokens = this.usersTokens.find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token)
    return userTokens
  }

  async deleteById (id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id)
    const index = this.usersTokens.indexOf(userToken)
    this.usersTokens.splice(index)
  }

  async findByRefreshToken (refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find((ut) => ut.refresh_token === refresh_token)
    return userToken
  }
}
