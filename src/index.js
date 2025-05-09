import dotenv from 'dotenv'


dotenv.config({
    path:'./.env'
})


import app from './app.js'
import connectDB from './db/index.js'

connectDB()
.then(()=>{
    app.on('error',(err)=>{
        console.log("Error : ",err);
        throw err
     })
     app.listen(process.env.PORT || 8000 ,()=>{
         console.log(`Server is running at port : ${process.env.PORT}`)
     })
})
.catch((error)=>{
    console.log("MongoDB connection failed !!!");
})

