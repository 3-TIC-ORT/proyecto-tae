let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let boton3 = document.getElementById("boton3");
function adelante(){
    window.location.href = "C:/Users/50416518/Desktop/proyecto-tae/2/index2.html";
}

function mostrarCreditos(){
    window.location.href = "C:/Users/50416518/Desktop/proyecto-tae/Creditos/creditos.html";
}


function cerrar(){
    window.close();
}

boton1.addEventListener("click", adelante);
boton2.addEventListener("click", mostrarCreditos);
boton3.addEventListener("click", cerrar);

