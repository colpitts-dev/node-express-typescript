import express, { json, Application } from 'express'

const app: Application = express()

// Middleware
app.use(json())

// Routes
app.get('/', (req, res) => {
  return res.json({
    title: 'hyper[local]',
    content: 'community engagement platform',
  })
})

export default app
