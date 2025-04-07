import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'

const app = express()

app.get('/', (request: Request, response: Response) => {
    response.send('Server is running successfully')
})

export default app