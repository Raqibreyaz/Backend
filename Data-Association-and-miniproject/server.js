import cookieParser from 'cookie-parser'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from './models/user.models.js'
import postModel from './models/post.models.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'ejs')

// a middleware for checking logged in also adding the verified user in the req object
function isLoggedIn(req, res, next) {

    console.log('cookies ', req.cookies.token);


    if (req.cookies.token) {
        let data = jwt.verify(req.cookies.token, 'secret')
        console.log(data)
        req.user = data
    }
    else {
        res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {

    res.render('login')
}
)

app.get('/home', isLoggedIn, (req, res) => {
    
}
)

app.get('/profile', isLoggedIn, async (req, res) => {

    console.log(req.user);

    // TAKE USER as well as populating the posts references into posts
    let user = await userModel.findOne({ email: req.user.email }).populate("posts")

    console.log(user.posts);

    res.render('profile', { user })
}
)

app.get('/register', (req, res) => {
    res.render('register')
}
)

// create user and redirect it to the home page
app.post('/register', async (req, res) => {

    // getting the provided info by user
    const { username, email, password, age, imageUrl } = req.body;


    // check if user already exists
    let existingEmail = await userModel.findOne({ email })
    if (existingEmail)
        res.send('User With Same Email or Username Already Exists')

    let existingUsername = await userModel.findOne({ username })
    if (existingUsername)
        res.send('User With Same Email or Username Already Exists')


    // encrypting the password
    bcrypt.genSalt(10, (error, salt) => {

        if (error)
            res.send(error)

        bcrypt.hash(password, salt, async (err, hash) => {


            if (error)
                res.send(error)

            // creating user
            const user = await userModel.create({
                username,
                email,
                password: hash,
                age,
                imageUrl
            })

            // sending user a cookie for the login session
            let token = jwt.sign({ email, age }, 'secret')

            res.cookie('token', token)

            // on creating a user redirect it to the home page
            res.redirect(`/profile`)
        }
        )
    }
    )
}
)

app.get('/login', (req, res) => {
    res.render('login')
}
)

// login the user and redirect it to the home page
app.post('/login', async (req, res) => {

    // user can login with either username or email
    const { email, password } = req.body;

    let user = await userModel.findOne({ email })

    if (!user)
        res.status(300).send('Invalid Credentials')

    // check for the validity of password
    bcrypt.compare(password, user.password, (error, result) => {

        if (error)
            res.status(300).send('Invalid Credentials')

        // sending user a cookie for the login session
        let token = jwt.sign({ email: user.email, age: user.age }, 'secret')
        res.cookie('token', token)
        res.redirect(`/profile`)
    }
    )

}
)


app.get('/logout', isLoggedIn, (req, res) => {

    // resetting the sent token
    res.cookie('token', '')
    res.render('login')
}
)

app.post('/create-post', isLoggedIn, async (req, res) => {

    const { content, imageUrl } = req.body;

    let currentUser = await userModel.findOne({ email: req.user.email })

    const post = await postModel.create({
        content,
        imageUrl,
        user: currentUser._id
    })

    currentUser.posts.push(post._id);

    currentUser.save();

    res.redirect('/profile')
}
)

const port = 3000;

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);

}
)