import http from 'http'

import { config, initEnv } from './config/env'
import { connectDB } from './config/database'
import app from './app'

// Init app env
try {
  initEnv()
} catch (e) {
  console.error('\n\nError: dotenv `.env` not found\n\n')
  process.exit(1)
}

// Connect to database
connectDB(() => {
  // Create app server
  const server = http.createServer(app)

  server.listen(config.port, () => {
    console.log(
      `🚀 [${config.appName}]: Web server listening on port ${config.port}`,
    )
  })
})
