const mongoose = require('mongoose')

const BookSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Book title is required'],
        trim: true,
        maxLength:[100,'Book title cannot be more than 100 characters']
    },
    author:{
        type:String,
        required:[true,'Author name is required'],
        trim: true,
    },
    year:{
        type:Number,
        required:[true,'publication year is required'],
        trim: true,
        min:[1000,'Publication year cannot be less than 1000'],
        max:[new Date().getFullyear(),'Publication year cannot be in the future ,na Alien book😏']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Book',BookSchema)