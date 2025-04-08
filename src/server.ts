import app from "./app"
import connectToDatabase from './database/connection'

connectToDatabase()
    .then( () => {
        try{
            app.listen(process.env.PORT, () => console.log(`Server is running at http://localhost:${process.env.PORT}`))
        } 
        catch(error) {
            console.log(`Can't connect to database : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })