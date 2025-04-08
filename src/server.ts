import app from "./app"
import connectToDatabase from './database/connection'
import { ENV } from "./utils/env"

connectToDatabase()
    .then( () => {
        try{
            app.listen(ENV.PORT, () => console.log(`Server is running at http://localhost:${ENV.PORT}`))
        } 
        catch(error) {
            console.log(`Can't connect to database : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })