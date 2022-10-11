const express = require('express')
const router = express.Router()
//const path = require ('path')
const registroUsuarioController = require('../controllers/RegistroUsuarioController')
const loginController = require('../controllers/LoginController')

//const conexion = require('../database/db')
//Rutas para las vistas
router.get('/', (req, res) => {
    //conexion()
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login', {alert:false})
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', registroUsuarioController.register)
router.post('/login', loginController.login)

module.exports = router