const express = require('express')

const app = express();

// middleware will run before hitting any route
app.use((req, res, next) => {
    console.log('middleware chala');
    next();
}
)

// this middleware will run after the previous middleware passes the request
app.use((req, res, next) => {
    console.log('middleware chala phir se');
    next();
}
)

app.get('/', (req, res) => {
    console.log('finally / route hit kiya');

    res.send('hi buddy')
}
)

app.get('/about', (req, res) => {
    console.log('finally /about route hit kiya');

    res.send('hi')
}
)

app.get('/profile', (req, res, next) => {

    console.log('in the route');

    // passing error to midleware
    return next(new Error("Not Implemented"))
}
)

// this type of middleware runs only on errors
app.use((error, req, res, next) => {
    console.log('in a middleware');

res.status(404).send(error.message)
    
    next();
}
)

app.listen(3000);