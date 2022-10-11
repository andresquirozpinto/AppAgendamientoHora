const agregarUsuario = () => {
    let formularioAnotacionAlumno = document.getElementById('formulario-registro-usuario')
    //document.getElementById('btnActualizarAlumno').style.display = 'none'
    //document.getElementById('btnCrearAlumno').style.display = 'block'
    let txtNombre = document.getElementById('input-nombre')
    let txtUsuario = document.getElementById('input-usuario')
    let txtPassword = document.getElementById('input-password')
    let btnGuardarAlumno = document.getElementById('btnCrearAlumno')
    btnGuardarAlumno.onclick = function guardarAlumno() {
      let alumno = {
        nombre: txtNombre.value,
        usuario: txtUsuario.value,
        password: txtPassword.value,
      }
      console.log(alumno)
  
      if (txtNombre.value == "" || txtUsuario.value == "" || txtPassword.value == "") {
        alert('Debe completar todos los campos!!')
      } else {
        fetch('/register', {
          method: 'POST',
          body: JSON.stringify(alumno),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        alert('Registro exitoso!!')
      }

      formularioAnotacionAlumno.reset()
    }
  }

window.onload = () => {
    agregarUsuario()
}