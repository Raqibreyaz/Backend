import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    postData: String,
    // reference of the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('post', postSchema)