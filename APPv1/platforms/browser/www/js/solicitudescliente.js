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
    var cliente = params.get('cliente');

    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_estado_cliente",
        data: {"estado": 0,"cliente":cliente},
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
                    $("#solicitudes_pendientes").append( 
                    `<a class="panel-block">
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
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_estado_cliente",
        data: {"estado": 1,"cliente":cliente},
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
                    let id = res[i].id
                    $("#solicitudes_en_curso").append( 
                    `<a href="chat.html?solicitud=${id}&cliente=${cliente}" class="panel-block">
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
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_estado_cliente",
        data: {"estado": 2,"cliente":cliente},
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
                    let id = res[i].id
                    $("#solicitudes_terminadas").append( 
                    `<a href="chat.html?solicitud=${id}&cliente=${cliente}"class="panel-block">
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
    document.getElementById("en_curso").className = "";
    document.getElementById("terminadas").className = "is-active";
    document.getElementById("pendientes").className = "";
        
    document.getElementById("solicitudes_en_curso").style.display = 'none';
    document.getElementById("solicitudes_terminadas").style.display = 'block';
    document.getElementById("solicitudes_pendientes").style.display = 'none';
  
}

function en_curso(){
    document.getElementById("en_curso").className = "is-active";
    document.getElementById("terminadas").className = "";
    document.getElementById("pendientes").className = "";
    
    document.getElementById("solicitudes_en_curso").style.display = 'block';
    document.getElementById("solicitudes_terminadas").style.display = 'none';
    document.getElementById("solicitudes_pendientes").style.display = 'none';
}

function pendientes(){
    document.getElementById("en_curso").className = "";
    document.getElementById("terminadas").className = "";
    document.getElementById("pendientes").className = "is-active";
    
    document.getElementById("solicitudes_en_curso").style.display = 'none';
    document.getElementById("solicitudes_terminadas").style.display = 'none';
    document.getElementById("solicitudes_pendientes").style.display = 'block';
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