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
    var tecnico = params.get('tecnico');

    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_estado",
        data: {"estado": 0},
        dataType: "JSON",
        success: function (res){
            if (res.length==0) {
                $("#solicitudes_pendientes").append(`
                <a class="panel-block has-text-grey-light">
                No existen solicitudes disponibles
                </a>`);
            }
            else{
                for (var i = 0; i < res.length; i++) {
                    var titulo = res[i].asunto;
                    var fecha = res[i].fecha;
                    let solicitud = res[i].id;
                    $("#solicitudes_pendientes").append( 
                    `<a href="solicitud.html?solicitud=${solicitud}&tecnico=${tecnico}" class="panel-block">
                    <span class="panel-icon" style=" margin-bottom: auto; margin-top: 6px; ">
                          <i class="fas fa-check-circle" aria-hidden="true"></i>
                        </span>
                    <div>
                        ${titulo}
                      <p id = "fecha" style="margin-left:0px;" class="is-size-7 has-text-grey">${fecha}</p>
                    </div>
                  </a>`);
                }
            }
        },
        error: function (){
            console.log("xd")
        }
    });
}

cargar()

function NuevaSolicitud(){
    let params = new URLSearchParams(location.search);
    let tecnico = params.get('tecnico');
    window.location.href = "solicitudespendientes.html?tecnico="+tecnico;
}

function VerSolicitudes(){
    let params = new URLSearchParams(location.search);
    let tecnico = params.get('tecnico');
    window.location.href = "versolicitudes.html?tecnico="+tecnico;
}