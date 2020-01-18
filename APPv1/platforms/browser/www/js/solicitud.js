function show_menu() {
    var nav = document.querySelector('.navbar-menu');
    if(nav.className == "navbar-menu") {
        nav.className = "navbar-menu is-active";
    } else {
        nav.className = "navbar-menu";
    }
};

function cambiar_estado(id,tecnico){

    $.ajax({
        type: "PUT",
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/cambiar_estado/"+id,
        data: {"estado": 1},
        success: function () {
            cambiarTecnico(id,tecnico)
            
        },
        error: function () {
            window.alert("Error al aceptar solicitud\nPor favor Intente nuevamente")
        }
    });
}

function cambiarTecnico(id,tecnico) {
    $.ajax({
        type: "PUT",
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/cambiar_tecnico/"+id,
        data: {"tecnico": tecnico},
        success: function () {
            window.alert("Solicitud aceptada con éxito");
            window.location.href = "versolicitudes.html?tecnico="+tecnico;
        },
        error: function () {
            window.alert("Error al aceptar solicitud\nPor favor Intente nuevamente")
        }
    });
}


function cargar(){
    let params = new URLSearchParams(location.search);
    var id = params.get('solicitud');
    
    var cliente;

    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/obtener_id",
        data: {"id" : id},
        dataType: "JSON",
        success: function (res){
            document.getElementById("titulo").innerHTML = res.asunto;
            document.getElementById("fecha").innerHTML = res.fecha;
            document.getElementById("descripcion").innerHTML = "<p>"+res.problema+"</p>";
            document.getElementById("categoria").innerHTML = res.categoria;
            if (res.archivo != null) {
                document.getElementById("archivo").innerHTML = '<figure class= "image"><img src="'+res.archivo+'"></figure>';
            }
            else{
                document.getElementById("archivo").innerHTML = '<figure class= "image"><img src=""></figure>';
            }
            cliente = res.id_cliente;
            $.ajax({
                type: "GET",
                url: "https://rubberserviceapi.herokuapp.com/v1/cliente/obtener",
                data: {"id": cliente},
                dataType: "JSON",
                success: function (res){
                    document.getElementById("nombre").innerHTML = res.nombre;
                }
            });
            
        },
        error: function (){
            console.log("xd");
        }

    })

    $.ajax({
        type: "GET",
        url: "https://rubberserviceapi.herokuapp.com/v1/cliente/obtener",
        data: {"id": cliente},
        dataType: "JSON",
        success: function (res){
            document.getElementById("nombre").innerHTML = res.nombre;
        }
    });

    
    
    
}

cargar();

function aceptar(){
    let params = new URLSearchParams(location.search);
    let id = params.get('solicitud');
    let tecnico = params.get('tecnico');
    cambiar_estado(id,tecnico);
}

function rechazar(){
    let params = new URLSearchParams(location.search);
    let tecnico = params.get('tecnico');
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