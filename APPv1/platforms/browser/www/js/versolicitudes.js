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
    var id = params.get('tecnico');

    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_estado_tecnico",
        data: {"estado": 1,"tecnico":id},
        dataType: "JSON",
        success: function (res){
            if (res.length==0) {
                $("#solicitudes_en_curso").append(`
                <a class="panel-block has-text-grey-light">
                No existen solicitudes disponibles
                </a>`);
            }
            else{
                for (var i = 0; i < res.length; i++) {
                    let titulo = res[i].asunto;
                    let fecha = res[i].fecha;
                    let solicitud = res[i].id
                    $("#solicitudes_en_curso").append( 
                    `<a href="chat.html?solicitud=${solicitud}&tecnico=${id}" class="panel-block">
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
        }
    });

    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_estado_tecnico",
        data: {"estado": 2,"tecnico":id},
        dataType: "JSON",
        success: function (res){
            if (res.length==0) {
                $("#solicitudes_terminadas").append(`
                <a class="panel-block has-text-grey-light">
                No existen solicitudes disponibles
                </a>`);
            }
            else{
                for (var i = 0; i < res.length; i++) {
                    let titulo = res[i].asunto;
                    let fecha = res[i].fecha;
                    let solicitud = res[i].id
                    $("#solicitudes_terminadas").append( 
                    `<a href="chat.html?solicitud=${solicitud}&tecnico=${id}" class="panel-block">
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
        }
    });


}

function terminadas(){
    var terminadas = document.getElementById("terminadas");
    terminadas.className= "is-active";
    var en_curso = document.getElementById("en_curso");
    en_curso.className="";
    document.getElementById("solicitudes_terminadas").style.display = 'block';
    document.getElementById("solicitudes_en_curso").style.display = 'none';
}

function en_curso(){
    var terminadas = document.getElementById("terminadas");
    terminadas.className= "";
    var en_curso = document.getElementById("en_curso");
    en_curso.className="is-active";
    document.getElementById("solicitudes_terminadas").style.display = 'none';
    document.getElementById("solicitudes_en_curso").style.display = 'block';
}

function VerPendientes(){
    let params = new URLSearchParams(location.search);
    var tecnico = params.get('tecnico');
    window.location.href = "solicitudespendientes.html?tecnico="+tecnico;
}

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

cargar();