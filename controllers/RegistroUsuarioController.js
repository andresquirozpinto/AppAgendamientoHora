const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

const Usuario = require('../models/UsuarioModel')

//procedimiento para registrar, register especificar en router
/*exports.register = async (req, res)=>{
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const password = req.body.password
    let passHash = await bcryptjs.hash(password, 8)
    console.log(nombre+' - '+usuario+' - '+password+' - '+passHash)
    
}*/

exports.register = function (req, res) {
    const nuevo_usuario = new Usuario(req.body)
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ error: true, message: 'Error al guardar.' })
    } else {
        Usuario.create(nuevo_usuario, function (error, usuario) {
        if (error)
          res.send(error)
        console.log(nuevo_usuario)
        res.json({ error: false, message: "Usuario agregado correctamente!", data: usuario })
      })
    }
  }