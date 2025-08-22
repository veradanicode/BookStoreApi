const express = require('express')
const mongoose =require('mongoose')

const app = express()

// require("dotenv").config();


app.use(express.json())

let books =[
  {
    id:1,
    title:"Book1"
  },
    {
    id:2,
    title:"Book2"
  },
    {
    id:3,
    title:"Book3"
  }
]
app.get('/',(req,res)=>{
  res.json({
    "message":"Welcome to our bookstore!"
  })
})

//get all books
app.get('/get',(req,res)=>{
  res.json(books)
})

//get a single book
app.get('/get/:id',(req,res)=>{
  const oneBook=books.find(item=>item.id == req.params.id)
  if (oneBook) {
    res.status(200).json(oneBook)
  }else{
    res.status(404).json(
      {"message":"Book not found!Please try again with a valid id"}
    )
  }
})


//create a new book
app.post("/create",(req,res)=>{
  const newBook={
    id:books.length +1,
    title:`Book${books.length +1}`
  }
   books.push(newBook)
    res.status(200).json({
      "mesage":`${newBook.title} added sucessfully`
    })
})

//update a book
app.put("/update/:id",(req,res)=>{
  const findBook=books.find(Bookitem=>Bookitem.id == req.params.id)
  if (findBook) {
    if (req.body?.title ==undefined) {
          findBook.title =  findBook.title;
          res.status(200).json({
            "message":`No changes found with Book ID${req.params.id} `,
            data:findBook
          })
    }else{
          findBook.title = req.body.title ;
          res.status(200).json({
            "message":`Book with ID ${req.params.id} updated sucessfully!`,
            data:findBook
          })

    }
  }else{ 
    res.status(404).json({"message":"Book not found!Pleas try eith a different ID"})
  }
})

// delete a book
app.delete('/remove/:id',(req,res)=>{
  const findIndexBook=books.findIndex(Bookitem=>Bookitem.id == req.params.id)
  if (findIndexBook!=-1) {
    const deletedBook=books[findIndexBook]
    books.splice(findIndexBook,1)
    res.status(200).json({
      "message":`Book with ID ${req.params.id} has been deleted successfully!`,
      data:deletedBook
    })
  }else{
    res.status(404).json({"messsage":"Book not found!,Please try again with a different ID"})
  }
})

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Athena backend server is now running on port ${port}!`);
})

//user schema
const userSchema=new mongoose.Schema({
  name:String,
  email:String,
  age:Number,
  isActive:Boolean,
  tags:[String],
  createdAt:{type:Date,default:Date.now}

})

// create user model
const User =mongoose.model('User',userSchema)


async function runQuery() {
  try {
    const newUser=new User({
      name:"tina benson ",
      email:"tinajeweleries@gmail.com",
      age:'34',
      isActive:false,
      tags:['jewelry vendor','care taker','fashionist'],

    })
    
    //create new user
    // await newUser.save()
    // console.log('new user scuccesfully created',newUser);


    //get all users
    // const getAllUsers=await User.find({})
    // console.log('All users: ',getAllUsers);
    
    //get users with active false
    // const getUsersActiveFalse=await User.find({
    //   isActive:false
    // })
    // console.log('Users that are not active: ',getUsersActiveFalse);

    //get all users and sort them in descending order 
    // const sortUsersInDescendingOrder=await User.find().sort({age:-1})
    // console.log(sortUsersInDescendingOrder);

    //count documents
    const countDocuments =await User.countDocuments({isActive:true})
    console.log(countDocuments);
    
    

  } catch (err) {
    console.log('Error-->',err);
    
  }finally{
    await mongoose.connection.close()
  }
}

runQuery()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Database Connected Succesfully!');  })
.catch(err=> console.log(err))