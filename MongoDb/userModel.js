const mongoose = require('mongoose')

// will create a database of name mongopractice
mongoose.connect(`mongodb://localhost:27017/mongopractice`);

// schema for model
const userSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String
})

// will create a collection of name users => user + s
module.exports = mongoose.model('user', userSchema)