window.addEventListener("DOMContentLoaded", () => {
  let oro = document.getElementById("oro");
  let vida = document.getElementById("vida");
  let vidaP = document.getElementById("vida-personaje");
  let vidaM = document.getElementById("vida-monstruo");
  let info = {};
  let mapa = document.getElementById("mapa");
  let boton = document.getElementById("buton");
  let botonSacar = document.getElementById("butonSacar");
  let abajo = document.getElementById("abajo");
  let titulo = document.getElementById("titulo");
  let reliquias = document.getElementById("reliquias");
  let cartas = document.getElementById("cartas");
  let circCartas = document.getElementById("circulo-cartas");
  let circReliquias = document.getElementById("circulo-reliquias");

  let contadorCartas = 1; // empieza en carta1

  connect2Server();

  let monstruo = {};
  getEvent(`mounstro?${"normal"}`, (data) => {
    monstruo = data;
    console.log(monstruo);
  });
  getEvent("fogata", (data) => {
    info = {
      oro: data.oro,
      vida: data.vida,
      vidamax: data.vidamax,
      mapa: data.mapa,
      reliquias: data.reliquias,
    };
    mostrar();
  });
  let reliquia = [];
  let cajaReliquias = document.getElementById("cajaReliquias");
  getEvent("reliquia", (data) => {
    reliquia = data;
    mostrarReliquia();
    console.log(reliquia);
    console.log(reliquia.length);
  });
  function mostrarReliquia() {
    for (let i = 0; i < reliquia.length; i++) {
      let nuevaReliquia = document.createElement("div");
      nuevaReliquia.classList.add("todas");
      nuevaReliquia.id = "reliquia" + i;
      nuevaReliquia.innerHTML = `
      <p>${reliquia[i].nombre}</p> `;
      cajaReliquias.appendChild(nuevaReliquia);
      circReliquias.textContent = reliquia.length;
    }
  }

  function mostrar() {
    vida.textContent = "PV: " + info.vida + "/" + info.vidamax;
    vidaP.textContent = "PV: " + info.vida + "/" + info.vidamax;
    vidaM.textContent = "PV: " + monstruo.vida + "/" + monstruo.vidamax;
    oro.textContent = "Oro: " + info.oro;
  }

  function irMapa() {
    window.location.href = "../mapa/index.html";
  }

  function volver() {
    window.location.href = "../2/index2.html";
  }

  titulo.addEventListener("click", volver);
  mapa.addEventListener("click", irMapa);

  function sumarCarta() {
    if (contadorCartas > 9) return;

    let carta = document.createElement("div");
    carta.classList.add(`carta${contadorCartas}`, "cartaG");
    carta.id = `C${contadorCartas}`;

    // Si es la carta 1, le ponemos el click para restar 10 de vida
    if (contadorCartas === 1) {
      carta.addEventListener("click", () => {
        menosVida(10);
        console.log("-10 de vida");
      });
    }

    abajo.appendChild(carta);
    contadorCartas++;
  }

  function sacarCarta() {
    if (contadorCartas <= 1) return;

    contadorCartas--;

    let cartaAEliminar = abajo.querySelector(`.carta${contadorCartas}`);
    if (cartaAEliminar) {
      cartaAEliminar.remove();
    }
  }

  function menosVida(cantidad) {
    info.vida -= cantidad;

    if (info.vida < 0) info.vida = 0;

    mostrar();

    // Si la vida llega a 0, vamos a Game Over
    if (info.vida <= 0) {
      window.location.href = "../Game_over/index.html";
    }
  }

  // Botones para sumar o sacar cartas manualmente
  boton.addEventListener("click", sumarCarta);
  botonSacar.addEventListener("click", sacarCarta);

  // --- Inicializamos el juego con 5 cartas ---
  for (let i = 0; i < 5; i++) {
    sumarCarta();
  }
  const imagenes = [
    "../Cosas/fondo1.png",
    "../Cosas/fondo2.jpg",
    "../Cosas/fondo3.jpg",
    "../Cosas/fondo4.jpg",
  ];

  function Fondos() {
    const random = Math.floor(Math.random() * imagenes.length);

    document.body.style.backgroundImage = `url(${imagenes[random]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition;
    document.body.style.backgroundRepeat = "no-repeat";
  }

  Fondos();

  let cajaCartas = document.getElementById("LugarCartas");
  let atras = document.getElementById("atras");
  let atras2 = document.getElementById("atras2");
  let cajaBatalla = document.getElementById("batalla");
  let lugarReliquias = document.getElementById("LugarReliquias");

  function mostrarCartas() {
    cajaCartas.style.display = "block";
    console.log("mostrar");
    cajaBatalla.style.display = "none";
    cajaCartas.style.backgroundColor = "black";
    lugarReliquias.style.display = "none";
    lugarReliquias.style.background = "none";
  }
  function mostrarReliquias() {
    lugarReliquias.style.display = "block";
    lugarReliquias.style.backgroundColor = "black";
    cajaBatalla.style.display = "none";
    cajaCartas.style.display = "none";
    cajaCartas.style.background = "none";
  }
  function volverBatalla() {
    cajaBatalla.style.display = "block";
    cajaCartas.style.display = "none";
    cajaCartas.style.background = "none";
    lugarReliquias.style.display = "none";
    lugarReliquias.style.backgroundColor = "none";
    window.scrollTo(0, 0);
  }

  cartas.addEventListener("click", mostrarCartas);
  atras.addEventListener("click", volverBatalla);
  atras2.addEventListener("click", volverBatalla);
  reliquias.addEventListener("click", mostrarReliquias);
});
