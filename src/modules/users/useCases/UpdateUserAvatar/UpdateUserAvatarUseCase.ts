import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../repositories/IUserRepository'
import { deleteFile } from '../../../../utils/file'
import { UserRepository } from '../../infra/typeorm/repositories/UserRepository'

interface IRequest {
  userId
  avatarFile
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor (
    @inject(UserRepository)
    private readonly repository: IUserRepository
  ) {}

  async execute ({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.repository.findById(userId)
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }
    user.avatar = avatarFile

    await this.repository.create(user)
  }
}
