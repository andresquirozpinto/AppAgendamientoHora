const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.static('static'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

dotenv.config({path: './env/.env'})

//para trabajar las cookies
app.use(cookieParser())

app.use('/', require('./routes/router'))

/*app.get('/', (req, res) => {
    res.render('index')
})*/

app.listen(3000, ()=>{
    console.log('Server corriendo en puerto 3000')
})