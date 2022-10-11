const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')


exports.login = async (req, res) => {
    try {
        const usuario = req.body.usuario
        const password = req.body.password
        console.log(usuario + ' - ' + password)
        if (!usuario || !password) {
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'info',
                showConfirmButtom: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuario WHERE usuario = ?', [usuario], async (error, resultado)=>{
                if (resultado.lenght == 0 || !(await bcryptjs.compare(password, resultado[0].password))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Advertencia",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon: 'info',
                        showConfirmButtom: true,
                        timer: false,
                        ruta: 'login'
                    })
                }else{
                    const id = resultado[0].id
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    console.log('TOKEN: ' + token + ' para el USUARIO: ' + usuario)

                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexion Exitosa",
                        alertMessage: "LOGIN CORRECTO...!!!!",
                        alertIcon: 'success',
                        showConfirmButtom: false,
                        timer: 800,
                        ruta: ''
                    })
                }
            })
        }
    } catch (e) {
        console.log('Error: ' + e)
    }
}