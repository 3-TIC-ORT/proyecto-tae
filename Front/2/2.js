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
let conjunto = document.getElementById("derecha");
let avanzar = document.getElementById("avanzar");
let siMago = false;
let siBear = false;
let siPick = false;
let siJon = false;

function volver() {
  window.location.href = "../1/index.html";
}

function mostrarMago() {
  avanzar.style.opacity = "1";
  body.style.backgroundColor = "black";
  imagen.alt = "foto mago";
  titulo.textContent = "";
  conjunto.style.marginTop = "1rem";
  elige.style.color = "white";
  oro.textContent = "150";
  oro.style.color = "white";
  poder.style.color = "white";
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
  avanzar.style.opacity = "1";
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
  avanzar.style.opacity = "1";
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
  avanzar.style.opacity = "1";
  conjunto.style.marginTop = "1rem";
  body.style.backgroundColor = "#81171B";
  imagen.style.height = "90vh";
  h1.textContent = "The Lawyer";
    h1.style.fontFamily = "Galdeano, sans-serif";
    h1.style.color = "white";
    h1.style.fontSize = "15vh";
    oro.textContent = "Oro: 150";
    oro.style.color = "white";
    vida.textContent = "70 PV"
    poder.textContent = "Lanza de Odin";
    poder.style.color = "white";
    descpoder.textContent = "Tus ataques tienen un 20% de probabilidad de causar daño adicional de “Sangrado” que hace 3 puntos de daño por turno durante 2 turnos.";
  parrafo.textContent =
    "Queria arreglar el mundo de la buena forma, pero se dio cuenta que armar un vaso roto es imposible.";
  imagen.src =
    "../Cosas/lawyer.png";
  imagen.alt = "foto jon";
  imagen.style.height = "100vh";
  imagen.style.marginTop = "0";
  foto.src = "../Cosas/lanza.png";
  elige.style.color = "white";
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

function avanzarMapa() {
  window.location.href = "../mapa/index.html";
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
    avanzarMapa();
  } else if (siBear) {
    personaje = "bear";
    avanzarMapa();
  } else if (siPick) {
    personaje = "pick";
    avanzarMapa();
  } else if (siJon) {
    personaje = "jon";
    avanzarMapa();
  }
  postEvent("personaje", personaje);
  postEvent("modificar-mazo", { accion: "agregar", carta: "golpe" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "golpe" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "golpe" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "golpe" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "golpe" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "escudo" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "escudo" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "escudo" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "escudo" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "escudo" });
  postEvent("modificar-mazo", { accion: "agregar", carta: "Garrote" });
});
window.addEventListener("DOMContentLoaded",() => {
    console.log("✅ Conectado a Soquetic correctamente.");
    setTimeout(() => {
      postEvent("reinicio-reliquias",true)
      postEvent("vaciar-reliquias", true);
      postEvent("vaciar-mazo", true);
      console.log("🧹 Pedidos de vaciar enviados al servidor");
    }, 500);
});
connect2Server();
