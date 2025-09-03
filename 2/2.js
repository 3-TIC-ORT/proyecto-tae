let mago = document.getElementById("magician");
let jon = document.getElementById("jon");
let bear = document.getElementById("bear");
let pick = document.getElementById("pick");

function mostrarBear(){
    alert("bear")
}
function mostrarMago(){
    alert("mago")
}

function mostrarPick(){
    alert("pick")
}

function mostrarJon(){
    alert("jon")
}

mago.addEventListener("click", mostrarMago);
jon.addEventListener("click", mostrarJon);
bear.addEventListener("click", mostrarBear);
pick.addEventListener("click", mostrarPick);

