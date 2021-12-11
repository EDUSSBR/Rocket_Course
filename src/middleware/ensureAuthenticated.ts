import { NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'
import { UserRepository } from '../modules/users/repositories/implementations/UserRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated (req: Request, resp: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const { sub: user_id } = verify(token, '816596b9c78402ccc8e46fd6b79aab65') as IPayload
    const usersRepository = new UserRepository()
    const user = await usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User don not exists', 401)
    }
    next()
  } catch (e) {
    throw new AppError('Invalid token', 401)
  }
}
