const express = require('express');
const userModel = require('./models/user.models')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
}
)

app.post('/create', async (req, res) => {
    console.log(req.body);

    const user = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        imageUrl: req.body.imageUrl
    })

    res.redirect('/read')
}
)

app.get('/read', async (req, res) => {
    res.render('read', { users: await userModel.find() })
}
)

app.get('/update/:id', async (req, res) => {

    let user = await userModel.findOne({ _id: req.params.id })

    res.render('edit', { user })
}
)

app.post('/edit/:id', async (req, res) => {

    const { name, imageUrl, email } = req.body;

    let user = await userModel.findOneAndUpdate({ _id: req.params.id }, { name, email, imageUrl }, { new: true })

    res.redirect('/read')
}
)

app.get('/delete/:id', async (req, res) => {
    let user = await userModel.findOneAndDelete({ _id: req.params.id })

    res.redirect('/read')
}
)

const port = 3000;

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);
}
)