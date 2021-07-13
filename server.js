const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const server = express();
server.use(cors());
//middleware checkpoint to parse the body of the requst
server.use(express.json())

const PORT = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/bookdb', { useNewUrlParser: true, useUnifiedTopology: true });



const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    img: String

});

const User = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

const myBookModule = mongoose.model('bookSchema', BookSchema);
const UserModel = mongoose.model('User', User);


function seedKittyCollection() {
    const eman = new UserModel({
        email: 'emkhareez19@gmail.com', books: [
            {
                name: 'The Growth Mindset',
                description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.',
                status: 'FAVORITE FIVE',
                img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg'
            },
            {
                name: 'The Momnt of Lift',
                description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.',
                status: 'RECOMMENDED TO ME',
                img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'
            }
        ]
    })


    //  eman.save();
}

//   seedKittyCollection ()


//routs
//http://localhost:3001/
server.get('/', homePageHandler);

//http://localhost:3006/book?ownerName=emkhareez19@gmail.com
server.get('/book', handelbook)
//localhoust:3006/books?name=book1&description=about1&status=readed&userEmail=emkhareez19@gmail.com
server.post('/books', addBookHandelr)
//localhost:3006/deleteBook/1?email=emkhareez19@gmail.com
server.delete('/deleteBook/:bookid', deletehandelr)


//homePageHandler
function homePageHandler(req, res) {
    res.send('all good')
}


//handelbook

function handelbook(req, res) {
    let ownerName = req.query.ownerName;
    // let {ownerName} = req.query
    UserModel.find({ email: ownerName }, function (error, ownerData) {
        if (error) {
            res.send('did not work')
        } else {
            res.send(ownerData[0].books)
        }
    })
}

//addBookHandelr
function addBookHandelr(req, res) {
    console.log(req.body)

    let { name, description, status, Email, img } = req.body

    console.log(Email)
    UserModel.find({ email: Email }, (error, bookData) => {
        if (error) {
            res.send(error, 'no user')
        }
        else {
            console.log(bookData[0].books)
            bookData[0].books.push({
                name: name,
                description: description,
                status: status,
                img: img




            })
            console.log('after adding', bookData[0])
            bookData[0].save()
            res.send(bookData[0].books)

        }
    })



}

//deletehandelr

function deletehandelr(req,res){
    console.log(req.params)
    console.log(req.query)

    let bookid=Number(req.params.bookid)
    let email=req.query.Email
    UserModel.find({email:email},(error,retrieveData)=>{

        if(error){res.send(error,'not delete')}
        else{
        let dataAfterDel=retrieveData[0].books.filter((item,idx)=>{
            return idx !==bookid

        })
        retrieveData[0].books=dataAfterDel
        console.log('data after del',retrieveData[0].books)
        retrieveData[0].save()
    }

    })
}



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
 
})











