
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '../../../../modules/users/infra/typeorm/repositories/UserRepository'
import { AppError } from '../../../errors/AppError'

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
    const { sub: userId } = verify(token, '816596b9c78402ccc8e46fd6b79aab65') as IPayload
    const usersRepository = new UserRepository()
    const user = await usersRepository.findById(userId)
    if (!user) {
      throw new AppError('User don not exists', 401)
    }
    req.user = {
      id: userId
    }
    next()
  } catch (e) {
    throw new AppError('Invalid token', 401)
  }
}
