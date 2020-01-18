function show_menu() {
    var nav = document.querySelector('.navbar-menu');
    if(nav.className == "navbar-menu") {
        nav.className = "navbar-menu is-active";
    } else {
        nav.className = "navbar-menu";
    }
};

function cargar(){
    let params = new URLSearchParams(location.search);
    let tecnico = params.get('tecnico');
    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/tecnico/obtener",
        data: {"id": tecnico},
        success: function (res) {
            document.getElementById("nombre").innerHTML = res.nombre;
        },
        error: function () {
            window.alert("Error al cargar nombre del técnico\nPor favor Intente nuevamente")
        }
    });
    
}

function validation() {
    var input_nombre = document.getElementById("input_nombre").value;
    var input_ntarjeta = document.getElementById("input_ntarjeta").value;
    var input_cvc = document.getElementById("input_cvc").value;
    if (input_nombre === '' || input_ntarjeta === '' || input_cvc === '') {
        alert("Debe rellenar todos los campos del formulario para poder enviar la solicitud.");
        return false;
    } else {
        return true;
    }
};

function aceptar(){
    if (validation()) {
        let params = new URLSearchParams(location.search);
        let solicitud = params.get('solicitud');
        let cliente = params.get('cliente');
        let tecnico = params.get('tecnico');
        $.ajax({
            type: "PUT",
            url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/cambiar_estado/"+solicitud,
            data: {"estado": 2},
            success: function (res) {
                window.location.href = "calificacion.html?cliente="+cliente+"&tecnico="+tecnico;
            },
            error: function () {
                window.alert("Error al realizar pago\nPor favor Intente nuevamente")
            }
        });
    }
    

}
function rechazar(){
    let params = new URLSearchParams(location.search);
    let solicitud = params.get('solicitud');
    let cliente = params.get('cliente');
    
    window.location.href = "chat.html?solicitud="+solicitud+"&cliente="+cliente;

}

cargar()

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