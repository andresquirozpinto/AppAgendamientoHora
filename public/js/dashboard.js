var App = App || {};
var currentPage = currentPage ||  {};

currentPage.events = {
    CHARLA_CREATED : "0",
    CREATE_CHARLA : "1",
    ELIMINAR_CHARLA_TECNICA : "2",
    ENVIAR_BLOQUE_ESTADO : "3",
    CHARLA_ELIMINADA : "4",
    CHARLA_TECNICA_SELECCIONADA : "5",
    UPDATE_CHARLA_TECNICA : "6"
}

currentPage.ModalForm = (function ($){
    let modalForm
    let initialized = false

    let init = function(){
        if(initialized) return
        modalForm = new ModalForm("#modal-charla-tecnica")

        $(currentPage).on(currentPage.events.CREATE_CHARLA,(event,data) => {_showCreate(data)})

        initialized = true
    }

    let _showCreate = function (data){
        $("#modal-charla-tecnica-dia").text(moment(data.dia + "-06-2022","DD-MM-YYYY").format(App.i18n.format.fullDate))
        $("#modal-charla-tecnica-hora").text(data.hora)

        modalForm.show({
            title : "Crear charla tecnica",
            actionButtonText : "Crear",
            action : () => {_doCreate(data.id)},
        })
    }

    let _doCreate = function (idBloque){
        if(!modalForm.fieldset.validate()) return
        let data = modalForm.fieldset.serialize()
        data.idBloque = idBloque
        $.ajax({
            type: "POST",
            data: data
        }).done(function (response){
            App.util.ui.notification.showSuccess("Charla técnica registrada correctamente")
            $(currentPage).trigger(currentPage.events.CHARLA_CREATED,response)
            modalForm.hide()
        })
    }

    return{
        init : init
    }

})(jQuery);

currentPage.ModalEliminarCharlaTecnica = (function ($){
    let modalForm
    let initialized = false
    let $btnUpdateCharlaTecnica
    let idCharla = null

    let init = function(){
        if(initialized) return
        modalForm = new ModalForm("#modal-charla-tecnica-eliminar")
        $btnUpdateCharlaTecnica = $("#btn-update-charla-tecnica")

        $(currentPage).on(currentPage.events.ELIMINAR_CHARLA_TECNICA,(event,id) => {_show(id)})

        initialized = true
    }

    let _show = function (id){
        //console.log(id)
        $.ajax({
            type: "GET",
            url: id
        }).done(function (charla_tecnica){

            $("#modal-charla-tecnica-expositor-numcontrato").text(charla_tecnica.expositor.numeroContrato)
            $("#modal-charla-tecnica-expositor-rut").text(charla_tecnica.expositor.rut)
            $("#modal-charla-tecnica-expositor-razonSocial").text(charla_tecnica.expositor.razonSocial)
            $("#modal-charla-tecnica-expositor-stand").text(charla_tecnica.expositor.stand)
            $("#modal-charla-tecnica-expositor-pabellon").text(charla_tecnica.expositor.pabellon)
            $("#modal-charla-tecnica-titulo").text(charla_tecnica.titulo)
            $("#modal-charla-tecnica-bloque").text(charla_tecnica.bloque.sala)

            modalForm.fieldset.get("titulo").val(charla_tecnica.titulo)
            modalForm.fieldset.get("contactoNombre").val(charla_tecnica.contactoNombre)
            modalForm.fieldset.get("contactoFono").val(charla_tecnica.contactoFono)
            modalForm.fieldset.get("contactoCargo").val(charla_tecnica.contactoCargo)
            modalForm.fieldset.get("contactoEmail").val(charla_tecnica.contactoEmail)
            modalForm.fieldset.get("idCategoria").val(charla_tecnica.categoria.id)
            modalForm.fieldset.get("descripcion").val(charla_tecnica.descripcion)

            $btnUpdateCharlaTecnica.off("click").click(function (){
                idCharla = charla_tecnica.id
                if(!modalForm.fieldset.validate()) return
                let data = modalForm.fieldset.serialize()
                data.idCharla = idCharla
                data.idBloque = id
                console.log(data)
                $.ajax({
                    type: "PUT",
                    url: "consulta-update-charla",
                    data: data,
                }).done(function (response){
                    App.util.ui.notification.showSuccess("Charla técnica actualizada correctamente")
                    modalForm.hide()
                })
            })

            modalForm.show({
                title : "Eliminar charla técnica",
                actionButtonText : "Eliminar",
                action : () => {_doEliminar(id)},
                reset : false
            })
        })
    }

    let _doEliminar = function (id){
        bootbox.confirm("¿Realmente desea eliminar la charla técnica seleccionada?", function (result){
            if(result){
                $.ajax({
                    type: "DELETE",
                    url: "eliminar",
                    data: {idBloque: id},
                }).done(function (response){
                    App.util.ui.notification.showSuccess("Charla técnica eliminada correctamente")
                    //event
                    modalForm.hide()
                    $(currentPage).trigger(currentPage.events.CHARLA_ELIMINADA,id)
                })
            }
        })
    }

    /*let _doUpdateCharlaTecnica = function (){
        //console.log(id)
    }*/

    return{
        init : init
    }

})(jQuery);

currentPage.Main = function ($){

    let $calendario
    let $sala1,$sala2,$sala3,$sala4
    let $btnExportar
    let $test


    let init = function (){
        $calendario = $("#calendario-charlas")
        $sala1 = $("#charlas-sala-1")
        $sala2 = $("#charlas-sala-2")
        $sala3 = $("#charlas-sala-3")
        $sala4 = $("#charlas-sala-4")
        $btnExportar = $("#btn-exportar")
        $test = $("#test")

        $test.click(function (){
          alert('dsfhdsf')
        })

        $(".charla-dia-selector").click(function (){
            $(".charla-dia-selector").removeClass("border-left-success").addClass("border-left-dark")
            let $this = $(this).addClass("border-left-success").removeClass("border-left-dark")
            cargarBloques($this.data("dia"))
        })

        $(currentPage).on(currentPage.events.CHARLA_ELIMINADA,(event,id) => {
            $("#"+id).removeClass("bg-primary").addClass("bg-success").text("Disponible")
        })

        $btnExportar.click(function (){
            window.open("exportar/","_blank")
        })


        cargarBloques(13)

    }



    return{
        init : init
    }
}(jQuery);

$(document).ready(function () {
    currentPage.Main.init()
    //currentPage.ModalForm.init()
    //currentPage.ModalEliminarCharlaTecnica.init()
});