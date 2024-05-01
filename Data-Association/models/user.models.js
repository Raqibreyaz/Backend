import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/data-associate')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            // post is the name of the model
            ref:'post'
        }
    ]
})

export default mongoose.model('user', userSchema)