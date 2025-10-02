let cama = document.getElementById("cama");
let mina = document.getElementById("mina");
let act = document.getElementById("axion");
function hoverCama(){
    console.log("hola");
    act.textContent = "Cura un 30% de tu PV";
}
function hoverMina(){
    act.textContent = "Minar";
}
function nada(){
    act.textContent = "";
}
cama.addEventListener("mouseover", hoverCama);
mina.addEventListener("mouseover", hoverMina);
cama.addEventListener("mouseleave", nada);
mina.addEventListener("mouseleave", nada);

let mapa = document.getElementById("mapa");
function irMapa(){
    window.location.href = "../mapa/index.html";
}
mapa.addEventListener("click", irMapa);