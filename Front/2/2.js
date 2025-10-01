let mago = document.getElementById("magician");
let jon = document.getElementById("jon");
let bear = document.getElementById("bear");
let pick = document.getElementById("pick");
let body = document.body;
let parrafo = document.getElementById("p");
let h1 = document.getElementById("h1");
let imagen = document.getElementById("imagen-contenido");
let vida = document.getElementById("vida");
let oro = document.getElementById("oro");
let titulo = document.getElementById("titulo");
let atras = document.getElementById("atras");
let poder = document.getElementById("poder");
let descpoder = document.getElementById("descpoder");
let foto = document.getElementById("simbolo");
let elige = document.getElementById("elige");
let conjunto = document.getElementById("conjunto");
let avanzar = document.getElementById("avanzar");
let siMago = false;
let siBear = false;
let siPick = false;
let siJon = false;

function volver() {
  window.location.href = "../1/index.html";
}

function mostrarMago() {
  avanzar.style.opacity = "100";
  body.style.backgroundColor = "black";
  imagen.alt = "foto mago";
  titulo.textContent = "";
  conjunto.style.marginTop = "1rem";
  elige.style.color = "white";
  oro.textContent = "150";
  oro.style.color = "white";
  poder.style.color = "white";
  descpoder.style.color = "white";
  imagen.src = "../Cosas/mago.png";
  imagen.style.marginTop = "3rem";
  imagen.style.height = "90vh";
  vida.textContent = "70 PV";
  poder.textContent = "Báculo del Archimago";
  h1.style.fontFamily = "Galdeano, sans-serif";
  h1.textContent = "The Magician";
  h1.style.color = "white";
  h1.style.fontSize = "7.5rem";
  h1.style.backgroundImage = "url()";
  descpoder.textContent = "Incrementa tu maná maximo en 1";
  foto.src = "../Cosas/bara.svg";
  parrafo.textContent =
    "Nunca tuvo muchos amigos, pero siempre encontraba un refugio.";
  pick.style.filter = "none";
  jon.style.filter = "none";
  bear.style.filter = "none";
  mago.style.filter =
    "drop-shadow(0 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0 -0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem -0.03rem 0.2rem rgba(255, 253, 253, 0.5)) drop-shadow(0.03rem -0.03rem 0.2rem rgba(255, 250, 250, 0.5)) drop-shadow(-0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5))";
  siMago = true;
  siBear = false;
  siJon = false;
  siPick = false;
}
function mostrarBear() {
  avanzar.style.opacity = "100";
  body.style.backgroundColor = "#C7AE20";
  imagen.style.height = "90vh";
  conjunto.style.marginTop = "1rem";
  parrafo.textContent =
    "El ultimo de su manada. Vendio su alma para olvidar su vida pasada.";
  imagen.src = "../Cosas/bear.png";
  imagen.alt = "foto bear";
  imagen.style.marginTop = "2rem";
  titulo.textContent = "";
  h1.textContent = "The Bear";
  h1.style.fontFamily = "Sedgwick Ave Display, cursive";
  h1.style.fontWeight = "400";
  h1.style.fontStyle = "normal";
  h1.style.color = "#D52CB0";
  h1.style.fontSize = "9rem";
  vida.textContent = "80 PV";
  oro.textContent = "99";
  poder.textContent = "Escudo de Hierro";
  descpoder.textContent = "Cada vez que termina el combate se cura 6 de vida.";
  foto.src = "../Cosas/escudo.png";
  mago.style.filter = "none";
  jon.style.filter = "none";
  pick.style.filter = "none";
  poder.style.color = "blueviolet";
  oro.style.color = "white";
  elige.style.color = "black";
  bear.style.filter =
    "drop-shadow(0 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0 -0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem -0.03rem 0.2rem rgba(255, 253, 253, 0.5)) drop-shadow(0.03rem -0.03rem 0.2rem rgba(255, 250, 250, 0.5)) drop-shadow(-0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5))";
  siMago = false;
  siBear = true;
  siJon = false;
  siPick = false;
}

function mostrarPick() {
  avanzar.style.opacity = "100";
  body.style.backgroundColor = "#000A57";
  imagen.alt = "foto pick";
  titulo.textContent = "";
  imagen.style.height = "90vh";
  conjunto.style.marginTop = "1rem";
  elige.style.color = "white";
  oro.textContent = "50";
  oro.style.color = "white";
  poder.style.color = "gold";
  descpoder.style.color = "white";
  imagen.src = "../Cosas/pick.png";
  imagen.style.marginTop = "3rem";
  vida.textContent = "75 PV";
  poder.textContent = "Trébol de oro";
  h1.style.fontFamily = "EB Garamond, serif";
  h1.textContent = "The Pickpocket";
  h1.style.color = "white";
  h1.style.fontSize = "6rem";
  h1.style.backgroundImage = "url()";
  descpoder.textContent =
    "Cada vez que termina un combate consigues dos veces más oro. También cada 5 ataques consigues 10 de oro";
  foto.src = "../Cosas/trebol.png";
  parrafo.textContent = "Empezo desde chico. Ahora maneja todo un imperio.";
  mago.style.filter = "none";
  jon.style.filter = "none";
  bear.style.filter = "none";
  pick.style.filter =
    "drop-shadow(0 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0 -0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem -0.03rem 0.2rem rgba(255, 253, 253, 0.5)) drop-shadow(0.03rem -0.03rem 0.2rem rgba(255, 250, 250, 0.5)) drop-shadow(-0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5))";
  siMago = false;
  siBear = false;
  siJon = false;
  siPick = true;
}

function mostrarJon() {
  avanzar.style.opacity = "100";
  body.style.backgroundColor = "gold";
  imagen.style.height = "90vh";
  h1.textContent = "Jon the Brave";
  parrafo.textContent =
    "Jon es un guerrero audaz que nunca teme enfrentarse a dragones y demonios.";
  imagen.src =
    "../Cosas/pngtree-mine-cave-entrance-with-railway-in-cartoon-style-isolated-on-white-background-picture-image_7836835.png";
  imagen.alt = "foto john";
  titulo.textContent = "";
  mago.style.filter = "none";
  bear.style.filter = "none";
  pick.style.filter = "none";
  jon.style.filter =
    "drop-shadow(0 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0 -0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem -0.03rem 0.2rem rgba(255, 253, 253, 0.5)) drop-shadow(0.03rem -0.03rem 0.2rem rgba(255, 250, 250, 0.5)) drop-shadow(-0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5))";
  siMago = false;
  siBear = false;
  siJon = true;
  siPick = false;
}

function avanzarMago() {
  window.location.href = "../mapaBear/index.html";
}
function avanzarBear() {
  window.location.href = "../mapaBear/index.html";
}
function avanzarPick() {
  window.location.href = "../mapaBear/index.html";
}
function avanzarJon() {
  window.location.href = "../mapaBear/index.html";
}

mago.addEventListener("click", mostrarMago);
jon.addEventListener("click", mostrarJon);
bear.addEventListener("click", mostrarBear);
pick.addEventListener("click", mostrarPick);
atras.addEventListener("click", volver);
let personaje = "";
avanzar.addEventListener("click", () => {
  if (siMago) {
    personaje = "mago";
    avanzarMago();
  } else if (siBear) {
    personaje = "bear";
    avanzarBear();
  } else if (siPick) {
    personaje = "pick";
    avanzarPick();
  } else if (siJon) {
    personaje = "jon";
    avanzarJon();
  }
  postEvent("personaje", personaje);
});
connect2Server();
