import dotenv from 'dotenv'
import http, { Server } from 'http'
import app from './app'

// load .env variables
dotenv.config()

const PORT = process.env.PORT || 3000
const APP_NAME = process.env.APP_NAME || 'server'

const server: Server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`🚀 [${APP_NAME}]: Web server listening on port ${PORT}`)
})
