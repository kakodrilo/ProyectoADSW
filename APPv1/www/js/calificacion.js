function show_menu() {
    var nav = document.querySelector('.navbar-menu');
    if(nav.className == "navbar-menu") {
        nav.className = "navbar-menu is-active";
    } else {
        nav.className = "navbar-menu";
    }
};

function cargarTecnico(){
    let params = new URLSearchParams(location.search);
    var tecnico = params.get('tecnico');

    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/tecnico/obtener",
        data: {"id": tecnico},
        success: function (res) {
            document.getElementById("nombre_tecnico").innerHTML = res.nombre;
            
        },
        error: function () {
            window.alert("Error al cargar nombre del tecnico\nPor favor Intente nuevamente")
        }
    });

}

var nota = 0;

function carita1(){
    nota = 1;
    document.getElementById("carita1").className = "fas fa-angry fa-2x";
    document.getElementById("carita2").className = "far fa-frown fa-2x";
    document.getElementById("carita3").className = "far fa-meh fa-2x";
    document.getElementById("carita4").className = "far fa-smile fa-2x";
    document.getElementById("carita5").className = "far fa-grin-beam fa-2x";
}

function carita2(){
    nota = 2;
    document.getElementById("carita1").className = "far fa-angry fa-2x";
    document.getElementById("carita2").className = "fas fa-frown fa-2x";
    document.getElementById("carita3").className = "far fa-meh fa-2x";
    document.getElementById("carita4").className = "far fa-smile fa-2x";
    document.getElementById("carita5").className = "far fa-grin-beam fa-2x";
}
function carita3(){
    nota = 3;
    document.getElementById("carita1").className = "far fa-angry fa-2x";
    document.getElementById("carita2").className = "far fa-frown fa-2x";
    document.getElementById("carita3").className = "fas fa-meh fa-2x";
    document.getElementById("carita4").className = "far fa-smile fa-2x";
    document.getElementById("carita5").className = "far fa-grin-beam fa-2x";
}
function carita4(){
    nota = 4;
    document.getElementById("carita1").className = "far fa-angry fa-2x";
    document.getElementById("carita2").className = "far fa-frown fa-2x";
    document.getElementById("carita3").className = "far fa-meh fa-2x";
    document.getElementById("carita4").className = "fas fa-smile fa-2x";
    document.getElementById("carita5").className = "far fa-grin-beam fa-2x";
}
function carita5(){
    nota = 5;
    document.getElementById("carita1").className = "far fa-angry fa-2x";
    document.getElementById("carita2").className = "far fa-frown fa-2x";
    document.getElementById("carita3").className = "far fa-meh fa-2x";
    document.getElementById("carita4").className = "far fa-smile fa-2x";
    document.getElementById("carita5").className = "fas fa-grin-beam fa-2x";
}

function enviar(){
    if (nota != 0) {
        let params = new URLSearchParams(location.search);
        var tecnico = params.get('tecnico');
        let cliente = params.get('cliente');

        $.ajax({
            type: "PUT",
            url: "https://rubberserviceapi.herokuapp.com/v1/tecnico/actualizar_calificacion/"+tecnico,
            data: {"calificacion": nota},
            success: function () {
                window.alert("Calificacion enviada")
                window.location.href = "solicitudescliente.html?cliente="+cliente;
                
            },
            error: function () {
                window.alert("Error al enviar calificacion\nPor favor Intente nuevamente")
            }
        });
    }else{
        window.alert("Debe escoger alguna calificación")
    }
        
}

function omitir(){
    let params = new URLSearchParams(location.search);
    var cliente = params.get('cliente');
    window.location.href = "solicitudescliente.html?cliente="+cliente;
                
}

cargarTecnico();

function NuevaSolicitud(){
    let params = new URLSearchParams(location.search);
    let cliente = params.get('cliente');
    window.location.href = "enviarsolicitud.html?cliente="+cliente;
}

function SolicitudesCliente(){
    let params = new URLSearchParams(location.search);
    let cliente = params.get('cliente');
    window.location.href = "solicitudescliente.html?cliente="+cliente;
}