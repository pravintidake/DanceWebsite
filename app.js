const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser'); //Use to store data if you using express by post request.
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

//Connect to the database
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

//Define New Mongoose Schema
const contactSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    phone:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    description: String
  });

//Compiling schema into a Model.
const Contact = mongoose.model('Contact', contactSchema);

//FOR EXPRESS RELATED STUFF
app.use('/static', express.static('static')); //For Serving Static files
app.use(express.urlencoded({ extended: true }));


//FOR PUG RELATED STUFF
app.set('view engine', 'pug'); //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //Set the views directory

//ENDPOINTS
//for get request
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})

//post request for the contact form
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.status(200).send(`<h1>Thank You Contact Us... We will work on your request.</h1>
        <a href="/" style="border-radius: 10px;
        padding: 3px 35px;
        margin: 5px auto;
        margin-bottom: 20px;
        cursor: pointer;
        color: white;
        background-color: #3d0407;
        font-family: 'Teko', sans-serif;
        font-size: 1rem;
        border: 2px solid #3d0407;
        text-decoration: none;">Go Back</a>`);
        console.log("Data saved successfully...");
    }).catch(() => {
        // res.status(400).send("Ooppsss...Your Data not saved to the database...");
        res.status(400).send(`<h1>Ooppsss...Sorry! Your Request Not Been Registered. Please Try Again Later.</h1>
        <a href="/" style="border-radius: 10px;
        padding: 3px 35px;
        margin: 5px auto;
        margin-bottom: 20px;
        cursor: pointer;
        color: white;
        background-color: #3d0407;
        font-family: 'Teko', sans-serif;
        font-size: 1rem;
        border: 2px solid #3d0407;
        text-decoration: none;">Go Back</a>`);
        console.log("Data not saved...");
    })
    //res.status(200).render('contact.pug');
})

app.get('/about', (req, res)=>{
    res.status(200).render('about.pug');
})

app.get('/services', (req, res)=>{
    res.status(200).render('services.pug');
})

app.get('/classinfo', (req, res)=>{
    res.status(200).render('classinfo.pug');
})


//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});