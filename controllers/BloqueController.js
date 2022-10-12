const Bloque = require('../models/BloqueModel')

exports.findAll = function (req, res) {
    Bloque.findAll(function (error, bloque) {
    if (error)
      res.send(error)
    //console.log('res', bloque)
    res.send(bloque)
  })
}