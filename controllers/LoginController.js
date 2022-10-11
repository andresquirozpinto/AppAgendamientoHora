const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

exports.login = async (req, res)=>{
    try{
        const usuario = req.body.usuario
        const password = req.body.password
        console.log(usuario+' - '+password)
        if(!usuario || !password){
            /*res.render('login',{
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButtom: true,
                timer: false,
                ruta: 'login'
            })*/
            console.log('Advertencia: Debe ingresar un usuario y password')
        }else{
            conexion.query('SELECT * FROM usuario WHERE usuario = ?', [usuario], async (error, resultado)=>{
                console.log(resultado.usuario)
                if(resultado.lenght == 0){
                    console.log('Advertencia: Debe ingresar un usuario y password1111')
                }else{
                    console.log('validadooo')
                }
            })
        }
    } catch(e){
        console.log('Error: '+e)
    }
}