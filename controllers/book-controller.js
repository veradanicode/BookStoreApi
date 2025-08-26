const Book = require('../models/book')

const getAllBooks = async(req,res) =>{
    try {
       const findAllBooks = await Book.find({})
       if (findAllBooks) {
        res.status(200).json({
            success:true,
            message:"Book found successfully!",
            data:findAllBooks
        })
       }else{
        res.status(404).jon({
            success:false,
            message:"We didn't find any book here o😪",
        })
       }
    } catch (error) {
        console.log("Error in fetching books😪",error);
        res.status(500).json({
            success:false,
            message:"Something went wrong!Please try again."
        })
    }

}

const getSingleBooksByID = async(req,res) =>{
    try {
        const getBookbyID = await Book.findById(req.params.id)
        if (!getBookbyID) {
            return res.status(404).json({
                success:false,
                message:"Book with the current ID is not found!Please try with a different ID"
            })
        }
        res.status(200).json({
            succes:true,
            data:getBookbyIDs
        })
    } catch (error) {
           console.log('Error:',error);
         res.status(500).json({
            success:false,
            message:"Something went wrong!Please try again."
        })
    }
}

const addNewBook = async(req,res) =>{
    try {
        const newBookFormData =new Book(req.body);
        const newlyCreatedBook = await newBookFormData.save();
        if (newlyCreatedBook) {
            res.status(201).json({
                success:true,
                message:"Book created suceesfully!",
                data:newlyCreatedBook
            })
        }else{
        res.status(404).jon({
            success:false,
            message:"Error creating book😪",
        })
       }
    } catch (error) {
        console.log('Error:',error);
         res.status(500).json({
            success:false,
            message:"Something went wrong!Please try again."
        })
        
    }
}

const updateBook = async(req,res) =>{
    
}

const deleteBook = async(req,res) =>{
    try {
        const findBookAndDeleteByID= await Book.findByIdAndDelete(req.params.id)
        if (!findBookAndDeleteByID) {
            return res.status(404).json({
                success:false,
                message:"Book with the current ID is not found and can not be deleted!Please try with a different ID"
            })
        }
        res.status(200).json({
            success:true,
            message:"Book deleted Succesfully!",
            data:findBookAndDeleteByID
        })
    } catch (error) {
         console.log('Error:',error);
         res.status(500).json({
            success:false,
            message:"Something went wrong!Please try again."
        })
    }
}


module.exports ={
    getAllBooks,
    getSingleBooksByID,
    addNewBook,
    updateBook,
    deleteBook
}