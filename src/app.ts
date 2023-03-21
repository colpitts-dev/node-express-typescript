import path from 'path'
import express, { json, Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import rootRouter from './routes/index.router'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

const app: Application = express()

app.use(cors({ origin: FRONTEND_URL }))
app.use(morgan('dev'))
app.use(json())

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', rootRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

export default app
