function show_menu() {
    var nav = document.querySelector('.navbar-menu');
    if(nav.className == "navbar-menu") {
        nav.className = "navbar-menu is-active";
    } else {
        nav.className = "navbar-menu";
    }
};

var der;
var solicitud;
var ultimo_mensaje = -1;
var id_tecnico;

function cargar(){
    let params = new URLSearchParams(location.search);
    solicitud = params.get('solicitud');
    if(params.get('cliente') != null) {
        document.getElementById("menu").innerHTML=`
        <div class="navbar-brand">
      <a class="navbar-item" href="">
        <h1 class="subtitle has-text-grey-dark has-text-weight-medium "> <i class="fas fa-cog" style="color:#3273dc;padding-right: 5px "></i> Rubber<b>Service</b></h1>
      </a>
  
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onclick="show_menu()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div  class="navbar-menu" id="menu_movil">
      <div class="navbar-start">

        <a class="navbar-item">
          <i class="fas fa-user fa-1x" style="padding-right: 8px "></i>
          Editar Perfil
        </a>

        <a onclick="SolicitudesCliente()" class="navbar-item">
            <i class="fas fa-clipboard-check fa-1x" style="padding-right: 8px "></i>
            Mis Solicitudes
        </a>

        <a href="index.html" class="navbar-item">
            <i class="fas fa-power-off fa-1x" style="padding-right: 8px "></i>
            Salir
        </a>

      </div>
  
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a onclick="NuevaSolicitud()" class="button is-link">
                <i class="far fa-clipboard fa-1x" style="padding-right: 8px "></i> Nueva Solicitud
            </a>
          </div>
        </div>
      </div>
    </div>
        `;
        let params = new URLSearchParams(location.search);
        let id = params.get('cliente');
        der = 0;
        var tecnico;
        $.ajax({
            type: "GET",
            url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_id",
            data: {"id": solicitud},
            success: function (res) {
                tecnico = res.tecnico;
                id_tecnico = res.tecnico;
                if (res.estado == 2) {
                    document.getElementById("finalizar").style.display = 'none';
                }
                $.ajax({
                    type: "GET",
                    url: "https://rubberserviceapi.herokuapp.com/v1/tecnico/obtener",
                    data: {"id": tecnico},
                    success: function (res2) {
                        document.getElementById("nombre").innerHTML = "Técnico <a>"+res2.nombre+"</a>";
                    },
                    error: function () {
                        window.alert("Error al cargar nombre del tecnico\nPor favor Intente nuevamente")
                    }
                });
            },
            
            error: function () {
                window.alert("xd1")
            }
            
        });
        
    }
    else {
        document.getElementById("menu").innerHTML = `
        <div class="navbar-brand">
      <a class="navbar-item" href="">
        <h1 class="subtitle has-text-grey-dark has-text-weight-medium "> <i class="fas fa-cog" style="color:#3273dc;padding-right: 5px "></i> Rubber<b>Service</b></h1>
      </a>
  
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onclick="show_menu()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div  class="navbar-menu" id="menu_movil">
      <div class="navbar-start">

        <a class="navbar-item">
          <i class="fas fa-user fa-1x" style="padding-right: 8px "></i>
          Editar Perfil
        </a>

        <a onclick="VerSolicitudes()" class="navbar-item">
            <i class="fas fa-clipboard-check fa-1x" style="padding-right: 8px "></i>
            Solicitudes Aceptadas
        </a>

        <a href="index.html" class="navbar-item">
            <i class="fas fa-power-off fa-1x" style="padding-right: 8px "></i>
            Salir
        </a>

      </div>
  
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a onclick="NuevaSolicitud2()" class="button is-link">
                <i class="far fa-clipboard fa-1x" style="padding-right: 8px "></i> Aceptar Nueva Solicitud
            </a>
          </div>
        </div>
      </div>
    </div>
        `;
        let params = new URLSearchParams(location.search);
        let id = params.get('tecnico');
        var cliente;
        der = 1;
        $.ajax({
            type: "GET",
            url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_id",
            data: {"id": solicitud},
            success: function (res) {
                if (res.estado == 2) {
                    document.getElementById("finalizar").innerHTML = "Pago realizado";
                }
                else{
                    document.getElementById("finalizar").style.display = 'none';
                }
                cliente = res.id_cliente;
                $.ajax({
                    type: "GET",
                    url: "https://rubberserviceapi.herokuapp.com/v1/cliente/obtener",
                    data: {"id": cliente},
                    success: function (res) {
                        document.getElementById("nombre").innerHTML = `Cliente <a>${res.nombre}</a>`;
                        
                    },
                    error: function () {
                        window.alert("Error al cargar nombre del cliente\nPor favor Intente nuevamente")
                    }
                });
            },
            error: function () {
                window.alert("Efgfg")
            }
        });
        

    }
    actualizarChat();    
}


