const cookieParser = require('cookie-parser')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cookieParser())

app.get('/', (req, res) => {
    // sending cookie and the cookie will be in the browser for every route
    // a key value pair
    // res.cookie('name', 'raqib')

    bcrypt.genSalt(10, (error, salt) => {
        // hash is the mixed up of salt and the provided string
        bcrypt.hash('loploldw', salt, (error, hash) => {
            console.log('salt is ', salt);
            console.log('hash is ', hash);
        }
        )
        // will compare if the two are same and returns boolean
        bcrypt.compare('provided string', 'hash')
    }
    )

    // the server send the access token as a string
    let token = jwt.sign({ email: 'raquib@raquib.com' }, 'secret')

    // send the token string in the form of cookie
    res.cookie('token', token)
    res.send('done')
}
)

app.get('/read', (req, res) => {

    // cookies will be available on every route
    // console.log(req.cookies)

    console.log(req.cookies.token)
    res.send('cookie available')

    // verify the receieved token
    let data = jwt.verify(req.cookies.token, 'secret')

    console.log(
        data
    );

}
)

const port = 3000

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);

}
)