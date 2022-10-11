const mysql = require('mysql')

const conexionBD = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
})

conexionBD.connect(function(error) {
  if (error) throw error
  console.log("Conectado!")
})

module.exports = conexionBD