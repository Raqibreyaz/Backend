const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

function getPath(file) {

   try {

     if(file.includes(' '))
     file = file.replaceAll(' ', '_');
 
   } catch (error) {
    console.log('in catch ',file);
    

   }
    return `./files/${file.replace('.txt', '')}.txt`
}

// will just render the files
app.get('/', (req, res) => {
    fs.readdir('./files', (error, files) => {

        // for (const file of files) {
        //     console.log(file);
        //     fs.readFile(`./files/${file}`, 'utf8', (error, content) => {
        //         console.log(content);

        //     }
        //     )
        // }
if(error)
console.log(error);

        res.render("index", { files })
    }
    )
}
)

// create file from provided data
app.post('/create', (req, res, next) => {

    if (req.body.title) {

        fs.writeFile(getPath(req.body.title), req.body.details, (error) => {
            if (error)
                console.log(error);

        }
        )
    }
    res.redirect('/')
}
)

// show file details in frontend
app.get('/files/:filename', (req, res) => {
    fs.readFile(getPath(req.params.filename), 'utf8', (error, content) => {
        if (error) console.log(error);

        res.render('show', { name: req.params.filename, content })
    }
    )
}
)

// edit filename
app.get('/edit/:filename', (req, res) => {
    res.render('edit', { file: req.params.filename })
}
)

app.post('/edit', (req, res) => {
    console.log(req.body);

    if (req.body.NewName) {
        fs.rename(getPath(req.body.PreviousName),getPath(req.body.NewName), (error) => {
            if (error)
                console.log(error);
            else
                console.log('name changed');
        }
        )
    }

    res.redirect('/')
}
)

app.get('/delete/:filename', (req, res) => {
    fs.unlink(getPath(req.params.filename), (error) => {
        if (error)
            console.log(error);

        res.redirect('/')
    }
    )
}
)


const port = 3000;

app.listen(port, (req, res) => {
    console.log(`app is running on http://localhost:${port}`);

}
)