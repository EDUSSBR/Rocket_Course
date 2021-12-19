import { Connection, createConnection, getConnectionOptions } from 'typeorm'

// interface IOptions {
//   host: string
// }

// void getConnectionOptions().then(options => {
//   const newOptions = options as IOptions
//   newOptions.host = 'database'
//   void createConnection({
//     ...options
//   })
// })

export default async (host = 'database'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return await createConnection(
    Object.assign(defaultOptions, {
      host
    })
  )
}
