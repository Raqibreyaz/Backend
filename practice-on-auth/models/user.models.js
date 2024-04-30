const mongoose = require('mongoose')

//create database 
mongoose.connect('mongodb://localhost:27017/practiceapp2')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

// creating a colection of users based on the user schema
module.exports = mongoose.model('user', userSchema)