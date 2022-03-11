import request from 'supertest'
import { Connection } from 'typeorm'
import { app } from '../../../../shared/infra/http/app'
import createConnection from '../../../../shared/infra/typeorm/index'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'

let connection: Connection
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid()
    const password = await hash('admin', 12)

    await connection.query(
          `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, "driverLicense", avatar)
          values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'kkkkkk', 'sem avatar')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const { refresh_token } = responseToken.body
    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest'
    }).set({ Authorization: `Bearer ${refresh_token}` })
    expect(response.status).toBe(201)
  })
  it('Should not be able to create a new category that have the same name ', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const { refresh_token } = responseToken.body
    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest'
    }).set({ Authorization: `Bearer ${refresh_token}` })
    expect(response.status).toBe(400)
  })
})
