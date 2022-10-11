const express = require('express')
const router = express.Router()
const path = require ('path')

//const conexion = require('../database/db')

router.get('/', (req, res) => {
    //conexion()
    res.render('index')
})

router.get('/login', (req, res) => {
    console.log('LOGIN...')
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

module.exports = router