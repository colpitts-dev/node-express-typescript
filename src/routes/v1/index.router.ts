import { Router } from 'express'

import { getIndex } from './index.controller'
import peopleRoutes from './people/people.router'
/* RESTFUL_IMPORT */

const indexRouter = Router()

// health check
indexRouter.get('/', getIndex)

indexRouter.use('/people', peopleRoutes)
/* RESTFUL_API */

export default indexRouter
