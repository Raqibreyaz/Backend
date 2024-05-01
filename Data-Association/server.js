import express from 'express';
import userModel from './models/user.models.js';
import postModel from './models/post.models.js';

const app = express()

app.get('/', (req, res) => {
    res.send('hi')
}
)

app.get('/create', async (req, res) => {
    const user = await userModel.create({
        username: 'raqib',
        email: 'raqib@raqib.com',
        age: 22,
    })
    res.send(user)
}
)

app.get('/post/create', async (req, res) => {


    // every post have an id of its author
    // and every user has a set of ids of its posts

    const post = await postModel.create({
        postData: 'hello world',
        user: "663140f2ed5e60be34759da5",

    })

    const user = await userModel.findOne({ _id: "663140f2ed5e60be34759da5" })

    user.posts.push(post._id)

    await user.save()

    res.send({ post, user })
}
)

const port = 3000;

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);
}
)