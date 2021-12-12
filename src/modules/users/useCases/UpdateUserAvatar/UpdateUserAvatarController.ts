import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

export class UpdateUserAvatarController {
  async handle (req: Request, resp: Response): Promise<Response> {
    const { id } = req.user
    const avatarFile = req.file.filename
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    await updateUserAvatarUseCase.execute({ userId: id, avatarFile })
    return resp.status(204).send()
  }
}
