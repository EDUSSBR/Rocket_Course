import { Router } from 'express'
import { authRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'

const router = Router()
router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carsRoutes)
router.use(authRoutes)
export { router }
