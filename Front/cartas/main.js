let oro = document.getElementById("oro");
let vida = document.getElementById("vida");
let mapa = document.getElementById("mapa");
let info = {};
let atras = document.getElementById("atras");
let titulo = document.getElementById("titulo");


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

let reliquias = document.getElementById("reliquias");
let cartas = document.getElementById("cartas");

function irReliquia() {
  window.location.href = "../menureliquias/reliquias.html";
}
function irCarta() {
  window.location.href = "../cartas/index.html";
}
cartas.addEventListener("click", irCarta);
reliquias.addEventListener("click", irReliquia);

function irMapa() {
    window.location.href = "../mapa/index.html";
}

function volver() {
    window.location.href = "../2/index2.html";
}
titulo.addEventListener("click", volver)
mapa.addEventListener("click", irMapa);
atras.addEventListener("click", volver);