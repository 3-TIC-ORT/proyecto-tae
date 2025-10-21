window.addEventListener("DOMContentLoaded", () => {
  let oro = document.getElementById("oro");
  let vida = document.getElementById("vida");
  let vidaP = document.getElementById("vida-personaje");
  let vidaM = document.getElementById("vida-monstruo");
  let mapa = document.getElementById("mapa");
  let boton = document.getElementById("buton");
  let botonSacar = document.getElementById("butonSacar");
  let abajo = document.getElementById("abajo");
  let titulo = document.getElementById("titulo");
  let reliquias = document.getElementById("reliquias");
  let cartas = document.getElementById("cartas");
  let circCartas = document.getElementById("circulo-cartas");
  let circReliquias = document.getElementById("circulo-reliquias");
  let cajaReliquias = document.getElementById("cajaReliquias");
  let cajaCartas = document.getElementById("cajaCartas");
  let LugarCartas = document.getElementById("LugarCartas");
  let atras = document.getElementById("atras");
  let atras2 = document.getElementById("atras2");
  let cajaBatalla = document.getElementById("batalla");
  let lugarReliquias = document.getElementById("LugarReliquias");
  let cartasmano = [];

  let info = {};
  let monstruo = {};
  let reliquia = [];
  let mazo = [];
  let contadorCartas = 1;

  connect2Server();

  getEvent(`mounstro?normal`, (data) => {
    monstruo = data;
    console.log("Monstruo recibido:", monstruo);
    mostrar();
  });

  getEvent("fogata", (data) => {
    info = {
      oro: data.oro,
      vida: data.vida,
      vidamax: data.vidamax,
      mapa: data.mapa,
    };
    console.log("Info fogata:", info);
    mostrar();
  });

  getEvent("reliquia", (data) => {
    reliquia = data;
    console.log("Reliquias recibidas:", reliquia);
    mostrarReliquia();
  });

  getEvent("mazo", (data) => {
    mazo = data;
    console.log("Mazo recibido:", mazo);
    mostrarMazo();
    iniciarCartas();
  });

  function mostrarReliquia() {
    if (!cajaReliquias) return console.warn("No se encontró cajaReliquias");
    cajaReliquias.innerHTML = "";
    for (let i = 0; i < reliquia.length; i++) {
      let nuevaReliquia = document.createElement("div");
      nuevaReliquia.classList.add("todas");
      nuevaReliquia.id = "reliquia" + i;
      nuevaReliquia.innerHTML = `<p>${reliquia[i].nombre}</p>`;
      cajaReliquias.appendChild(nuevaReliquia);
    }
    circReliquias.textContent = reliquia.length;
  }

  function mostrarMazo() {
    cajaCartas.innerHTML = "";
    for (let i = 0; i < mazo.length; i++) {
      let nuevaCarta = document.createElement("div");
      nuevaCarta.classList.add("cartaGC");
      nuevaCarta.id = "carta" + i;
      nuevaCarta.innerHTML = `<p>${mazo[i].nombre}</p>`;
      cajaCartas.appendChild(nuevaCarta);
    }
    circCartas.textContent = mazo.length;
  }

  function mostrar() {
    vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    oro.textContent = `Oro: ${info.oro}`;
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
    if (mazo.length === 0) return console.warn("No hay más cartas en el mazo");

    // elegir un índice aleatorio del mazo
    let indiceAleatorio = Math.floor(Math.random() * mazo.length);

    // sacar esa carta del mazo
    let cartaRobada = mazo.splice(indiceAleatorio, 1)[0];

    // agregarla a la mano
    cartasmano.push(cartaRobada);

    let carta = document.createElement("div");
    carta.classList.add(`carta${contadorCartas}`, "cartaG");
    carta.id = `C${contadorCartas}`;
    carta.innerHTML = `<p>${cartaRobada.nombre}</p>`;

    function garrote(daño) {
      monstruo.vida -= daño;
      if (monstruo.vida < 0) monstruo.vida = 0;
      vidaM.textContent = "PV" + monstruo.vida + "/" + monstruo.vidamax;
      sacarCarta();
    }

    if (cartaRobada.nombre === "Golpe") {
      carta.classList.add("carta-golpe");
    }
    if (cartaRobada.nombre === "Escudo") {
      carta.classList.add("carta-escudo");
    }
    if (cartaRobada.nombre === "Garrote") {
      carta.classList.add("carta-garrote");
      carta.addEventListener("click", () => garrote(10));
    }

    abajo.appendChild(carta);

    contadorCartas++;
  }

  function sacarCarta() {
    let cartaEliminar = event.target;
    console.log(cartaEliminar.classList[0]);
    if (cartaEliminar.classList[0] === "carta1") {
      const carta2 = document.getElementsByClassName("carta2");
      const carta3 = document.getElementsByClassName("carta3");
      const carta4 = document.getElementsByClassName("carta4");
      const carta5 = document.getElementsByClassName("carta5");
      const carta6 = document.getElementsByClassName("carta6");
      const carta7 = document.getElementsByClassName("carta7");
      const carta8 = document.getElementsByClassName("carta8");
      const carta9 = document.getElementsByClassName("carta9");
      Array.from(carta2).forEach(element => {
        element.classList.remove("carta2");
        element.classList.add("carta1");
      });
      Array.from(carta4).forEach(element => {
        element.classList.remove("carta4");
        element.classList.add("carta2");
      });
      Array.from(carta6).forEach(element => {
        element.classList.remove("carta6");
        element.classList.add("carta4");
      });
      Array.from(carta8).forEach(element => {
        element.classList.remove("carta8");
        element.classList.add("carta6");
      });
    
      /*carta2.classList.remove("carta2");
      carta2.classlist.add("carta1");
      carta4.classlist.remove("carta4");
      carta4.classList.add("carta2");
      carta6.classList.remove("carta6");
      carta6.classList.add("carta4");
      carta8.classList.remove("carta8");
      carta8.classList.add("carta6");*/
    }
    /*if (cartaEliminar.classList[0] === "carta2")
      if (cartaEliminar.classList[0] === "carta3")
        if (cartaEliminar.classList[0] === "carta4")
          if (cartaEliminar.classList[0] === "carta5")
            if (cartaEliminar.classList[0] === "carta6")
              if (cartaEliminar.classList[0] === "carta7")
                if (cartaEliminar.classList[0] === "carta8")
                  if (cartaEliminar.classList[0] === "carta9")*/
                    cartaEliminar.remove();
  }

  function iniciarCartas() {
    abajo.innerHTML = "";
    contadorCartas = 1;
    for (let i = 0; i < 5; i++) {
      sumarCarta();
    }
  }

  let imagenes = [
    "../Cosas/fondo1.png",
    "../Cosas/fondo2.jpg",
    "../Cosas/fondo3.jpg",
    "../Cosas/fondo4.jpg",
  ];

  function Fondos() {
    const random = Math.floor(Math.random() * imagenes.length);
    document.body.style.backgroundImage = `url(${imagenes[random]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }
  Fondos();

  function mostrarCartas() {
    console.log("mostrarCartas triggered");
    LugarCartas.style.display = "block";
    LugarCartas.style.backgroundColor = "black";
    cajaBatalla.style.display = "none";
    lugarReliquias.style.display = "none";
    lugarReliquias.style.background = "none";
  }

  function mostrarReliquias() {
    lugarReliquias.style.display = "block";
    lugarReliquias.style.backgroundColor = "black";
    cajaBatalla.style.display = "none";
    LugarCartas.style.display = "none";
    LugarCartas.style.background = "none";
  }

  function volverBatalla() {
    cajaBatalla.style.display = "block";
    LugarCartas.style.display = "none";
    LugarCartas.style.background = "none";
    lugarReliquias.style.display = "none";
    lugarReliquias.style.backgroundColor = "none";
    window.scrollTo(0, 0);
  }

  cartas.addEventListener("click", mostrarCartas);
  atras.addEventListener("click", volverBatalla);
  atras2.addEventListener("click", volverBatalla);
  reliquias.addEventListener("click", mostrarReliquias);

  /* 
  let cartasmano = []
  //cada turno haces esto 5 veces
  cartasmano.push(mazo.pop)
  //final de turno
  mazo = mazo.concate(cartasmano)
  //robar una carta
  cartasmano.push(mazo.pop)*/
});
