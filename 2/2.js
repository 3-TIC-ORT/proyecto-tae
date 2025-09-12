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

function volver() {
  window.location.href = "../1/index.html"
}

function mostrarBear() {
  body.style.backgroundColor = "#C7AE20";
  h1.textContent = "The Bear";
  parrafo.textContent =
    "El ultimo de su manada. Vendio su alma para olvidar su vida pasada.";
  imagen.src = "../Cosas/oso.png";
  imagen.alt = "foto bear";
  titulo.textContent = "";
  h1.style.fontFamily = "Sedgwick Ave Display, cursive";
  h1.style.fontWeight = "400";
  h1.style.fontStyle = "normal";
  h1.style.color = "#D52CB0"
  h1.style.fontSize = "10rem";
  h1.style.backgroundImage = "url('../Cosas/image 47.png')";
  vida.textContent = "80 PV";
  oro.textContent = "99";
  poder.textContent = "Escudo de Hierro";
  descpoder.textContent = "Cada vez que termina el combate se cura 6 de vida.";
  foto.src = "../Cosas/escudo.png"
  mago.style.filter = "none";
  jon.style.filter = "none";
  pick.style.filter = "none";
  bear.style.filter =
    "drop-shadow(0 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0 -0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem -0.03rem 0.2rem rgba(255, 253, 253, 0.5)) drop-shadow(0.03rem -0.03rem 0.2rem rgba(255, 250, 250, 0.5)) drop-shadow(-0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5))";
}

function mostrarMago() {
  body.style.backgroundColor = "purple";
  h1.textContent = "The Magician";
  parrafo.textContent =
    "El mago domina los secretos de la magia ancestral y controla hechizos poderosos.";
  imagen.src = "../Cosas/magician.png";
  imagen.alt = "foto mago";
  oro.textContent = "150";
  vida.textContent = "70";
  titulo.textContent = "";
  jon.style.filter = "none";
  bear.style.filter = "none";
  pick.style.filter = "none";
  mago.style.filter =
    "drop-shadow(0 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0 -0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem -0.03rem 0.2rem rgba(255, 253, 253, 0.5)) drop-shadow(0.03rem -0.03rem 0.2rem rgba(255, 250, 250, 0.5)) drop-shadow(-0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5))";
}

function mostrarPick() {
  body.style.backgroundColor = "grey";
  h1.textContent = "The Pick";
  parrafo.textContent =
    "Pick es un minero legendario que cava en las profundidades de las cuevas buscando tesoros.";
  imagen.src = "../Cosas/valkiria.png";
  imagen.alt = "foto valkiria";
  titulo.textContent = "";
  mago.style.filter = "none";
  jon.style.filter = "none";
  bear.style.filter = "none";
  pick.style.filter =
    "drop-shadow(0 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0 -0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem 0 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5)) drop-shadow(-0.03rem -0.03rem 0.2rem rgba(255, 253, 253, 0.5)) drop-shadow(0.03rem -0.03rem 0.2rem rgba(255, 250, 250, 0.5)) drop-shadow(-0.03rem 0.03rem 0.2rem rgba(255, 255, 255, 0.5))";
}

function mostrarJon() {
  body.style.backgroundColor = "gold";
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
}

mago.addEventListener("click", mostrarMago);
jon.addEventListener("click", mostrarJon);
bear.addEventListener("click", mostrarBear);
pick.addEventListener("click", mostrarPick);
atras.addEventListener("click", volver)