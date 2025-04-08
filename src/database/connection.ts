import mongoose from 'mongoose'

import { ENV } from './../utils/env'

const connectToDatabase = async () => {
    const dbUrl = ENV.DB_URL

    if(!dbUrl) {
        throw new Error('Environment variable DB_URL must be defined') 
    }
    const db = await mongoose.connect(dbUrl)
    console.log(`Connected successfully to database : ${db.connection.name}`)
}

export default connectToDatabase