let cama = document.getElementById("cama");
let mina = document.getElementById("mina");
let act = document.getElementById("axion");
function hoverCama(){
    console.log("hola");
    act.textContent = "Cura un 30% de tu PV";
}
cama.addEventListener("click", hoverCama);