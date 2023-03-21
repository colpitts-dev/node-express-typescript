import { Router } from 'express'

import { getIndex } from './index.controller'

const indexRouter = Router()

indexRouter.get('/', getIndex)

export default indexRouter
