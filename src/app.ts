import path from 'path'
import express, { json, Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import v1Router from './routes/v1/index.router'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

const app: Application = express()

app.use(cors({ origin: FRONTEND_URL }))
app.use(json())
if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_MODE === 'true'
) {
  app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname, '../public')))

// Version 1 API
app.use('/api/v1/', v1Router)

// Catchall route for frontend routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

export default app
