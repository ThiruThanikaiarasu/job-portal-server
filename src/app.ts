import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
const app = express()

import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoute from './routes/authRoute'
import { ENV } from './utils/env'

app.use(cors({
    origin: ENV.CORS_ORIGIN_URL, 
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (request: Request, response: Response) => {
    response.send('Server is running successfully')
})

app.use('/api/v1/auth', authRoute)

export default app