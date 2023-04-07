import { Router } from 'express'

import { getIndex } from './index.controller'
import peopleRoutes from './people/people.routes'

const indexRouter = Router()

// Root health check
indexRouter.get('/', getIndex)

// RESTful endpoints
indexRouter.use('/people', peopleRoutes)

export default indexRouter
