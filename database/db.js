require('dotenv').config()
const mongoose = require('mongoose')


const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("Database Connected Successfully!");
 
    } catch (error) {
        console.error('MongoDB Connection failed',error)
        process.exit(1)
    }
}

module.exports = connectToDB