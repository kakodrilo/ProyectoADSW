function show_menu() {
    var nav = document.querySelector('.navbar-menu');
    if(nav.className == "navbar-menu") {
        nav.className = "navbar-menu is-active";
    } else {
        nav.className = "navbar-menu";
    }
};

function getBaseUrl ()  {

    var fileInput = document.querySelector('#file-js-example input[type=file]');
        if (fileInput.files.length > 0) {
          var fileName = document.querySelector('#file-js-example .file-name');
          fileName.textContent = fileInput.files[0].name;

        }
    
}


function submit_by_id() {
    var fecha = new Date()
    var asunto = document.getElementById("asunto").value;
    var categoria = document.getElementById("categoria").value;
    var descripcion = document.getElementById("descripcion").value;

    if (document.querySelector('#file-js-example input[type=file]')['files'][0]) {
        var file = document.querySelector('#file-js-example input[type=file]')['files'][0];
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
        baseString = reader.result;
        };
        reader.readAsDataURL(file);
    }
    
    if (validation()){
        let params = new URLSearchParams(location.search);
        var id_cliente = params.get('cliente');
        $.ajax({
            type:"POST",
            
            url: "https://rubberserviceapi.herokuapp.com/v1/solicitud/agregar",
            contentType: 'application/json',
            data: JSON.stringify({
            "problema": descripcion,
            "categoria": categoria,
            "asunto": asunto,
            "id_cliente": id_cliente,
            "fecha" : fecha.getTime(),
            "archivo": baseString,
            "tecnico":0,
            "estado":0
        }),
            dataType: "JSON",
            success: function () {

                window.alert("Solicitud ingresada con éxito");
                window.location.href = "solicitudescliente.html?cliente="+id_cliente;
            },
            error: function () {
                window.alert("Error al ingresar solicitud\nPor favor Intente nuevamente")
            }
        });
    }
    
};

function validation() {
    var asunto = document.getElementById("asunto").value;
    var categoria = document.getElementById("categoria").value;
    var descripcion = document.getElementById("descripcion").value;
    if (asunto === '' || categoria === '' || descripcion === '' || categoria === 'Seleccionar categoría') {
        alert("Debe rellenar todos los campos del formulario para poder enviar la solicitud.");
        return false;
    } else {
        return true;
    }
};

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