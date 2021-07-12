const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/bookdb', {useNewUrlParser: true, useUnifiedTopology: true});



const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status:String,
    img:String

});

const User = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

const myBookModule = mongoose.model('bookSchema', BookSchema);
const UserModel = mongoose.model('User', User);


 function seedKittyCollection() {
    const eman = new UserModel ({email: 'emkhareez19@gmail.com', books: [
        { name: 'The Growth Mindset',
         description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.',
          status: 'FAVORITE FIVE', 
          img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },
        { name: 'The Momnt of Lift',
         description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.',
          status: 'RECOMMENDED TO ME', 
          img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'}
      ]})
      
        
    //  eman.save();
    }

    //   seedKittyCollection ()
    
server.get('/book',handelbook)

//http://localhost:3006/book?ownerName=emkhareez19@gmail.com

function handelbook(req,res) {
    let ownerName = req.query.ownerName;
    // let {ownerName} = req.query
    UserModel.find({email:ownerName},function(error,ownerData){
        if(error) {
            res.send('did not work')
        } else {
            res.send(ownerData[0].books)
        }
    })
}



server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

server.get('/', homePageHandler);
//http://localhost:3001/
function homePageHandler(req, res) {
    res.send('all good')
}


