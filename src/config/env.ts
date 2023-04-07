import dotenv from 'dotenv'

const env = dotenv.config()

export const initAppEnv = () => {
  if (env.error) {
    throw env.error
  }
}

export const config = {
  appName: process.env.APP_NAME || 'server',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/server_dev',
  port: process.env.PORT || 3000,
}
