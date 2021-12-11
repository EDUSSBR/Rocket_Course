import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import './database'
import './shared/container'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import { router } from './routes'
import { AppError } from './errors/AppError'
const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)
app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    resp.status(err.statusCode).json({ message: err.message })
  }
  return resp.status(500).json({
    status: 'Error',
    message: `Internal server error - ${err.message}`
  })
})
app.listen(3333, () => console.log('Server is running'))
