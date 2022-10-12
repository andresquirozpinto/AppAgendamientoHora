const cargarElementosPlantilla = () => {
    //crear html de listado, etiqueta ul
    const tablaDatos = `
    <div class="row mb-0 mx-0 mt-3 border border-4" style="background: white;">
      <div class="col d-flex text-center">
          <div class="col-2 fw-bold fs-5">
            Fecha
          </div>
          <div class="col-2 fw-bold fs-5">
            Estado
          </div>
          <div class="col-3 fw-bold fs-5">
            Horario
          </div>
          <div class="col-3 fw-bold fs-5">
            Comentario
          </div>
        </div>
      </div>
      <ul id="lista-bloques" class="list-group">
        
      </ul>
    `
    //llamar por ID los contenedores para dibujar el html dentro de cada uno(listaDatos, Formulario)
    const seccionDatos = document.getElementById('contenedor-datos')
    //con innetHTML, dibujamos lo que creamos en el HTML
    seccionDatos.innerHTML = tablaDatos
  
  }

const listarCargarDatos = async () => {
    //se llama al end point GET (listar todos)
    const respuesta = await fetch('/listar-bloques')
    //le damos formato JSON
    const bloquesHorarios = await respuesta.json()
  
    //dibujamos los datos del JSON en una etiqueta li
    const dibujarDatosListado = bloqueHorario => `
    <li class="list-group-item border border-4">
      <div class="row">
        <div class="col d-flex text-center">
          <div class="col-2">
            ${bloqueHorario.dia} - ${bloqueHorario.mes} - ${bloqueHorario.anio}
          </div>
          <div class="col-2">
          ${bloqueHorario.estado}
          </div>
          <div class="col-2">
          ${bloqueHorario.horario}
          </div>
          <div class="col-2">
          ${bloqueHorario.comentario}
          </div>
          <div class="col-1">
            <button class="btn btn-success" style="margin-left: 40px;" data-bs-toggle="modal" data-bs-target="#mimodal" data-update-id="${bloqueHorario.id}">Editar</button>
          </div>
          <div class="col-1" style="margin-left: 60px;">
            <button class="btn btn-danger" data-delete-id="${bloqueHorario.id}">Eliminar</button>
          </div>
        </div>
      </div>
    </li>
    `
  
    const listaBloquesHorarios = document.getElementById('lista-bloques')
    listaBloquesHorarios.innerHTML = bloquesHorarios.map(bloqueHorario => dibujarDatosListado(bloqueHorario)).join('')
  }

window.onload = () => {
    cargarElementosPlantilla()
    listarCargarDatos()
  }