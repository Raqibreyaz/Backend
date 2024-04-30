const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')
const userModel = require('./models/user.models')

const app = express()

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
}
)

// will create user by encrypting password and sending the jwt token as cookie
app.post('/create', async (req, res) => {

    const { username, email, password } = req.body;

    // encrypting password before saving to database
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, async (error, hash) => {

            let createdUser = await userModel.create(
                {
                    username,
                    email,
                    password: hash,
                }
            )


            console.log('data got from  user ', req.body);

            // creating a jwt token from provided payload
            let token = jwt.sign({ email }, 'secret')

            // sending the token as a cookie
            res.cookie('token', token)

            // res.send(createdUser)

            res.render('account', { username })
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

app.post('/login', async (req, res) => {

    const discard = () => {
        res.send('EMAIL OR PASSWORD NOT VALID')
    }

    const { email, password } = req.body;

    //   finding user in the data base
    let user = await userModel.findOne({ email })

    if (!user)
        discard();

    // validating password of user
    const passCheck = await bcrypt.compare(password, user.password)

    if (!passCheck)
        discard();

    // providing access token
    let token = jwt.sign({ email }, 'secret')

    res.cookie('token', token)

    res.render('account', { username: user.username })
}
)

app.get('/logout', (req, res) => {

    // console.log(req.cookies);


    // if the user is really logged in then clear cookies
    if (req.cookies.token) {

        res.cookie('token', '')

        res.send('you are logged out')
    }
    else (
        res.send('Unauthorized activity')
    )
}
)

const port = 3000;

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);
}
)