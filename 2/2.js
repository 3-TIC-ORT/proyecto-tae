let mago = document.getElementById("magician");
let valk = document.getElementById("valkiria");
let oro = document.getElementById("li1");
let vida = document.getElementById("li2");

function statsmago(){
    oro.textContent = "Oro: 150";
    vida.textContent = "Vida: 70";
    console.log("mago");
}
function statsvalk(){
    oro.textContent = "Oro: 125";
    vida.textContent = "Vida: 25";
    console.log("valk");
}
function ocultar(){
    oro.textContent = "";
    vida.textContent = "";
}

valk.addEventListener("mouseover", statsvalk);
mago.addEventListener("mouseover", statsmago);
valk.addEventListener("mouseleave", ocultar);
mago.addEventListener("mouseleave", ocultar);