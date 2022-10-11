'use strict'
const conexion = require('../database/db')

var Usuario = function (usuario) {
  this.nombre = usuario.nombre
  this.usuario = usuario.usuario
  this.password = usuario.password
}


//Crear
Usuario.create = function (nuevoUsuario, resultado) {
  conexion.query("INSERT INTO usuario SET ?", nuevoUsuario, function (error, respuesta) {
    if (error) {
      console.log("Error: ", error)
      resultado(error, null)
    }
    else {
      console.log(respuesta.insertId)
      resultado(null, respuesta.insertId)
    }
  })
}

module.exports = Usuario