let mago = document.getElementById("magician");
let jon = document.getElementById("jon");
let bear = document.getElementById("bear");
let pick = document.getElementById("pick");
let body = document.body;
let parrafo = document.getElementById("p")
let h2 = document.getElementById("h2")




function mostrarBear(){
    body.style.backgroundColor = "brown"
    parrafo.textContent = "Hola mundo";
    h2.textContent = "Hola mundo";
}
function mostrarMago(){
    body.style.backgroundColor = "purple"
}


function mostrarPick(){
    body.style.backgroundColor = "grey"
}


function mostrarJon(){
    body.style.backgroundColor = "gold"
}


mago.addEventListener("click", mostrarMago);
jon.addEventListener("click", mostrarJon);
bear.addEventListener("click", mostrarBear);
pick.addEventListener("click", mostrarPick);




