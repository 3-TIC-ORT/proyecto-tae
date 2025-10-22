window.addEventListener("DOMContentLoaded", () => {
  let oro = document.getElementById("oro");
  let vida = document.getElementById("vida");
  let vidaP = document.getElementById("vida-personaje");
  let cantidadEscudo = 0;
  let vidaM = document.getElementById("vida-monstruo");
  let mapa = document.getElementById("mapa");
  let boton = document.getElementById("boton");
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
  let lugarEscudo = document.getElementById("escudo");
  let cajaMana = document.getElementById("cajamana")
  let mana = 3;
  let cartasmano = [];
  let info = {};
  let monstruo = {};
  let reliquia = [];
  let mazo = [];
  let contadorCartas = 1;
  let turno = 1; // personaje = 1 monstruo = 2

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
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
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
    
  }


  function actualizarMana() {
    console.log(mana);
    mana = mana - cartaRobada.elixir;
    cajaMana.textContent = mana + "/3";
    console.log(mana);
  }

  function garrote(daño) {
    console.log(cartaRobada.elixir);
    if (cartaRobada.elixir <= mana) {
      monstruo.vida -= daño;
      if (monstruo.vida < 0) monstruo.vida = 0;
      vidaM.textContent = "PV" + monstruo.vida + "/" + monstruo.vidamax;
      actualizarMana();
      sacarCarta();
    }
    else {
      alert("no hay mana suficiente");
    }
  }
  function golpe(daño) {
    console.log(cartaRobada.elixir);
    if (mana >= cartaRobada.elixir) {
      monstruo.vida -= daño;
      if (monstruo.vida < 0) monstruo.vida = 0;
      vidaM.textContent = "PV" + monstruo.vida + "/" + monstruo.vidamax;
      actualizarMana();
      sacarCarta();
    }
    else {
      alert("no hay mana suficiente");
    }
  }
  function escudo() {
    if (mana >= cartaRobada.elixir) {
      cantidadEscudo = cantidadEscudo + 10;
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      actualizarMana();
      sacarCarta();
    }
    else {
      alert("no hay mana suficiente");
    }
  }
  abajo.appendChild(carta);

  contadorCartas++;
  function sacarCarta() {
    let cartaEliminar = event.target;
    console.log(cartaEliminar.classList[0]);
    if (cartaEliminar.classList[0] === "carta1") {
      let carta2 = document.getElementsByClassName("carta2");
      let carta3 = document.getElementsByClassName("carta3");
      let carta4 = document.getElementsByClassName("carta4");
      let carta5 = document.getElementsByClassName("carta5");
      let carta6 = document.getElementsByClassName("carta6");
      let carta7 = document.getElementsByClassName("carta7");
      let carta8 = document.getElementsByClassName("carta8");
      let carta9 = document.getElementsByClassName("carta9");
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
    if (cartaEliminar.classList[0] === "carta2") {
      let carta1 = document.getElementsByClassName("carta1");
      let carta3 = document.getElementsByClassName("carta3");
      let carta4 = document.getElementsByClassName("carta4");
      let carta5 = document.getElementsByClassName("carta5");
      let carta6 = document.getElementsByClassName("carta6");
      let carta7 = document.getElementsByClassName("carta7");
      let carta8 = document.getElementsByClassName("carta8");
      let carta9 = document.getElementsByClassName("carta9");
      Array.from(carta4).forEach(element => {
        element.classList.remove("carta4");
        element.classList.add("carta2");
      });
      Array.from(carta6).forEach(element => {
        element.classList.remove("carta4");
        element.classList.add("carta2");
      });
      Array.from(carta8).forEach(element => {
        element.classList.remove("carta8");
        element.classList.add("carta6");
      });
    }
    if (cartaEliminar.classList[0] === "carta3") {
      let carta1 = document.getElementsByClassName("carta1");
      let carta2 = document.getElementsByClassName("carta2");
      let carta4 = document.getElementsByClassName("carta4");
      let carta5 = document.getElementsByClassName("carta5");
      let carta6 = document.getElementsByClassName("carta6");
      let carta7 = document.getElementsByClassName("carta7");
      let carta8 = document.getElementsByClassName("carta8");
      let carta9 = document.getElementsByClassName("carta9");
      Array.from(carta5).forEach(element => {
        element.classList.remove("carta5");
        element.classList.add("carta3");
      });
      Array.from(carta7).forEach(element => {
        element.classList.remove("carta7");
        element.classList.add("carta5");
      });
      Array.from(carta9).forEach(element => {
        element.classList.remove("carta9");
        element.classList.add("carta7");
      });
    }
    if (cartaEliminar.classList[0] === "carta4") {
      let carta1 = document.getElementsByClassName("carta1");
      let carta2 = document.getElementsByClassName("carta2");
      let carta3 = document.getElementsByClassName("carta3");
      let carta5 = document.getElementsByClassName("carta5");
      let carta6 = document.getElementsByClassName("carta6");
      let carta7 = document.getElementsByClassName("carta7");
      let carta8 = document.getElementsByClassName("carta8");
      let carta9 = document.getElementsByClassName("carta9");
      Array.from(carta6).forEach(element => {
        element.classList.remove("carta6");
        element.classList.add("carta4");
      });
      Array.from(carta8).forEach(element => {
        element.classList.remove("carta8");
        element.classList.add("carta6");
      });
    }
    if (cartaEliminar.classList[0] === "carta5") {
      let carta1 = document.getElementsByClassName("carta1");
      let carta2 = document.getElementsByClassName("carta2");
      let carta3 = document.getElementsByClassName("carta3");
      let carta4 = document.getElementsByClassName("carta4");
      let carta6 = document.getElementsByClassName("carta6");
      let carta7 = document.getElementsByClassName("carta7");
      let carta8 = document.getElementsByClassName("carta8");
      let carta9 = document.getElementsByClassName("carta9");
      Array.from(carta7).forEach(element => {
        element.classList.remove("carta7");
        element.classList.add("carta5");
      });
      Array.from(carta6).forEach(element => {
        element.classList.remove("carta9");
        element.classList.add("carta7");
      });
    }
    if (cartaEliminar.classList[0] === "carta6") {
      let carta1 = document.getElementsByClassName("carta1");
      let carta2 = document.getElementsByClassName("carta2");
      let carta3 = document.getElementsByClassName("carta3");
      let carta4 = document.getElementsByClassName("carta4");
      let carta5 = document.getElementsByClassName("carta5");
      let carta7 = document.getElementsByClassName("carta7");
      let carta8 = document.getElementsByClassName("carta8");
      let carta9 = document.getElementsByClassName("carta9");
      Array.from(carta8).forEach(element => {
        element.classList.remove("carta8");
        element.classList.add("carta6");
      });
    }
    if (cartaEliminar.classList[0] === "carta7") {
      let carta1 = document.getElementsByClassName("carta1");
      let carta2 = document.getElementsByClassName("carta2");
      let carta3 = document.getElementsByClassName("carta3");
      let carta4 = document.getElementsByClassName("carta4");
      let carta5 = document.getElementsByClassName("carta5");
      let carta6 = document.getElementsByClassName("carta6");
      let carta8 = document.getElementsByClassName("carta8");
      let carta9 = document.getElementsByClassName("carta9");
      Array.from(carta9).forEach(element => {
        element.classList.remove("carta9");
        element.classList.add("carta7");
      });
    }

    cartaEliminar.remove();
  }


  if (turno === 1) {
    if (cartaRobada.nombre === "Golpe") {
      carta.classList.add("carta-golpe");
      carta.addEventListener("click", () => golpe(5));
    }
    if (cartaRobada.nombre === "Escudo") {
      carta.classList.add("carta-escudo");
      carta.addEventListener("click", () => escudo());
    }
    if (cartaRobada.nombre === "Garrote") {
      carta.classList.add("carta-garrote");
      carta.addEventListener("click", () => garrote(10));
    }
    console.log("deshabilitar")
    boton.disabled = false;
  } //turno

  function finalizarTurno() {
    turno = 2;
  }

  boton.addEventListener("click", finalizarTurno);

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