function actualizarChat(){
    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/mensaje/updateChat",
        data: {"solicitud": solicitud, "id": ultimo_mensaje},
        dataType: "JSON",
        success: function (res){
            for (let i = 0; i < res.length; i++) {
                let texto = res[i].texto;
                let hora = res[i].hora;
                let fecha = hora.substring(0,10);
                hora = hora.substring(11,16);
                let emisor = res[i].emisor;
                if (der != emisor) {
                    $("#chat").append( `
                    <div class="mensaje-recibido" style="margin-right: 30%;margin-bottom: 10px;">
                        <div class="notification" style="margin-bottom: 0%;" >
                            ${texto} 
                        </div>
                        <p id = "fecha " style="color: #747474;display: block;font-size: 12px;margin: 8px 0 0;" >${fecha} ${hora}</p>
                    </div>`);    
                }
                else{
                $("#chat").append( `
                <div class="mensaje" style="margin-left: 30%; margin-bottom: 10px;">
                    <div class="notification is-link" style="margin-bottom: 0%;" >
                        ${texto} 
                    </div>
                    <p id = "fecha " style="color: #747474;display: block;font-size: 12px;margin: 8px 0 0;" >${fecha} ${hora}</p>
                </div>`);     
                }
            }
            if(res.length != 0){
                ultimo_mensaje = res[res.length-1].id;           
            }
        }
    });
}

function enviar(){
    let texto = document.getElementById("texto").value;
    let date = new Date();

    
    let mes = date.getMonth()+1;
    mes = mes.toString();
    if(mes.length == 1){
        mes = "0"+mes;
    }
    let dia = date.getDate();
    dia = dia.toString();
    if(dia.length == 1){
        dia = "0"+dia;
    }
    let hora = date.getHours();
    hora = hora.toString();
    if(hora.length == 1){
        hora = "0"+hora;
    }
    let minutos = date.getMinutes();
    minutos = minutos.toString();
    if(minutos.length == 1){
        minutos = "0"+minutos;
    }
    let segundos = date.getSeconds();
    segundos = segundos.toString();
    if(segundos.length == 1){
        segundos = "0"+segundos;
    }
    let fecha = date.getFullYear() + "-" + mes + "-" + dia;
    hora = hora + ":" + minutos + ":" + segundos; 
    fecha = fecha+"T"+hora;
    
    if(texto != ""){     
        if (der == 1){
            $.ajax({
                type: "POST",
                url: "https://rubberserviceapi.herokuapp.com/v1/mensaje/agregar",
                contentType: 'application/json',
                data: JSON.stringify({
                    "solicitud": solicitud,
                    "texto": texto,
                    "emisor": 1,
                    "hora" : fecha    
                }),
                dataType: "JSON",
                success: function (res){
                    actualizarChat();
                },
                error: function (e) {
                    console.log("error");
                    console.log(fecha);
                    console.log(e);
                }
            });
        }
        else{
            $.ajax({
                type: "POST",
                url: "https://rubberserviceapi.herokuapp.com/v1/mensaje/agregar",
                contentType: 'application/json',
                data: JSON.stringify({
                    "solicitud": solicitud,
                    "texto": texto,
                    "emisor": 0,
                    "hora" : fecha   
                }),
                dataType: "JSON",
                success: function (res){
                    actualizarChat();
                },
                error: function (e) {
                    console.log("error");
                    console.log(fecha);
                    console.log(e);
                }
            });
        }
        document.getElementById("texto").value = "";
    }
}

cargar();
setInterval(actualizarChat, 5000);

document.getElementById("finalizar").addEventListener('click', function f(){
    let params = new URLSearchParams(location.search);
    let id = params.get('cliente');
    window.location.href = "pago.html?solicitud="+solicitud+"&cliente="+id+"&tecnico="+id_tecnico;
})


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


function NuevaSolicitud2(){
    let params = new URLSearchParams(location.search);
    let tecnico = params.get('tecnico');
    window.location.href = "solicitudespendientes.html?tecnico="+tecnico;
}

function VerSolicitudes(){
    let params = new URLSearchParams(location.search);
    let tecnico = params.get('tecnico');
    window.location.href = "versolicitudes.html?tecnico="+tecnico;
}