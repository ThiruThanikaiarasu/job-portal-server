import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { ENV } from './utils/env'
import connectToDatabase from './database/connection'
import authRoute from './routes/authRoute'
import jobRoute from './routes/jobRoute'

const app = express()

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
app.use('/api/v1/jobs', jobRoute)

connectToDatabase()
    .then(() => {
        console.log('Connected to database')
    })
    .catch(error => {
        console.log(`Error while connecting to database: ${error}`)
    })

const port = ENV.PORT || 3000
app.listen(port, () => {
    console.log(`🟢 Server running at http://localhost:${port}`)
})

export default app