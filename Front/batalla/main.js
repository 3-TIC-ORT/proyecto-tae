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
  let cajaMana = document.getElementById("cajamana");
  let mana = 3;
  let manaMax = 3;
  let cartaRobada = {};
  let carta = {};
  let cartasmano = [];
  let info = {};
  let monstruo = {};
  let reliquia = [];
  let mazo = [];
  let mazorobar = [];
  let contadorCartas = 1;
  let siEscudo = false;
  let turno = 1; // personaje = impar monstruo = par
  let batallaFinalizada = false;
  let ganancia = 0;
  let gananciaInicial = 0;
  let reliquiaInicial = {};

  connect2Server();

  const tipoMonstruo = sessionStorage.getItem("tipoMonstruo") || "normal";
  sessionStorage.removeItem("tipoMonstruo");

  getEvent(`mounstro?tipo=${tipoMonstruo}`, (data) => {
    monstruo = data;
    console.log(`Monstruo ${tipoMonstruo} recibido:`, monstruo);
    mostrar();
    console.log(monstruo.vida);
    gananciaInicial = monstruo.recompenzas;
    ganancia = gananciaInicial;
    console.log("Recompenza:", ganancia);
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
    reliquiaInicial = reliquia[0].nombre;
    console.log(reliquiaInicial);
    usoReliquia();
  });

  getEvent("mazo", (data) => {
    mazo = data;
    console.log("Mazo recibido:", mazo);
    mostrarMazo();
    iniciarCartas();
  });

  console.log("numero turno: " + turno);
  function ganar() {
    if (batallaFinalizada) return;
    batallaFinalizada = true;
    alert("ganaste");
    info.oro += ganancia;
    alert(`¡Has ganado ${ganancia} de oro!`);
    mostrar();
    postEvent("fogata", {
      oro: info.oro,
      vida: info.vida,
    });
    setTimeout(() => {
      window.location.href = "../mapa/index.html";
    }, 2000);
  }

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

  function usoReliquia() {
    if (reliquiaInicial === "Escudo de Hierro") {
      console.log("Reliquia activa:" + reliquiaInicial);
      // Solo curar si no estamos al máximo de vida
      if (info.vida < info.vidamax) {
        info.vida = Math.min(info.vida + 6, info.vidamax); // No exceder la vida máxima
        alert("¡El Escudo de Hierro te cura 6 de vida!");
        mostrar(); // Actualizar la interfaz
      }
    } else if (reliquiaInicial === "Trébol de Oro") {
      console.log("Reliquia activa:" + reliquiaInicial);

      if (ganancia < gananciaInicial * 2) {
        ganancia = ganancia * 2;
      } else return;
      console.log(ganancia);
    } else if (reliquiaInicial === "Báculo del Archimago") {
      console.log("Reliquia activa:" + reliquiaInicial);
      manaMax = 4;
      mana = 4;
      console.log(mana);
      console.log(manaMax);
    } else if (reliquiaInicial === "Lanza de Odin") {
    }
  }

  function turnoRival() {
    const daño = 20;
    alert(`El monstruo ataca por ${daño} de daño!`);

    if (siEscudo && cantidadEscudo > 0) {
      // Si hay escudo, el daño lo recibe primero el ecudo
      if (cantidadEscudo >= daño) {
        // El escudo absorbe todo el daño
        cantidadEscudo -= daño;
        alert(`Tu escudo absorbe ${daño} de daño!`);
      } else {
        // El escudo se rompe y el resto va a la vida
        let dañoRestante = daño - cantidadEscudo;
        alert(
          `Tu escudo absorbe ${cantidadEscudo} de daño y se rompe! ${dañoRestante} de daño pasa a tu vida!`
        );
        info.vida -= dañoRestante;
        cantidadEscudo = 0;
        siEscudo = false;
      }
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    } else {
      // Sin escudo, el daño va directo a la vida
      info.vida -= daño;
      alert(`Recibes ${daño} de daño directo!`);
      vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
    }

    // Actualizar vida y mostrar
    if (info.vida < 0) info.vida = 0;
    mostrar();

    // Si la vida llega a 0, game over (podrías añadir una función perder() aquí)
    if (info.vida <= 0) {
      alert("Has sido derrotado!");
      window.location.href = "../Game_over/index.html";
      return;
    }
    iniciarTurnoJugador();
  }
  function iniciarTurnoJugador() {
    turno = turno + 1;
    abajo.style.display = "flex";
    usoReliquia();
    iniciarCartas();
  }

  function finalizarTurno() {
    console.log("finalizar turno");
    abajo.style.display = "none";
    alert("TURNO RIVAL");
    turno = turno + 1;
    console.log(turno);
    mazo = mazo.concat(mazorobar);
    setTimeout(() => {
      turnoRival();
    }, 2000);
  }
  function sumarCarta() {
    if (contadorCartas > 9) return;
    if (mazo.length === 0) return console.warn("No hay más cartas en el mazo");

    // elegir un índice aleatorio del mazo
    let indiceAleatorio = Math.floor(Math.random() * mazo.length);

    // sacar esa carta del mazo
    cartaRobada = mazo.splice(indiceAleatorio, 1)[0];
    mazorobar.push(cartaRobada);
    // agregarla a la mano
    cartasmano.push(cartaRobada);

    carta = document.createElement("div");
    carta.classList.add(`carta${contadorCartas}`, "cartaG");
    carta.id = `C${contadorCartas}`;
    carta.innerHTML = `<p>${cartaRobada.nombre}</p>`;
    abajo.appendChild(carta);

    contadorCartas++;
    if (cartaRobada.nombre === "Golpe") {
      carta.classList.add("carta-golpe");
    }
    if (cartaRobada.nombre === "Escudo") {
      carta.classList.add("carta-escudo");
    }
    if (cartaRobada.nombre === "Garrote") {
      carta.classList.add("carta-garrote");
    }
    /*if (cartaRobada.nombre === "Espada pesada") {
      carta.classList.add("carta-espadaPesada");
    }
    if (cartaRobada.nombre === "Ira") {
      carta.classList.add("carta-ira");
    }
    if (cartarobada.nombre === "Ráfaga") {
      carta.classlist.add("carta-rafaga");
    }
    if (cartarobada.nombre === "Festín") {
      carta.classlist.add("carta-festin");
    }
    if (cartarobada.nombre === "Ataque rápido") {
      carta.classlist.add("carta-ataqueRapido");
    }
    if (cartarobada.nombre === "Chapiadora.com") {
      carta.classlist.add("carta-chapiadora");
    }
    if (cartarobada.nombre === "Promo 2027") {
      carta.classlist.add("carta-promo");
    }
    if (cartarobada.nombre === "Choque") {
      carta.classlist.add("carta-choque");
    }
    if (cartarobada.nombre === "Zip") {
      carta.classlist.add("carta-zip");
    }
    if (cartarobada.nombre === "Uppercut") {
      carta.classlist.add("carta-uppercut");
    }
    if (cartarobada.nombre === "Trinchera") {
      carta.classlist.add("carta-trinchera");
    }
    if (cartarobada.nombre === "Protector") {
      carta.classlist.add("carta-protector");
    }
    if (cartarobada.nombre === "Heroico") {
      carta.classlist.add("carta-heroico");
    }
    if (cartarobada.nombre === "Verdadero Valor") {
      carta.classlist.add("carta-verdaderoValor");
    }
    if (cartarobada.nombre === "Segundo Aliento") {
      carta.classlist.add("carta-segundoAliento");
    }
    if (cartarobada.nombre === "Defensa en Placas") {
      carta.classlist.add("carta-defensaEnPlacas");
    }
    if (cartarobada.nombre === "Estrategia Defensiva") {
      carta.classlist.add("carta-estrategiaDefensiva");
    }
    if (cartarobada.nombre === "Copa") {
      carta.classlist.add("carta-copa");
    }
    if (cartarobada.nombre === "Auto-escudo") {
      carta.classlist.add("carta-autoEscudo");
    }
    if (cartarobada.nombre === "Mutación") {
      carta.classlist.add("carta-mutacion");
    }
    if (cartarobada.nombre === "Espadas orbitantes") {
      carta.classlist.add("carta-espadasOrbitantes");
    }
    if (cartarobada.nombre === "Flexionar") {
      carta.classList.add("carta-");
    }
    if (cartarobada.nombre === "") {
      carta.classList.add("carta-flexionar");
    }
    if (cartarobada.nombre === "Ritual") {
      carta.classList.add("carta-ritual");
    }
    if (cartarobada.nombre === "Doble ataque") {
      carta.classList.add("carta-dobleAtaque");
    }
    if (cartarobada.nombre === "Furia") {
      carta.classList.add("carta-furia");
    }
    if (cartarobada.nombre === "Columna Suertuda") {
      carta.classList.add("carta-columnaSuertuda");
    }
    if (cartarobada.nombre === "Ataque ancestral") {
      carta.classList.add("carta-ataqueAncestral");
    }
    if (cartarobada.nombre === "Debilidad") {
      carta.classList.add("carta-debilidad");
    }
    if (cartarobada.nombre === "Barricada") {
      carta.classList.add("carta-barricada");
    }
    if (cartarobada.nombre === "Golpe de cuerpo") {
      carta.classList.add("carta-golpeDeCuerpo");
    }
    if (cartarobada.nombre === "Ignorar") {
      carta.classList.add("carta-ignorar");
    }
    if (cartarobada.nombre === "Lamento penetrante") {
      carta.classList.add("carta-lamentoPenetrante");
    }*/
  }
  abajo.addEventListener("click", (event) => {
    let cartaDiv = event.target.closest(".cartaG");
    if (!cartaDiv) return;

    if (turno % 2 === 0) {
      alert("No es tu turno");
      return;
    }

    let nombreCarta = cartaDiv.textContent.trim();
    let cartaActual = cartasmano.find((c) => c.nombre === nombreCarta);

    if (!cartaActual) {
      console.warn("Carta no encontrada en la mano:", nombreCarta);
      return;
    }

    if (mana < cartaActual.elixir) {
      alert("No tienes suficiente mana");
      return;
    }

    if (nombreCarta === "Golpe") {
      golpe(cartaActual);
    } else if (nombreCarta === "Escudo") {
      escudo(cartaActual);
    } else if (nombreCarta === "Garrote") {
      garrote(cartaActual);
    }

    cartasmano = cartasmano.filter((c) => c !== cartaActual);
    sacarCarta();
  });
  function iniciarCartas() {
    abajo.innerHTML = "";
    contadorCartas = 1;
    mana = manaMax;
    cajaMana.textContent = `${mana} / ${manaMax}`;
    for (let i = 0; i < 5; i++) {
      sumarCarta();
    }
  }

  function golpe(carta) {
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= carta.elixir;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push(carta);
    // Comprobar si se derrotó al monstruo
    if (monstruo.vida <= 0) {
      console.log("Monstruo derrotado por Golpe");
      ganar();
    }
  }

  function escudo(carta) {
    siEscudo = true;
    cantidadEscudo += 10;
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    mana -= carta.elixir;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push(carta);
  }

  function garrote(carta) {
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= carta.elixir;
    cajaMana.textContent = mana + " / " + manaMax;
    // mazo.push(carta);
    // Comprobar si se derrotó al monstruo
    if (monstruo.vida <= 0) {
      console.log("Monstruo derrotado por Garrote");
      ganar();
    }
  }

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
      Array.from(carta2).forEach((element) => {
        element.classList.remove("carta2");
        element.classList.add("carta1");
      });
      Array.from(carta4).forEach((element) => {
        element.classList.remove("carta4");
        element.classList.add("carta2");
      });
      Array.from(carta6).forEach((element) => {
        element.classList.remove("carta6");
        element.classList.add("carta4");
      });
      Array.from(carta8).forEach((element) => {
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
      Array.from(carta4).forEach((element) => {
        element.classList.remove("carta4");
        element.classList.add("carta2");
      });
      Array.from(carta6).forEach((element) => {
        element.classList.remove("carta6");
        element.classList.add("carta4");
      });
      Array.from(carta8).forEach((element) => {
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
      Array.from(carta5).forEach((element) => {
        element.classList.remove("carta5");
        element.classList.add("carta3");
      });
      Array.from(carta7).forEach((element) => {
        element.classList.remove("carta7");
        element.classList.add("carta5");
      });
      Array.from(carta9).forEach((element) => {
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
      Array.from(carta6).forEach((element) => {
        element.classList.remove("carta6");
        element.classList.add("carta4");
      });
      Array.from(carta8).forEach((element) => {
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
      Array.from(carta7).forEach((element) => {
        element.classList.remove("carta7");
        element.classList.add("carta5");
      });
      Array.from(carta6).forEach((element) => {
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
      Array.from(carta8).forEach((element) => {
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
      Array.from(carta9).forEach((element) => {
        element.classList.remove("carta9");
        element.classList.add("carta7");
      });
    }

    cartaEliminar.remove();
  }
  console.log(boton);

  boton.addEventListener("click", finalizarTurno);

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
});
/* joaco o ivo aca hice las funciones para las cartas de ataque (no se si andan)
function cartaGolpe() {
  monstruo.vida -= 7;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Golpe");
}

function cartaEspadaPesada() {
  monstruo.vida -= 15;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Espada pesada");
}

function cartaIra() {
  monstruo.vida -= 8;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 0;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Ira");
}

function cartaRafaga() {
  monstruo.vida -= 5;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Ráfaga");
}

function cartaFestin() {
  monstruo.vida -= 15;
  if (monstruo.vida <= 0) info.vida = Math.min(info.vida + 3, info.vidamax);
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Festín");
}

function cartaAtaqueRapido() {
  monstruo.vida -= 9;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Ataque rápido");
}

function cartaChapiadora() {
  monstruo.vida -= 32;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 3;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Chapiadora.com");
}

function cartaPromo2027() {
  monstruo.vida -= 10;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Promo 2027");
}

function cartaChoque() {
  monstruo.vida -= 14;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 0;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Choque");
}

function cartaGarrote() {
  monstruo.vida -= 14;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Garrote");
}

function cartaZip() {
  monstruo.vida -= 5;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Zip");
}

function cartaUppercut() {
  monstruo.vida -= 20;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Uppercut");
}

function cartaEscudo() {
  siEscudo = true;
  cantidadEscudo += 6;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Escudo");
}

function cartaTrinchera() {
  siEscudo = true;
  cantidadEscudo *= 2;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Trinchera");
}

function cartaProtector() {
  siEscudo = true;
  cantidadEscudo += 11;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Protector");
}

function cartaHeroico() {
  siEscudo = true;
  cantidadEscudo += 30;
  info.vida -= 6;
  if (info.vida < 0) info.vida = 0;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Heroico");
}

function cartaVerdaderoValor() {
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Verdadero valor");
}

function cartaSegundoAliento() {
  let noAtaque = cartasmano.filter(c => c.tipo !== "ataque");
  mana += 5 * noAtaque.length;
  if (mana > manaMax) mana = manaMax;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Segundo aliento");
}

function cartaDefensaEnPlacas() {
  siEscudo = true;
  cantidadEscudo += 5;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Defensa en placas");
}

function cartaEstrategiaDefensiva() {
  siEscudo = true;
  cantidadEscudo += 3;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Estrategia defensiva");
}

function cartaCopa() {
  siEscudo = true;
  cantidadEscudo += 3;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Copa");
}

function cartaAutoEscudo() {
  if (cantidadEscudo === 0) cantidadEscudo += 11;
  siEscudo = true;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Auto-escudo");
}

function cartaMutacion() {
  cantidadEscudo += 1;
  siEscudo = true;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Mutación");
}

function cartaEspadasOrbitantes() {
  siEscudo = true;
  cantidadEscudo += 10;
  lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
  vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  mana -= 2;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Espadas orbitantes");
}

function cartaFlexionar() {
  fuerza += 2;
  mana -= 0;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Flexionar");
}

function cartaRitual() {
  info.vida -= 6;
  if (info.vida < 0) info.vida = 0;
  mana += 2;
  if (mana > manaMax) mana = manaMax;
  vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Ritual");
}

function cartaDobleAtaque() {
  dobleSiguiente = true;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Doble ataque");
}

function cartaFuria() {
  furiaActiva = true;
  mana -= 0;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Furia");
}

function cartaColumnaSuertuda() {
  robarCartas(3);
  noRobarMas = true;
  mana -= 0;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Columna suertuda");
}

function cartaAtaqueAncestral() {
  agregarAtaqueGratis();
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Ataque ancestral");
}

function cartaDebilidad() {
  enemigoVulnerable(2);
  mana -= 0;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Debilidad");
}

function cartaBarricada() {
  bloqueNoDesvanece = true;
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Barricada");
}

function cartaGolpeDeCuerpo() {
  monstruo.vida -= cantidadEscudo;
  if (monstruo.vida < 0) monstruo.vida = 0;
  vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
  mana -= 0;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Golpe de cuerpo");
}

function cartaIgnorar() {
  cantidadEscudo += 8;
  siEscudo = true;
  robarCartas(1);
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Ignorar");
}

function cartaLamentoPenetrante() {
  reducirDanioEnemigos(6);
  mana -= 1;
  cajaMana.textContent = mana + " / " + manaMax;
  mazo.push("Lamento penetrante");
}
*/