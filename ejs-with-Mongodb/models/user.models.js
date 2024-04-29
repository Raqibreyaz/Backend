const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/practiceApp1`);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    // imageUrl: {
    //     type: String,
    //     required: true
    // }
    imageUrl: String
})

// will create a collection of name users
module.exports = mongoose.model('user', userSchema)