const express = require('express')
const router = express.Router()
//const path = require ('path')
const registroUsuarioController = require('../controllers/RegistroUsuarioController')

//const conexion = require('../database/db')
//Rutas para las vistas
router.get('/', (req, res) => {
    //conexion()
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', registroUsuarioController.register)

module.exports = router