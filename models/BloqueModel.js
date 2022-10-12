'use strict'
const conexion = require('../database/db')

var Bloque = function (bloque) {
  this.dia = bloque.dia
  this.mes = bloque.mes
  this.anio = bloque.anio
  this.estado = bloque.estado
  this.horario = bloque.horario
  this.comentario = bloque.comentario
}

//Listar todos
Bloque.findAll = function (resultado) {
    conexion.query("SELECT * FROM bloque_hora", function (error, respuesta) {
    if (error) {
      console.log("Error: ", error)
      resultado(null, error)
    }
    else {
      console.log('Alumnos : ', respuesta)
      resultado(null, respuesta)
    }
  })
}



module.exports = Bloque