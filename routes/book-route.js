const express = require('express')
const {getAllBooks,getSingleBooksByID,addNewBook,updateBook,deleteBook}=require('../controllers/book-controller')

//create an express router
const router = express.Router()

//all routes 
router.get('/get',getAllBooks );
router.get('/get/:id',getSingleBooksByID );
router.post('/add',addNewBook );
router.put('/update/:id',updateBook );
router.delete('/delete/:id',deleteBook );

module.exports =router;