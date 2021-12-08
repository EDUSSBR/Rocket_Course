import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string
}

void getConnectionOptions().then(options => {
  const newOptions = options as IOptions
  newOptions.host = 'database'
  void createConnection({
    ...options
  })
})
