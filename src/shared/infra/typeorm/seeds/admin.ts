import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcrypt'
import createConnection from '../index'

async function create () {
  const connection = await createConnection('localhost')
  const id = uuidV4()
  const password = await hash('admin', 12)
  await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, "driverLicense", avatar)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'kkkkkk', 'sem avatar')`
  )
  await connection.close
}
create().then(() => console.log('User admin created!'))
