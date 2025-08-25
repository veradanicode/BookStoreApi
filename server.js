require('dotenv').config()
const express=require('express')
const connectToDB =require('./database/db')
const bookRoutes =require('./routes/book-route')

const app=express()
const PORT =process.env.PORT||3000


//connect to database
connectToDB();

//middleware
app.use(express.json())

//routes
app.use('/api/books',bookRoutes)

app.listen(PORT,()=>{
    console.log(`Book StoreApi is currently running at port ${PORT}`);
    
})
