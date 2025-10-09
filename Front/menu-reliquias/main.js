let oro = document.getElementById("oro");
let vida = document.getElementById("vida");
let mapa = document.getElementById("mapa");
let reliquias = document.getElementById("reliquias");
let cartas = document.getElementById("cartas");
let titulo = document.getElementById("titulo");

let info = {};

connect2Server();

getEvent("fogata", (data) => {
  info = {
    oro: data.oro,
    vida: data.vida,
    vidamax: data.vidamax,
    mapa: data.mapa,
    reliquias: data.reliquias,
  };

  mostrarOro();
  mostrarVida();
});

function mostrarVida() {
  vida.textContent = "PV: " + info.vida + "/" + info.vidamax;
}

function mostrarOro() {
  oro.textContent = "Oro: " + info.oro;
}
function irMapa() {
  window.location.href = "../mapa/index.html";
}

function irReliquia() {
  window.location.href = "../menu-reliquias/reliquias.html";
}
function irCarta() {
  window.location.href = "../cartas/index.html";
}
function volver() {
  window.location.href = "../2/index2.html";
}
titulo.addEventListener("click", volver);
cartas.addEventListener("click", irCarta);
reliquias.addEventListener("click", irReliquia);
vida.addEventListener("click", mostrarVida);
mapa.addEventListener("click", irMapa);
