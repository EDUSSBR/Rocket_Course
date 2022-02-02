import { NextFunction } from 'express'
import { UserRepository } from '../../../../modules/users/infra/typeorm/repositories/UserRepository'
import { AppError } from '../../../errors/AppError'
import { Request, Response } from 'express'

export async function ensureAdmin (req: Request, resp: Response, next: NextFunction) {
  const { id } = req.user
  const usersRepository = new UserRepository()
  const user = await usersRepository.findById(id)
  if (!user.isAdmin) {
    throw new AppError('User is not an admin')
  }

  return next()
}
