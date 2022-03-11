
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UsersTokensRepository } from '../../../../modules/users/infra/typeorm/repositories/UsersTokensRepository'
import { AppError } from '../../../errors/AppError'
import auth from '../../../../config/auth'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated (req: Request, resp: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization
  const usersTokensRepository = new UsersTokensRepository()
  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const { sub: userId } = verify(token, auth.secret_refresh_token) as IPayload

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(userId, token)
    if (!user) {
      throw new AppError('User do not exists', 401)
    }
    req.user = {
      id: userId
    }
    next()
  } catch (e) {
    throw new AppError('Invalid token', 401)
  }
}
