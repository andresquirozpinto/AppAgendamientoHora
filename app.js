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

//Para eliminar el cache y que no se pueda volver atgras con el boton de back luego de que hacemos un LOGOUT
app.use(function(req, res, next){
    if(!req.usuario)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

app.listen(3000, ()=>{
    console.log('Server corriendo en puerto 3000')
})