let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");

function adelante() {
    window.location.href = "../2/index2.html"; 
}

function mostrarCreditos() {
    window.location.href =  "../Creditos/creditos.html";  
}

boton1.addEventListener("click", adelante);
boton2.addEventListener("click", mostrarCreditos);