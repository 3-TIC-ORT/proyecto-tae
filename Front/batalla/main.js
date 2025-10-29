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
  let omitir = document.getElementById("omitir");
  let cajaBatalla = document.getElementById("batalla");
  let lugarReliquias = document.getElementById("LugarReliquias");
  let lugarEscudo = document.getElementById("escudo");
  let lugarEscudoRival = document.getElementById("escudoRival");
  let cajaMana = document.getElementById("cajamana");
  let lugarRecompensas = document.getElementById("lugarRecompensas");
  let fotoP = document.getElementById("personaje");
  let fotoM = document.getElementById("monstruo");
  let contenedor = document.getElementById("container");
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
  let cartaElegida = {};
  let dañoRival;
  let escudoRival;

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

  getEvent("personaje", (data) => {
    let personaje = data;

    if (personaje === "mago") {
      fotoP.style.backgroundImage = "Url(../Cosas/mago.png)";
    } else if (personaje === "jon") {
      fotoP.style.backgroundImage = "Url(../Cosas/lawyer.png)";
    } else if (personaje === "bear") {
      fotoP.style.backgroundImage = "Url(../Cosas/bear.png)";
    } else if (personaje === "pick") {
      fotoP.style.backgroundImage = "Url(../Cosas/pick.png)";
    } else {
      fotoP.style.backgroundColor = "blue";
    }
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

  getEvent("estado-basico", (data) => {
    if (data.tipo === "ataque") {
      console.log(monstruo.tipo);
      if (monstruo.tipo === "normal") {
        const minNormal = 5;
        const maxNormal = 20;
        dañoRival =
          Math.floor(Math.random() * (maxNormal - minNormal + 1)) + minNormal;
      } else if (monstruo.tipo === "elite") {
        const minElite = 15;
        const maxElite = 35;
        dañoRival =
          Math.floor(Math.random() * (maxElite - minElite + 1)) + minElite;
      } else {
        const minBoss = 15;
        const maxBoss = 45;
        dañoRival =
          Math.floor(Math.random() * (maxBoss - minBoss + 1)) + minBoss;
      }
      console.log(dañoRival);
    }
    if (data.tipo === "defensa") {
      if (monstruo.tipo === "normal") {
        const minNormal = 5;
        const maxNormal = 15;
        escudoRival =
          Math.floor(Math.random() * (maxNormal - minNormal + 1)) + minNormal;
      } else if (monstruo.tipo === "elite") {
        const minElite = 7;
        const maxElite = 20;
        escudoRival =
          Math.floor(Math.random() * (maxElite - minElite + 1)) + minElite;
      } else {
        const minBoss = 10;
        const maxBoss = 25;
        escuroRival =
          Math.floor(Math.random() * (maxBoss - minBoss + 1)) + minBoss;
      }
    }
  });
  function contarCartasAtaque() {
    return cartasmano.filter((carta) => carta.tipo === "ataque").length;
  }
  console.log("numero turno: " + turno);
  function ganar() {
    if (batallaFinalizada) return;
    batallaFinalizada = true;
    alert("ganaste");
    info.oro += ganancia;
    mostrar();
    postEvent("fogata", {
      oro: info.oro,
      vida: info.vida,
      vidamax: info.vidamax,
    });
    setTimeout(() => {
      mostrarRecompensas();
    }, 200);
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
    lugarEscudoRival.textContent = "Escudo:" + escudoRival;
    vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    oro.textContent = `Oro: ${info.oro}`;
  }

  function usoReliquia() {
    if (reliquiaInicial === "Escudo de Hierro") {
      console.log("Reliquia activa:" + reliquiaInicial);
      if (info.vida < info.vidamax) {
        info.vida = Math.min(info.vida + 6, info.vidamax);
        alert("Escudo de Hierro te cura 6 de vida");
        mostrar();
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
  usoReliquia();

  function turnoRival() {
    console.log(dañoRival);
    alert(`El monstruo ataca por ${dañoRival} de daño!`);

    if (siEscudo && cantidadEscudo > 0) {
      // Si hay escudo, el daño lo recibe primero el ecudo
      if (cantidadEscudo >= dañoRival) {
        // El escudo absorbe todo el daño
        cantidadEscudo -= dañoRival;
        alert(`Tu escudo absorbe ${dañoRival} de daño!`);
      } else {
        // El escudo se rompe y el resto va a la vida
        let dañoRestante = dañoRival - cantidadEscudo;
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
      info.vida -= dañoRival;
      alert(`Recibes ${dañoRival} de daño directo!`);
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
    contarCartasAtaque();
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
    if (cartaRobada.nombre === "Espada pesada") {
      carta.classList.add("carta-espadaPesada");
    }
    if (cartaRobada.nombre === "Ira") {
      carta.classList.add("carta-ira");
    }
    if (cartaRobada.nombre === "Rafaga") {
      carta.classList.add("carta-rafaga");
    }
    if (cartaRobada.nombre === "Festin") {
      carta.classList.add("carta-festin");
    }
    if (cartaRobada.nombre === "Ataque rapido") {
      carta.classList.add("carta-ataqueRapido");
    }
    if (cartaRobada.nombre === "Chapiadora.com") {
      carta.classList.add("carta-chapiadora");
    }
    if (cartaRobada.nombre === "Promo 2027") {
      carta.classList.add("carta-promo");
    }
    if (cartaRobada.nombre === "Choque") {
      carta.classList.add("carta-choque");
    }
    if (cartaRobada.nombre === "Zip") {
      carta.classList.add("carta-zip");
    }
    if (cartaRobada.nombre === "Uppercut") {
      carta.classList.add("carta-uppercut");
    }
    if (cartaRobada.nombre === "Trinchera") {
      carta.classList.add("carta-trinchera");
    }
    if (cartaRobada.nombre === "Protector") {
      carta.classList.add("carta-protector");
    }
    if (cartaRobada.nombre === "Heroico") {
      carta.classList.add("carta-heroico");
    }
    if (cartaRobada.nombre === "Verdadero Valor") {
      carta.classList.add("carta-verdaderoValor");
    }
    if (cartaRobada.nombre === "Segundo Aliento") {
      carta.classList.add("carta-segundoAliento");
    }
    if (cartaRobada.nombre === "Defensa en Placas") {
      carta.classList.add("carta-defensaEnPlacas");
    }
    if (cartaRobada.nombre === "Estrategia Defensiva") {
      carta.classList.add("carta-estrategiaDefensiva");
    }
    if (cartaRobada.nombre === "Copa") {
      carta.classList.add("carta-copa");
    }
    if (cartaRobada.nombre === "Auto-escudo") {
      carta.classList.add("carta-autoEscudo");
    }
    if (cartaRobada.nombre === "Mutacion") {
      carta.classList.add("carta-mutacion");
    }
    if (cartaRobada.nombre === "Espadas orbitantes") {
      carta.classList.add("carta-espadasOrbitantes");
    }
    if (cartaRobada.nombre === "Flexionar") {
      carta.classList.add("carta-flexionar");
    }
    if (cartaRobada.nombre === "Ritual") {
      carta.classList.add("carta-ritual");
    }
    if (cartaRobada.nombre === "Doble ataque") {
      carta.classList.add("carta-dobleAtaque");
    }
    if (cartaRobada.nombre === "Furia") {
      carta.classList.add("carta-furia");
    }
    if (cartaRobada.nombre === "Columna Suertuda") {
      carta.classList.add("carta-columnaSuertuda");
    }
    if (cartaRobada.nombre === "Ataque ancestral") {
      carta.classList.add("carta-ataqueAncestral");
    }
    if (cartaRobada.nombre === "Debilidad") {
      carta.classList.add("carta-debilidad");
    }
    if (cartaRobada.nombre === "Barricada") {
      carta.classList.add("carta-barricada");
    }
    if (cartaRobada.nombre === "Golpe de cuerpo") {
      carta.classList.add("carta-golpeDeCuerpo");
    }
    if (cartaRobada.nombre === "Ignorar") {
      carta.classList.add("carta-ignorar");
    }
    if (cartaRobada.nombre === "Lamento penetrante") {
      carta.classList.add("carta-lamentoPenetrante");
    }
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
    } else if (nombreCarta === "Espada pesada") {
      cartaEspadaPesada(cartaActual);
    } else if (nombreCarta === "Ira") {
      cartaIra(cartaActual);
    } else if (nombreCarta === "Rafaga") {
      cartaRafaga(cartaActual);
    } else if (nombreCarta === "Festin") {
      cartaFestin(cartaActual);
    } else if (nombreCarta === "Ataque rápido") {
      cartaAtaqueRapido(cartaActual);
    } else if (nombreCarta === "Chapiadora.com") {
      cartaChapiadora(cartaActual);
    } else if (nombreCarta === "Promo 2027") {
      cartaPromo2027(cartaActual);
    } else if (nombreCarta === "Coque") {
      cartaCoque(cartaActual);
    }

    cartasmano = cartasmano.filter((c) => c !== cartaActual);
    sacarCarta();
  });
  function iniciarCartas() {
    contarCartasAtaque();
    abajo.innerHTML = "";
    contadorCartas = 1;
    mana = manaMax;
    cajaMana.textContent = `${mana} / ${manaMax}`;
    for (let i = 0; i < 5; i++) {
      sumarCarta();
    }
    console.log("🃏 Cartas de ataque en mano:", contarCartasAtaque());
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
    cantidadEscudo += 5;
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
  function cartaEspadaPesada(carta) {
    monstruo.vida -= 15;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= 2;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push("Espada pesada");
  }

  function cartaIra(carta) {
    monstruo.vida -= 8;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= 0;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push("Ira");
  }

  function cartaRafaga(carta) {
    monstruo.vida -= 5;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= 1;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push("Rafaga");
  }

  function cartaFestin(carta) {
    monstruo.vida -= 15;
    if (monstruo.vida <= 0) info.vidamax += 3;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
    mana -= 3;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push("Festin");
  }

  function cartaAtaqueRapido(carta) {
    monstruo.vida -= 9;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= 1;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push("Ataque rápido");
  }

  function cartaChapiadora(carta) {
    monstruo.vida -= 32;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= 3;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push("Chapiadora.com");
  }

  function cartaPromo2027(carta) {
    monstruo.vida -= 10;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    mana -= 1;
    cajaMana.textContent = mana + " / " + manaMax;
    mazo.push("Promo 2027");
  }

  function cartaCoque(carta) {
    if (contarCartasAtaque() === 0) {
      monstruo.vida -= 14;
      if (monstruo.vida < 0) monstruo.vida = 0;
      vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
      mana -= 0;
      cajaMana.textContent = mana + " / " + manaMax;
      mazo.push("Coque");
    } else {
      alert("Tienes cartas de ataque en la mano, no la puedes usar");
    }
  }

  function sacarCarta() {
    contarCartasAtaque();
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
    console.log("🃏 Cartas de ataque en mano:", contarCartasAtaque());
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
  function mostrarRecompensas() {
    lugarRecompensas.style.display = "block";
    lugarRecompensas.style.backgroundColor = "white";
    cajaBatalla.style.display = "none";
    LugarCartas.style.display = "none";
    LugarCartas.style.background = "none";
    lugarReliquias.style.display = "none";
    lugarReliquias.style.background = "none";
    document.body.style.background = "none";
    for (let i = 1; i <= 3; i++) {
      let contenedorRecompensa = document.getElementById(
        "contenedorRecompensas"
      );
      let nuevaRecompensa = document.createElement("div");
      nuevaRecompensa.classList.add("recompensa");
      nuevaRecompensa.id = `recompensa${i}`;

      if (i === 1) nuevaRecompensa.textContent = `Oro: ${ganancia}`;
      else if (i === 2) nuevaRecompensa.textContent = `Recompensa 2`;
      else nuevaRecompensa.textContent = `Escoge una carta`;
      contenedorRecompensa.appendChild(nuevaRecompensa);
    }
    let recompensa3 = document.getElementById("recompensa3");
    recompensa3.addEventListener("click", irSeleccion);
  }

  function volverBatalla() {
    cajaBatalla.style.display = "block";
    LugarCartas.style.display = "none";
    LugarCartas.style.background = "none";
    lugarReliquias.style.display = "none";
    lugarReliquias.style.backgroundColor = "none";
    lugarRecompensas.style.background = "None";
    lugarRecompensas.style.display = "none";
    window.scrollTo(0, 0);
  }
  function irSeleccion() {
    window.location.href = "../seleccion-cartas/index.html";
  }
  cartas.addEventListener("click", mostrarCartas);
  atras.addEventListener("click", volverBatalla);
  atras2.addEventListener("click", volverBatalla);
  omitir.addEventListener("click", irSeleccion);
  reliquias.addEventListener("click", mostrarReliquias);
});

/*
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
