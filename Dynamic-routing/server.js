const express = require('express')
const path = require('path')

const app = express()

// parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//har request ke liye jo bhi static files hain unhein public folder mein dekhne jaana
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render("index")
}
)

// : makes dynamic route
app.get('/profile/:username', (req, res) => {
    res.send(`welcome ${req.params.username}`)
}
)
app.get('/author/:username/:age', (req, res) => {
    res.send(`welcome ${req.params.username} of age ${req.params.age}`)
}
)

const port = 3000;

app.listen(3000, () => {
    console.log(`app is running on http://localhost:${port}`);
}
)