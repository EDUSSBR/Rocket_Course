import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  driverLicense: string

  @CreateDateColumn()
  created_at: Date

  @Column()
  isAdmin: boolean

  constructor () {
    if (!this.id) {
      this.id = uuidV4()
    }
    if (!this.isAdmin) {
      this.isAdmin = false
    }
  }
}
