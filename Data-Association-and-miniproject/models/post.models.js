import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    content: String,
    imageUrl: String,
    // reference of the user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})

export default mongoose.model('post', postSchema)