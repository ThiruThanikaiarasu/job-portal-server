// config/env.ts
import dotenv from 'dotenv'
dotenv.config()

const ENV = {
  PORT: process.env.PORT,
  CORS_ORIGIN_URL: process.env.CORS_ORIGIN_URL,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
}

export {
    ENV
}