const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session');
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const complaintRoute = require('./routes/complaintRoute');

const PORT = process.env.PORT || 3333
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shppc'

const app = express()

app.use(express.json())

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(session({
    secret : 'qwerty',
    resave: true,
    saveUninitialized: false,
    cookie:{
        secure: false,
        maxAge: 60000
    }
}))

//database connection
mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("Database connected...");
})
.catch((err)=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.send("SHPPC API");
})

app.use('/user', userRoute);

app.use('/complaint', complaintRoute);

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}...`);
})