const express = require('express')
const userModel = require('./userModel')

const app = express()

const port = 3000;

app.get('/', (req, res) => {
    res.send('welcome to backend')
}
)

app.get('/register', async (req, res) => {
    let user = await userModel.create({
        name: 'raqib',
        email: 'raqib.com',
        password: '1234'
    })

    res.send(user)
}
)

app.get('/read', async (req, res) => {
    let user = await userModel.find({ name: 'raqib' });
    res.send(user);
}
)

app.get('/update', async (req, res) => {

    let updatedUser = await userModel.findOneAndUpdate({ email: "raqib.com" }, { name: 'raqibreyaz' }, { new: true })

    res.send(updatedUser)
}
)

app.get('/delete', async (req, res) => {
    let user = await userModel.findOneAndDelete({ email: 'raqib.com' });
    res.send(user);
}
)



app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);

}
)