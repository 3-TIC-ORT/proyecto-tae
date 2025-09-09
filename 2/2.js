let mago = document.getElementById("magician");
let jon = document.getElementById("jon");
let bear = document.getElementById("bear");
let pick = document.getElementById("pick");
let body = document.body;
let parrafo = document.getElementById("p");
let h1 = document.getElementById("h1");
let imagen = document.getElementById("imagen-contenido");

function mostrarBear() {
  body.style.backgroundColor = "brown";
  h1.textContent = "The Bear";
  parrafo.textContent =
    "El oso es una criatura de las montañas de Córdoba que le encanta picar piedra y se alimenta a base de monstruos y elixires. Su hobby principal es programar.";
  imagen.src = "../Cosas/bear.png";
  imagen.alt = "foto bear";
}

function mostrarMago() {
  body.style.backgroundColor = "purple";
  h1.textContent = "The Magician";
  parrafo.textContent =
    "El mago domina los secretos de la magia ancestral y controla hechizos poderosos.";
  imagen.src = "../Cosas/magician.png";
  imagen.alt = "foto mago";
}

function mostrarPick() {
  body.style.backgroundColor = "grey";
  h1.textContent = "The Pick";
  parrafo.textContent =
    "Pick es un minero legendario que cava en las profundidades de las cuevas buscando tesoros.";
  imagen.src = "../Cosas/valkiria.png";
  imagen.alt = "foto valkiria";
}

function mostrarJon() {
  body.style.backgroundColor = "gold";
  h1.textContent = "Jon the Brave";
  parrafo.textContent =
    "Jon es un guerrero audaz que nunca teme enfrentarse a dragones y demonios.";
  imagen.src = "../Cosas/pngtree-mine-cave-entrance-with-railway-in-cartoon-style-isolated-on-white-background-picture-image_7836835.png";
  imagen.alt = "foto john";
}

mago.addEventListener("click", mostrarMago);
jon.addEventListener("click", mostrarJon);
bear.addEventListener("click", mostrarBear);
pick.addEventListener("click", mostrarPick);
