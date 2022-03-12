
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

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload

    req.user = {
      id: userId
    }
    next()
  } catch (e) {
    throw new AppError('Invalid token', 401)
  }
}
