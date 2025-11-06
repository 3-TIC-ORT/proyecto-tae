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
  //let omitir = document.getElementById("omitir");
  let cajaBatalla = document.getElementById("batalla");
  let lugarReliquias = document.getElementById("LugarReliquias");
  let lugarEscudo = document.getElementById("escudo");
  let lugarEscudoRival = document.getElementById("escudoRival");
  let cajaMana = document.getElementById("cajamana");
  let lugarRecompensas = document.getElementById("lugarRecompensas");
  let fotoP = document.getElementById("personaje");
  let fotoM = document.getElementById("monstruo");
  let contenedor = document.getElementById("caja");
  let eleccionReliquias = document.getElementsByClassName("reliquia");
  let reliquia1 = document.getElementById("elegirReliquia1");
  let reliquia2 = document.getElementById("elegirReliquia2");
  let reliquia3 = document.getElementById("elegirReliquia3");
  let reliquia4 = document.getElementById("elegirReliquia4");
  let reliquia5 = document.getElementById("elegirReliquia5");
  let reliquiaJefe1 = {};
  let reliquiaJefe2 = {};
  let reliquiaJefe3 = {};
  let reliquiaJefe4 = {};
  let reliquiaJefe5 = {};
  let escudoQueda = false;
  let cajaMonstruo = document.getElementById("caja-monstruo");
  let fuerza = 0;
  let sangrado = 0;
  let siLantern = 0;
  let siBag = false;
  let siSalvia = false;
  let siBlack = false;
  let siCaja = 0;
  let siFortaleza = false;
  let siRegal = false;
  let siPiedra = false;
  let siClasico = false;
  let clasicoTurnos = 0;
  let siConstru = false;
  let siRoca = false;
  let siAnchor = false;
  let lamentoPenetrante = false;
  let furiaActiva = false;
  let dobleSiguiente = false;
  let siMutacion = false;
  let siEstrategia = false;
  let tengoEscudo = false;
  let siDefensaPlacas = false;
  let saltearTurnoRival = false;
  let CincoCopa = 0;
  let defensaPlacasTurno = 0;
  let siEspadasOrbitantes = false;
  let espadasOrbitantesTurno = 0;
  let noRobarMas = false;
  let vul = 0;
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
  let reliquiaElite1 = {};
  let reliquiaElite2 = {};

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
    monstruo.vida = 1;
    gananciaInicial = monstruo.recompenzas;
    ganancia = gananciaInicial;
    console.log("Recompensa:", ganancia);
    if (monstruo.tipo === "normal") {
      fotoMonstruos();
    }
    if (monstruo.tipo === "elite") {
      fotoMonstruosElite();
    }
    if (monstruo.tipo === "jefe") {
      fotoM.style.backgroundImage = `url("../Cosas/Monstruos/boss.png")`;
      fotoM.style.backgroundSize = "contain";
      fotoM.style.backgroundRepeat = "no-repeat";
      cajaMonstruo.style.height = "50vh";
      cajaMonstruo.style.aspectRatio = "9/14";
      cajaMonstruo.style.width = "none";
      contenedor.style.top = "1.5vh";
    }
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
    console.log("Reliquia Inicial: " + reliquiaInicial);
    usoReliquia();
  });

  getEvent("mazo", (data) => {
    mazo = data;
    console.log("Mazo recibido:", mazo);
    mostrarMazo();
    iniciarCartas();
  });

  getEvent("estado-basico", (data) => {
    data.tipo = "ataque";
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
        escudoRival =
          Math.floor(Math.random() * (maxBoss - minBoss + 1)) + minBoss;
      }
      console.log("defensa");
      console.log(escudoRival);
    }
  });
  console.log("numero turno: " + turno);
  function ganar() {
    if (batallaFinalizada) return;
    batallaFinalizada = true;
    info.oro += ganancia;
    mostrar();
    postEvent("fogata", {
      oro: info.oro,
      vida: info.vida,
      vidamax: info.vidamax,
    });
    setTimeout(() => {
      if (monstruo.tipo !== "jefe") {
        mostrarRecompensas();
      } else {
        cofre();
      }
    }, 200);
  }

  function escudoClasico() {
    cantidadEscudo += 10;
    siEscudo = true;
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    console.log("Cantidad Escudo: " + cantidadEscudo);
    clasicoTurnos--;
  }
  function mostrarReliquia() {
    if (!cajaReliquias) return console.warn("No se encontró cajaReliquias");
    cajaReliquias.innerHTML = "";
    for (let i = 0; i < reliquia.length; i++) {
      let nuevaReliquia = document.createElement("div");
      nuevaReliquia.classList.add("todas");
      nuevaReliquia.id = "reliquia" + i;
      nuevaReliquia.innerHTML = `<p>${reliquia[i].nombre}</p>`;

      if (reliquia[i].nombre === "Vajra") {
        nuevaReliquia.classList.add("reliquia-vajra");
      } else if (reliquia[i].nombre === "Anchor") {
        nuevaReliquia.classList.add("reliquia-anchor");
      } else if (reliquia[i].nombre === "Bag of Preparation") {
        nuevaReliquia.classList.add("reliquia-bag-of-preparation");
      } else if (reliquia[i].nombre === "Lantern") {
        nuevaReliquia.classList.add("reliquia-lantern");
      } else if (reliquia[i].nombre === "Regal Pillow") {
        nuevaReliquia.classList.add("reliquia-regal-pillow");
      } else if (reliquia[i].nombre === "Roca Rúnica") {
        nuevaReliquia.classList.add("reliquia-roca-runica");
      } else if (reliquia[i].nombre === "Piedra Filosofal") {
        nuevaReliquia.classList.add("reliquia-piedra-filosofal");
      } else if (reliquia[i].nombre === "Salvia") {
        nuevaReliquia.classList.add("reliquia-salvia");
      } else if (reliquia[i].nombre === "Red star") {
        nuevaReliquia.classList.add("reliquia-red-star");
      } else if (reliquia[i].nombre === "Sombrero mágico") {
        nuevaReliquia.classList.add("reliquia-sombrero-magico");
      } else if (reliquia[i].nombre === "Sombrero constructor") {
        nuevaReliquia.classList.add("reliquia-sombrero-constructor");
      } else if (reliquia[i].nombre === "Escudo Clásico") {
        nuevaReliquia.classList.add("reliquia-escudo-clasico");
      } else if (reliquia[i].nombre === "Black Star") {
        nuevaReliquia.classList.add("reliquia-black-star");
      } else if (reliquia[i].nombre === "Caja de Devolución") {
        nuevaReliquia.classList.add("reliquia-caja-de-devolucion");
      } else if (reliquia[i].nombre === "Fortaleza") {
        nuevaReliquia.classList.add("reliquia-fortaleza");
      } else if (reliquia[i].nombre === "Escudo de Hierro") {
        nuevaReliquia.classList.add("reliquia-escudo-de-hierro");
      } else if (reliquia[i].nombre === "Trébol de Oro") {
        nuevaReliquia.classList.add("reliquia-trebol-de-oro");
      } else if (reliquia[i].nombre === "Báculo del Archimago") {
        nuevaReliquia.classList.add("reliquia-baculo-del-archimago");
      } else if (reliquia[i].nombre === "Lanza de odin") {
        nuevaReliquia.classList.add("reliquia-lanza-de-odin");
      }

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
      if (mazo[i].nombre === "Golpe") {
        nuevaCarta.classList.add("carta-golpe");
      }
      if (mazo[i].nombre === "Escudo") {
        nuevaCarta.classList.add("carta-escudo");
      }
      if (mazo[i].nombre === "Garrote") {
        nuevaCarta.classList.add("carta-garrote");
      }
      if (mazo[i].nombre === "Espada pesada") {
        nuevaCarta.classList.add("carta-espadaPesada");
      }
      if (mazo[i].nombre === "Ira") {
        nuevaCarta.classList.add("carta-ira");
      }
      if (mazo[i].nombre === "Rafaga") {
        nuevaCarta.classList.add("carta-rafaga");
      }
      if (mazo[i].nombre === "Festin") {
        nuevaCarta.classList.add("carta-festin");
      }
      if (mazo[i].nombre === "Ataque rapido") {
        nuevaCarta.classList.add("carta-ataqueRapido");
      }
      if (mazo[i].nombre === "Chapiadora.com") {
        nuevaCarta.classList.add("carta-chapiadora");
      }
      if (mazo[i].nombre === "Promo 2027") {
        nuevaCarta.classList.add("carta-promo");
      }
      if (mazo[i].nombre === "Choque") {
        nuevaCarta.classList.add("carta-choque");
      }
      if (mazo[i].nombre === "Zip") {
        nuevaCarta.classList.add("carta-zip");
      }
      if (mazo[i].nombre === "Uppercut") {
        nuevaCarta.classList.add("carta-uppercut");
      }
      if (mazo[i].nombre === "Trinchera") {
        nuevaCarta.classList.add("carta-trinchera");
      }
      if (mazo[i].nombre === "Protector") {
        nuevaCarta.classList.add("carta-protector");
      }
      if (mazo[i].nombre === "Heroico") {
        nuevaCarta.classList.add("carta-heroico");
      }
      if (mazo[i].nombre === "Verdadero Valor") {
        nuevaCarta.classList.add("carta-verdaderoValor");
      }
      if (mazo[i].nombre === "Segundo Aliento") {
        nuevaCarta.classList.add("carta-segundoAliento");
      }
      if (mazo[i].nombre === "Defensa en placas") {
        nuevaCarta.classList.add("carta-defensaEnPlacas");
      }
      if (mazo[i].nombre === "Estrategia defensiva") {
        nuevaCarta.classList.add("carta-estrategiaDefensiva");
      }
      if (mazo[i].nombre === "Copa") {
        nuevaCarta.classList.add("carta-copa");
      }
      if (mazo[i].nombre === "Auto-escudo") {
        nuevaCarta.classList.add("carta-autoEscudo");
      }
      if (mazo[i].nombre === "Mutacion") {
        nuevaCarta.classList.add("carta-mutacion");
      }
      if (mazo[i].nombre === "Espadas orbitantes") {
        nuevaCarta.classList.add("carta-espadasOrbitantes");
      }
      if (mazo[i].nombre === "Flexionar") {
        nuevaCarta.classList.add("carta-flexionar");
      }
      if (mazo[i].nombre === "Ritual") {
        nuevaCarta.classList.add("carta-ritual");
      }
      if (mazo[i].nombre === "Doble ataque") {
        nuevaCarta.classList.add("carta-dobleAtaque");
      }
      if (mazo[i].nombre === "Furia") {
        nuevaCarta.classList.add("carta-furia");
      }
      if (mazo[i].nombre === "Columna Suertuda") {
        nuevaCarta.classList.add("carta-columnaSuertuda");
      }
      if (mazo[i].nombre === "Ataque ancestral") {
        nuevaCarta.classList.add("carta-ataqueAncestral");
      }
      if (mazo[i].nombre === "Debilidad") {
        nuevaCarta.classList.add("carta-debilidad");
      }
      if (mazo[i].nombre === "Barricada") {
        nuevaCarta.classList.add("carta-barricada");
      }
      if (mazo[i].nombre === "Golpe de cuerpo") {
        nuevaCarta.classList.add("carta-golpeDeCuerpo");
      }
      if (mazo[i].nombre === "Ignorar") {
        nuevaCarta.classList.add("carta-ignorar");
      }
      if (mazo[i].nombre === "Lamento penetrante") {
        nuevaCarta.classList.add("carta-lamentoPenetrante");
      }
      cajaCartas.appendChild(nuevaCarta);
    }
    circCartas.textContent = mazo.length;
  }

  function mostrar() {
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    //lugarEscudoRival.textContent = "Escudo:" + escudoRival;
    vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    oro.textContent = `Oro: ${info.oro}`;
  }
  function mostrarEscudoRestante() {
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
  }

  function usoReliquia() {
    // Reliquias Iniciales
    if (reliquiaInicial === "Escudo de Hierro") {
      console.log("Reliquia Inicial activa:" + reliquiaInicial);
      if (info.vida < info.vidamax) {
        info.vida = Math.min(info.vida + 6, info.vidamax);
        mostrar();
      }
    } else if (reliquiaInicial === "Trébol de Oro") {
      console.log("Reliquia Inicial activa:" + reliquiaInicial);

      if (ganancia < gananciaInicial * 2) {
        ganancia = ganancia * 2;
      } else return;
      console.log(ganancia);
    } else if (reliquiaInicial === "Báculo del Archimago") {
      console.log("Reliquia Inicial activa:" + reliquiaInicial);
      manaMax = 4;
      mana = 4;
      console.log(mana);
      console.log(manaMax);
    } else if (reliquiaInicial === "Lanza de odin") {
      console.log("Reliquia Inicial activa:" + reliquiaInicial);
    }
    //Reliquias otras
    for (let i = 1; i < reliquia.length; i++) {
      if (reliquia[i].nombre === "Vajra") {
        console.log("Reliquia Activa: " + reliquia[i].nombre);
        fuerza += 1;
        console.log("Fuerza (vajra): " + fuerza);
      } else if (reliquia[i].nombre === "Anchor") {
        siAnchor = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Bag of Preparation") {
        siBag = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Lantern") {
        siLantern = 1;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Regal Pillow") {
        siRegal = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Roca Rúnica") {
        siRoca = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Piedra Filosofal") {
        siPiedra = true;
        vul += 1;
        console.log("Piedra filosofal:" + vul);
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Salvia") {
        siSalvia = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Red star") {
        if (monstruo.tipo === "jefe") {
          console.log(monstruo.tipo + "red star");
          info.vida += 25;
        }
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Sombrero mágico") {
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (
        reliquia[i].nombre === "Sombrero constructor (se usa en la tienda)"
      ) {
        siConstru = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Escudo Clásico") {
        if (monstruo.tipo === "elite" || monstruo.tipo === "jefe") {
          siClasico = true;
          clasicoTurnos = 3;
          if (siClasico && clasicoTurnos > 0) {
            escudoClasico();
          }
        }
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Black Star") {
        siBlack = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Caja de Devolución") {
        siCaja = 3;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      } else if (reliquia[i].nombre === "Fortaleza") {
        siFortaleza = true;
        console.log("Reliquia Activa: " + reliquia[i].nombre);
      }
    }
  }
  usoReliquia();

  function turnoRival() {
    console.log("Mutacion: " + siMutacion);
    console.log(monstruo.tipo);
    console.log("escudo personaje: " + cantidadEscudo);
    console.log(saltearTurnoRival);
    if (!saltearTurnoRival) {
      if (monstruo.tipo === "normal") {
        const minNormal = 5;
        const maxNormal = 18;
        dañoRival =
          Math.floor(Math.random() * (maxNormal - minNormal + 1)) + minNormal;
      } else if (monstruo.tipo === "elite") {
        const minElite = 10;
        const maxElite = 35;
        dañoRival =
          Math.floor(Math.random() * (maxElite - minElite + 1)) + minElite;
      } else {
        const minBoss = 15;
        const maxBoss = 45;
        dañoRival =
          Math.floor(Math.random() * (maxBoss - minBoss + 1)) + minBoss;
      }
      console.log("Daño sin cambiar " + dañoRival);
      if (lamentoPenetrante) {
        dañoRival -= 6;
      }

      if (vul === 1) {
        dañoRival = dañoRival * 0.9;
      } else if (vul === 2) {
        dañoRival = dañoRival * 0.8;
      } else if (vul === 3) {
        dañoRival = dañoRival * 0.7;
      } else if (vul === 4) {
        dañoRival = dañoRival * 0.6;
      } else if (vul >= 5) {
        dañoRival = dañoRival * 0.5;
      }
      if (vul < 5) {
        console.log("Vulnerabilidad: " + vul * 10 + "%");
      } else {
        console.log("Vulnerabilidad: 50%");
      }

      if (siEstrategia) {
        dañoRival = dañoRival * 0.75;
      }
      if (siConstru) {
        if (monstruo.tipo === "elite" || monstruo.tipo === "jefe") {
          dañoRival *= 0.85;
        }
      }
      dañoRival = Math.floor(dañoRival);
      console.log("Daño del rival en este turno: " + dañoRival);
      alert(`El monstruo ataca por ${dañoRival} de daño!`);

      if (siEscudo && cantidadEscudo > 0) {
        if (cantidadEscudo >= dañoRival) {
          if (!escudoQueda) {
            cantidadEscudo -= dañoRival;
          } else escudoQueda = false;
        } else {
          // El escudo se rompe y el resto va a la vida
          let dañoRestante = dañoRival - cantidadEscudo;

          info.vida -= dañoRestante;
          if (!escudoQueda) {
            cantidadEscudo = 0;
          } else escudoQueda = false;
          siEscudo = false;
        }
        mostrarEscudoRestante();
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      } else {
        info.vida -= dañoRival;

        vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
      }
      console.log(dañoRival);

      if (info.vida < 0) info.vida = 0;
      mostrar();

      if (info.vida <= 0) {
        window.location.href = "../Game_over/index.html";
        return;
      }
      saltearTurnoRival = false;
      console.log(saltearTurnoRival);
    }
    saltearTurnoRival = false;
    console.log(saltearTurnoRival);
    iniciarTurnoJugador();
  }
  function iniciarTurnoJugador(carta) {
    if (siFortaleza) {
      vul += 1;
      fuerza += 1;
    }
    if (siPiedra) {
      fuerza += 1;
      console.log("Piedra filosofal:" + vul, fuerza);
    }
    if (siAnchor) {
      cantidadEscudo += 10;
      siEscudo = true;
    }
    if (siRegal) {
      info.vida += 5;
    }
    if (siClasico && clasicoTurnos > 0) {
      escudoClasico();
    }
    turno = turno + 1;
    abajo.style.display = "flex";
    if (siDefensaPlacas && defensaPlacasTurno > 0) {
      siEscudo = true;
      if (CincoCopa <= 0) {
        cantidadEscudo += 5;
        CincoCopa = 0;
      } else if (CincoCopa > 0) {
        cantidadEscudo += 5 * 1.25;
        CincoCopa--;
      }
      defensaPlacasTurno--;
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      if (defensaPlacasTurno === 0) siDefensaPlacas = false;
      if (sangrado > 0) {
        monstruo.vida -= 3;
        sangrado--;
      }
    }
    if (siEspadasOrbitantes && espadasOrbitantesTurno > 0) {
      siEscudo = true;
      if (CincoCopa <= 0) {
        cantidadEscudo += 10;
        CincoCopa = 0;
      } else if (CincoCopa > 0) {
        cantidadEscudo += 10 * 1.25;
        CincoCopa--;
      }
      espadasOrbitantesTurno--;
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      if (defensaPlacasTurno === 0) siDefensaPlacas = false;
    }

    if (siEscudo === true) mostrarEscudoRestante();
    console.log(cantidadEscudo);
    iniciarCartas();
  }

  function finalizarTurno() {
    console.log("finalizar turno");
    abajo.style.display = "none";
    alert("TURNO RIVAL");
    turno = turno + 1;
    console.log("Turno numero " + turno / 2);
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
    carta.classList.add(`carta${contadorCartas}B`, "cartaG");
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
    if (cartaRobada.nombre === "Defensa en placas") {
      carta.classList.add("carta-defensaEnPlacas");
    }
    if (cartaRobada.nombre === "Estrategia defensiva") {
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
      if (dobleSiguiente) {
        golpe(cartaActual);
        golpe(cartaActual);
        dobleSiguiente = false;
      } else golpe(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Escudo") {
      if (dobleSiguiente) {
        escudo(cartaActual);
        escudo(cartaActual);
        dobleSiguiente = false;
      } else escudo(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Garrote") {
      if (dobleSiguiente) {
        garrote(cartaActual);
        garrote(cartaActual);
        dobleSiguiente = false;
      } else garrote(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Espada pesada") {
      if (dobleSiguiente) {
        cartaEspadaPesada(cartaActual);
        cartaEspadaPesada(cartaActual);
        dobleSiguiente = false;
      } else cartaEspadaPesada(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Ira") {
      if (dobleSiguiente) {
        cartaIra(cartaActual);
        cartaIra(cartaActual);
        dobleSiguiente = false;
      } else cartaIra(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Rafaga") {
      if (dobleSiguiente) {
        cartaRafaga(cartaActual);
        cartaRafaga(cartaActual);
        dobleSiguiente = false;
      } else cartaRafaga(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Festin") {
      if (dobleSiguiente) {
        cartaFestin(cartaActual);
        cartaFestin(cartaActual);
        dobleSiguiente = false;
      } else cartaFestin(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Ataque rapido") {
      if (dobleSiguiente) {
        cartaAtaqueRapido(cartaActual);
        cartaAtaqueRapido(cartaActual);
        dobleSiguiente = false;
      } else cartaAtaqueRapido(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Chapiadora.com") {
      if (dobleSiguiente) {
        cartaChapiadora(cartaActual);
        cartaChapiadora(cartaActual);
        dobleSiguiente = false;
      } else cartaChapiadora(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Promo 2027") {
      if (dobleSiguiente) {
        cartaPromo2027(cartaActual);
        cartaPromo2027(cartaActual);
        dobleSiguiente = false;
      } else cartaPromo2027(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Coque") {
      if (dobleSiguiente) {
        cartaCoque(cartaActual);
        cartaCoque(cartaActual);
        dobleSiguiente = false;
      } else cartaCoque(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Zip") {
      if (dobleSiguiente) {
        cartaZip(cartaActual);
        cartaZip(cartaActual);
        dobleSiguiente = false;
      } else cartaZip(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Uppercut") {
      if (dobleSiguiente) {
        cartaUppercut(cartaActual);
        cartaUppercut(cartaActual);
        dobleSiguiente = false;
      } else cartaUppercut(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Trinchera") {
      if (dobleSiguiente) {
        cartaTrinchera(cartaActual);
        cartaTrinchera(cartaActual);
        dobleSiguiente = false;
      } else cartaTrinchera(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Protector") {
      if (dobleSiguiente) {
        cartaProtector(cartaActual);
        cartaProtector(cartaActual);
        dobleSiguiente = false;
      } else cartaProtector(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Heroico") {
      if (dobleSiguiente) {
        cartaHeroico(cartaActual);
        cartaHeroico(cartaActual);
        dobleSiguiente = false;
      } else cartaHeroico(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Auto-escudo") {
      if (dobleSiguiente) {
        cartaAutoEscudo(cartaActual);
        cartaAutoEscudo(cartaActual);
        dobleSiguiente = false;
      } else cartaAutoEscudo(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Mutacion") {
      cartaMutacion(cartaActual);
    } else if (nombreCarta === "Estrategia defensiva") {
      if (dobleSiguiente) {
        cartaEstrategiaDefensiva(cartaActual);
        cartaEstrategiaDefensiva(cartaActual);
        dobleSiguiente = false;
      } else cartaEstrategiaDefensiva(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Defensa en placas") {
      if (dobleSiguiente) {
        cartaDefensaEnPlacas(cartaActual);
        cartaDefensaEnPlacas(cartaActual);
        dobleSiguiente = false;
      } else cartaDefensaEnPlacas(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Copa") {
      if (dobleSiguiente) {
        cartaCopa(cartaActual);
        cartaCopa(cartaActual);
        dobleSiguiente = false;
      } else cartaCopa(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Espadas orbitantes") {
      if (dobleSiguiente) {
        cartaEspadasOrbitantes(cartaActual);
        cartaEspadasOrbitantes(cartaActual);
        dobleSiguiente = false;
      } else cartaEspadasOrbitantes(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Flexionar") {
      if (dobleSiguiente) {
        cartaFlexionar(cartaActual);
        cartaFlexionar(cartaActual);
        dobleSiguiente = false;
      } else cartaFlexionar(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Verdadero valor") {
      if (dobleSiguiente) {
        cartaVerdaderoValor(cartaActual);
        cartaVerdaderoValor(cartaActual);
        dobleSiguiente = false;
      } else cartaVerdaderoValor(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Segundo aliento") {
      if (dobleSiguiente) {
        cartaSegundoAliento(cartaActual);
        cartaSegundoAliento(cartaActual);
        dobleSiguiente = false;
      } else cartaSegundoAliento(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Ritual") {
      if (dobleSiguiente) {
        cartaRitual(cartaActual);
        cartaRitual(cartaActual);
        dobleSiguiente = false;
      } else cartaRitual(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Furia") {
      if (dobleSiguiente) {
        cartaFuria(cartaActual);
        cartaFuria(cartaActual);
        dobleSiguiente = false;
      } else cartaFuria(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Columna suertuda") {
      if (dobleSiguiente) {
        cartaColumnaSuertuda(cartaActual);
        cartaColumnaSuertuda(cartaActual);
        dobleSiguiente = false;
      } else cartaColumnaSuertuda(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Ataque ancestral") {
      if (dobleSiguiente) {
        cartaAtaqueAncestral(cartaActual);
        cartaAtaqueAncestral(cartaActual);
        dobleSiguiente = false;
      } else cartaAtaqueAncestral(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Debilidad") {
      if (dobleSiguiente) {
        cartaDebilidad(cartaActual);
        cartaDebilidad(cartaActual);
        dobleSiguiente = false;
      } else cartaDebilidad(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Barricada") {
      if (dobleSiguiente) {
        cartaBarricada(cartaActual);
        cartaBarricada(cartaActual);
        dobleSiguiente = false;
      } else cartaBarricada(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
      siEscudo = true;
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    } else if (nombreCarta === "Golpe de cuerpo") {
      if (dobleSiguiente) {
        cartaGolpeDeCuerpo(cartaActual);
        cartaGolpeDeCuerpo(cartaActual);
        dobleSiguiente = false;
      } else cartaGolpeDeCuerpo(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Ignorar") {
      if (dobleSiguiente) {
        cartaIgnorar(cartaActual);
        cartaIgnorar(cartaActual);
        dobleSiguiente = false;
      } else cartaIgnorar(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Lamento penetrante") {
      if (dobleSiguiente) {
        cartaLamentoPenetrante(cartaActual);
        cartaLamentoPenetrante(cartaActual);
        dobleSiguiente = false;
      } else cartaLamentoPenetrante(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    } else if (nombreCarta === "Doble ataque") {
      cartaDobleAtaque(cartaActual);
      if (siMutacion === true) {
        cantidadEscudo += 1;
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
    }

    cartasmano = cartasmano.filter((c) => c !== cartaActual);
    sacarCarta();
  });
  function iniciarCartas() {
    abajo.innerHTML = "";
    contadorCartas = 1;
    if (siLantern > 0) {
      mana = manaMax + 1;
      siLantern--;
    } else {
      mana = manaMax;
    }
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;

    let cantidadInicial = 5; // valor base

    if (siCaja > 0) {
      cantidadInicial = 7;
      siCaja--;
      console.log(siCaja);
    }

    if (siBag && siCaja <= 0) {
      cantidadInicial = 6;
    }

    for (let i = 0; i < cantidadInicial; i++) {
      sumarCarta();
    }
  }

  // CARTAS ATAQUE
  function golpe(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (reliquiaInicial === "Lanza de Odin") {
      // if (Math.random() < 2) {
      if (sangrado <= 0) {
        sangrado = 2;
        carta.daño += 3;
      }
      // }
    }
    if (fuerza <= 0) {
      // carta.daño = 100;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      console.log(dañoRival);
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    monstruo.vida = Math.floor(monstruo.vida);
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else if (!dobleSiguiente) mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push(carta);
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      if (siRoca) {
        info.vidamax += 2;
      }
      ganar();
    }
  }

  function garrote(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    //mazorobar.push(carta);
    vul = vul + 2;
    console.log(carta.nombre);
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }
  function cartaEspadaPesada(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Espada pesada");
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }

  function cartaIra(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Ira");
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }

  function cartaRafaga(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Rafaga");
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }

  function cartaFestin(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida <= 0) info.vidamax += 3;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
    vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    //mazorobar.push("Festin");
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }

  function cartaAtaqueRapido(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Ataque rápido");

    if (!noRobarMas) {
      sumarCarta();
      noRobarMas = false;
    }

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }

  function cartaChapiadora(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    //mazorobar.push("Chapiadora.com");
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }

  function cartaPromo2027(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Promo 2027");
    if (!noRobarMas) {
      sumarCarta();
      sumarCarta();
      noRobarMas = false;
    }
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }

  function cartaCoque(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (info.vida < info.vidamax / 2) {
      if (fuerza <= 0) {
        carta.daño = carta.daño;
      } else if (fuerza === 1) {
        carta.daño *= 1.1;
      } else if (fuerza === 2) {
        carta.daño *= 1.2;
      } else if (fuerza === 3) {
        carta.daño *= 1.3;
      } else if (fuerza === 4) {
        carta.daño *= 1.4;
      } else if (fuerza === 5) {
        carta.daño *= 1.5;
      } else if (fuerza === 6) {
        carta.daño *= 1.6;
      } else if (fuerza === 7) {
        carta.daño *= 1.7;
      } else if (fuerza === 8) {
        carta.daño *= 1.8;
      } else if (fuerza === 9) {
        carta.daño *= 1.9;
      } else if (fuerza >= 10) {
        carta.daño *= 2;
      }
      if (siSalvia && turno > 1) {
        carta.daño += dañoRival * 0.3;
      }
      monstruo.vida -= carta.daño;
      if (monstruo.vida < 0) monstruo.vida = 0;
      vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
      if (furiaActiva) {
        siEscudo = true;
        cantidadEscudo += 3;
        cantidadEscudo = Math.floor(cantidadEscudo);
        lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
        vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
      }
      if (dobleSiguiente) {
        mana -= carta.elixir * 0.5;
      } else mana -= carta.elixir;
      //mana = Math.floor(mana);
      cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
      mazorobar.push("Coque");
    } else {
      alert("Tienes mas de la mitad de tu vida");
      return;
    }

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${carta.nombre}`);
      ganar();
    }
  }
  function cartaZip(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    saltearTurnoRival = true;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Zip");
    console.log("turno" + turno);
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Zip"}`);
      ganar();
    }
  }
  function cartaUppercut(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (fuerza <= 0) {
      carta.daño = carta.daño;
    } else if (fuerza === 1) {
      carta.daño *= 1.1;
    } else if (fuerza === 2) {
      carta.daño *= 1.2;
    } else if (fuerza === 3) {
      carta.daño *= 1.3;
    } else if (fuerza === 4) {
      carta.daño *= 1.4;
    } else if (fuerza === 5) {
      carta.daño *= 1.5;
    } else if (fuerza === 6) {
      carta.daño *= 1.6;
    } else if (fuerza === 7) {
      carta.daño *= 1.7;
    } else if (fuerza === 8) {
      carta.daño *= 1.8;
    } else if (fuerza === 9) {
      carta.daño *= 1.9;
    } else if (fuerza >= 10) {
      carta.daño *= 2;
    }
    if (siSalvia && turno > 1) {
      carta.daño += dañoRival * 0.3;
    }
    monstruo.vida -= carta.daño;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (furiaActiva) {
      siEscudo = true;
      cantidadEscudo += 3;
      cantidadEscudo = Math.floor(cantidadEscudo);
      lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
      vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    }
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Uppercut");
    vul = vul + 3;
    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Uppercut"}`);
      ganar();
    }
  }
  //CARTAS DEFENSA
  function escudo(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    if (CincoCopa <= 0) {
      cantidadEscudo += 5;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 5 * 1.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push(carta);
  }
  function cartaTrinchera(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    if (CincoCopa <= 0) {
      cantidadEscudo *= 2;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo *= 2.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Trinchera");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Trinchera"}`);
      ganar();
    }
  }
  function cartaAutoEscudo(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (cantidadEscudo === 0 && CincoCopa <= 0) {
      cantidadEscudo += 11;
      CincoCopa = 0;
      if (dobleSiguiente) {
        mana -= carta.elixir * 0.5;
      } else mana -= carta.elixir;
    } else if (cantidadEscudo === 0 && CincoCopa > 0) {
      cantidadEscudo += 11 * 1.25;
      CincoCopa--;
      if (dobleSiguiente) {
        mana -= carta.elixir * 0.5;
      } else mana -= carta.elixir;
    } else if (cantidadEscudo > 0) tengoEscudo = true;
    siEscudo = true;
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Auto-escudo");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Auto-escudo"}`);
      ganar();
    }
  }
  function cartaProtector(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    if (CincoCopa <= 0) {
      cantidadEscudo += 11;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 11 * 1.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    if (!noRobarMas) {
      sumarCarta();
      noRobarMas = false;
    }
    mazorobar.push("Protector");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Protector"}`);
      ganar();
    }
  }

  function cartaHeroico(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    if (CincoCopa <= 0) {
      cantidadEscudo += 30;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 30 * 1.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    info.vida -= 6;
    if (info.vida < 0) info.vida = 0;
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Heroico");
    mostrar();

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Heroico"}`);
      ganar();
    }
  }
  function cartaMutacion(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    cantidadEscudo += 1;
    siEscudo = true;
    siMutacion = true;
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    //mazorobar.push("Mutación");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Mutación"}`);
      ganar();
    }
  }
  function cartaEstrategiaDefensiva(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    if (CincoCopa <= 0) {
      cantidadEscudo += 3;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 3 * 1.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    siEstrategia = true;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Estrategia defensiva");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Estrategia defensiva"}`);
      ganar();
    }
  }
  function cartaDefensaEnPlacas(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    siDefensaPlacas = true;
    defensaPlacasTurno = 3;
    console.log(turno + "turno actual");
    if (CincoCopa <= 0) {
      cantidadEscudo += 5;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 5 * 1.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    console.log(cantidadEscudo);
    mazorobar.push("Defensa en placas");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Defensa en placas"}`);
      ganar();
    }
  }
  function cartaCopa(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    CincoCopa = 4;
    if (CincoCopa <= 0) {
      cantidadEscudo += 3;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 3 * 1.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Copa");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Copa"}`);
      ganar();
    }
  }
  function cartaEspadasOrbitantes(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    siEspadasOrbitantes = true;
    espadasOrbitantesTurno = 1;
    console.log(turno + "turno actual");
    if (CincoCopa <= 0) {
      cantidadEscudo += 10;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 10 * 1.25;
      CincoCopa--;
    }
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Espadas orbitantes");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Espadas orbitantes"}`);
      ganar();
    }
  }

  // CARTAS APOYO
  function cartaFlexionar(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    fuerza += 2;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Flexionar");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Flexionar"}`);
      ganar();
    }
  }
  function cartaRitual(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    info.vida -= 6;
    if (info.vida < 0) info.vida = 0;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    mana += 2;
    vidaP.textContent = `PV: ${info.vida}/${info.vidamax}`;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Ritual");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Ritual"}`);
      ganar();
    }
  }
  function cartaDobleAtaque(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    dobleSiguiente = true;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Doble ataque");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Doble ataque"}`);
      ganar();
    }
  }
  function cartaFuria(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    furiaActiva = true;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Furia");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Furia"}`);
      ganar();
    }
  }

  function cartaColumnaSuertuda(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    if (!noRobarMas) {
      sumarCarta();
      sumarCarta();
      sumarCarta();
      noRobarMas = false;
    }

    noRobarMas = true;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Columna suertuda");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Columna suertuda"}`);
      ganar();
    }
  }

  function cartaAtaqueAncestral(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    agregarAtaqueGratis();
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Ataque ancestral");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Ataque ancestral"}`);
      ganar();
    }
  }

  function cartaDebilidad(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    vul += 2;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Debilidad");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Debilidad"}`);
      ganar();
    }
  }

  function cartaBarricada(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    escudoQueda = true;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Barricada");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Barricada"}`);
      ganar();
    }
  }

  function cartaGolpeDeCuerpo(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    monstruo.vida -= cantidadEscudo;
    if (monstruo.vida < 0) monstruo.vida = 0;
    vidaM.textContent = "PV:" + monstruo.vida + "/" + monstruo.vidamax;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Golpe de cuerpo");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Golpe de cuerpo"}`);
      ganar();
    }
  }

  function cartaIgnorar(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    siEscudo = true;
    if (CincoCopa <= 0) {
      cantidadEscudo += 8;
      CincoCopa = 0;
    } else if (CincoCopa > 0) {
      cantidadEscudo += 8 * 1.25;
      CincoCopa--;
    }
    cantidadEscudo = Math.floor(cantidadEscudo);
    lugarEscudo.textContent = "Escudo:" + cantidadEscudo;
    vidaP.textContent = `E: ${cantidadEscudo}  PV: ${info.vida}/${info.vidamax}`;
    sumarCarta();
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Ignorar");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Ignorar"}`);
      ganar();
    }
  }

  function cartaLamentoPenetrante(carta) {
    console.log(`Se usó la carta: ${carta.nombre}`);
    lamentoPenetrante = true;
    if (dobleSiguiente) {
      mana -= carta.elixir * 0.5;
    } else mana -= carta.elixir;
    //mana = Math.floor(mana);
    cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
    mazorobar.push("Lamento penetrante");

    if (monstruo.vida <= 0) {
      console.log(`Rival matado por ${"Lamento penetrante"}`);
      ganar();
    }
  }

  function sacarCarta() {
    if (tengoEscudo === false) {
      let cartaEliminar = event.target;
      console.log(cartaEliminar.classList[0]);
      if (cartaEliminar.classList[0] === "carta1B") {
        let carta2 = document.getElementsByClassName("carta2B");
        let carta3 = document.getElementsByClassName("carta3B");
        let carta4 = document.getElementsByClassName("carta4B");
        let carta5 = document.getElementsByClassName("carta5B");
        let carta6 = document.getElementsByClassName("carta6B");
        let carta7 = document.getElementsByClassName("carta7B");
        let carta8 = document.getElementsByClassName("carta8B");
        let carta9 = document.getElementsByClassName("carta9B");
        Array.from(carta2).forEach((element) => {
          element.classList.remove("carta2B");
          element.classList.add("carta1B");
        });
        Array.from(carta4).forEach((element) => {
          element.classList.remove("carta4B");
          element.classList.add("carta2B");
        });
        Array.from(carta6).forEach((element) => {
          element.classList.remove("carta6B");
          element.classList.add("carta4B");
        });
        Array.from(carta8).forEach((element) => {
          element.classList.remove("carta8B");
          element.classList.add("carta6B");
        });
      }
      if (cartaEliminar.classList[0] === "carta2") {
        let carta1 = document.getElementsByClassName("carta1B");
        let carta3 = document.getElementsByClassName("carta3B");
        let carta4 = document.getElementsByClassName("carta4B");
        let carta5 = document.getElementsByClassName("carta5B");
        let carta6 = document.getElementsByClassName("carta6B");
        let carta7 = document.getElementsByClassName("carta7B");
        let carta8 = document.getElementsByClassName("carta8B");
        let carta9 = document.getElementsByClassName("carta9B");
        Array.from(carta4).forEach((element) => {
          element.classList.remove("carta4B");
          element.classList.add("carta2B");
        });
        Array.from(carta6).forEach((element) => {
          element.classList.remove("carta6B");
          element.classList.add("carta4B");
        });
        Array.from(carta8).forEach((element) => {
          element.classList.remove("carta8B");
          element.classList.add("carta6B");
        });
      }
      if (cartaEliminar.classList[0] === "carta3B") {
        let carta1 = document.getElementsByClassName("carta1B");
        let carta2 = document.getElementsByClassName("carta2B");
        let carta4 = document.getElementsByClassName("carta4B");
        let carta5 = document.getElementsByClassName("carta5B");
        let carta6 = document.getElementsByClassName("carta6B");
        let carta7 = document.getElementsByClassName("carta7B");
        let carta8 = document.getElementsByClassName("carta8B");
        let carta9 = document.getElementsByClassName("carta9B");
        Array.from(carta5).forEach((element) => {
          element.classList.remove("carta5B");
          element.classList.add("carta3B");
        });
        Array.from(carta7).forEach((element) => {
          element.classList.remove("carta7B");
          element.classList.add("carta5B");
        });
        Array.from(carta9).forEach((element) => {
          element.classList.remove("carta9B");
          element.classList.add("carta7B");
        });
      }
      if (cartaEliminar.classList[0] === "carta4") {
        let carta1 = document.getElementsByClassName("carta1B");
        let carta2 = document.getElementsByClassName("carta2B");
        let carta3 = document.getElementsByClassName("carta3B");
        let carta5 = document.getElementsByClassName("carta5B");
        let carta6 = document.getElementsByClassName("carta6B");
        let carta7 = document.getElementsByClassName("carta7B");
        let carta8 = document.getElementsByClassName("carta8B");
        let carta9 = document.getElementsByClassName("carta9B");
        Array.from(carta6).forEach((element) => {
          element.classList.remove("carta6B");
          element.classList.add("carta4B");
        });
        Array.from(carta8).forEach((element) => {
          element.classList.remove("carta8B");
          element.classList.add("carta6B");
        });
      }
      if (cartaEliminar.classList[0] === "carta5B") {
        let carta1 = document.getElementsByClassName("carta1B");
        let carta2 = document.getElementsByClassName("carta2B");
        let carta3 = document.getElementsByClassName("carta3B");
        let carta4 = document.getElementsByClassName("carta4B");
        let carta6 = document.getElementsByClassName("carta6B");
        let carta7 = document.getElementsByClassName("carta7B");
        let carta8 = document.getElementsByClassName("carta8B");
        let carta9 = document.getElementsByClassName("carta9B");
        Array.from(carta7).forEach((element) => {
          element.classList.remove("carta7B");
          element.classList.add("carta5B");
        });
        Array.from(carta6).forEach((element) => {
          element.classList.remove("carta9B");
          element.classList.add("carta7B");
        });
      }
      if (cartaEliminar.classList[0] === "carta6B") {
        let carta1 = document.getElementsByClassName("carta1B");
        let carta2 = document.getElementsByClassName("carta2B");
        let carta3 = document.getElementsByClassName("carta3B");
        let carta4 = document.getElementsByClassName("carta4B");
        let carta5 = document.getElementsByClassName("carta5B");
        let carta7 = document.getElementsByClassName("carta7B");
        let carta8 = document.getElementsByClassName("carta8B");
        let carta9 = document.getElementsByClassName("carta9B");
        Array.from(carta8).forEach((element) => {
          element.classList.remove("carta8B");
          element.classList.add("carta6B");
        });
      }
      if (cartaEliminar.classList[0] === "carta7") {
        let carta1 = document.getElementsByClassName("carta1B");
        let carta2 = document.getElementsByClassName("carta2B");
        let carta3 = document.getElementsByClassName("carta3B");
        let carta4 = document.getElementsByClassName("carta4B");
        let carta5 = document.getElementsByClassName("carta5B");
        let carta6 = document.getElementsByClassName("carta6B");
        let carta8 = document.getElementsByClassName("carta8B");
        let carta9 = document.getElementsByClassName("carta9B");
        Array.from(carta9).forEach((element) => {
          element.classList.remove("carta9B");
          element.classList.add("carta7B");
        });
      }

      cartaEliminar.remove();
    }
  }
  console.log(boton);

  boton.addEventListener("click", finalizarTurno);

  let imagenes = [
    "../Cosas/fondo1.png",
    "../Cosas/fondo2.jpg",
    "../Cosas/fondo3.jpg",
    "../Cosas/fondo4.jpg",
  ];
  let monstruosNormal = [
    "../Cosas/Monstruos/slime.png",
    "../Cosas/Monstruos/huevo.png",
  ];
  let monstruosElite = [
    "../Cosas/Monstruos/elite-1.png",
    "../Cosas/Monstruos/elite-2.png",
  ];

  function Fondos() {
    const random = Math.floor(Math.random() * imagenes.length);
    document.body.style.backgroundImage = `url(${imagenes[random]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }
  function fotoMonstruos() {
    const random = Math.floor(Math.random() * monstruosNormal.length);
    fotoM.style.backgroundImage = `url(${monstruosNormal[random]})`;
    fotoM.style.backgroundSize = "contain";
    fotoM.style.backgroundRepeat = "no-repeat";
    fotoM.style.width = "65%";
    fotoM.style.height = "65%";
    cajaMonstruo.style.aspectRatio = "1";
    cajaMonstruo.style.width = "none";
    contenedor.style.top = "6vh";
  }
  function fotoMonstruosElite() {
    const random = Math.floor(Math.random() * monstruosElite.length);
    fotoM.style.backgroundImage = `url(${monstruosElite[random]})`;
    fotoM.style.backgroundSize = "contain";
    fotoM.style.backgroundRepeat = "no-repeat";
    contenedor.style.bottom = "2vh";
    console.log("monstruo N " + random);
    if (random === 1) {
      cajaMonstruo.style.aspectRatio = "none";
      cajaMonstruo.style.width = "44%";
    } else {
      cajaMonstruo.style.aspectRatio = "8/12";
      cajaMonstruo.style.width = "none";
      cajaMonstruo.style.height = "40vh";
    }
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
    /*lugarRecompensas.style.backgroundColor = "white";
    cajaBatalla.style.display = "none";
    LugarCartas.style.display = "none";
    LugarCartas.style.background = "none";
    lugarReliquias.style.display = "none";
    lugarReliquias.style.background = "none";
    document.body.style.background = "none";*/
    //omitir.style.display = "flex";
    const modal = document.querySelector("[data-modal]");
    modal.showModal();
    if (monstruo.tipo === "normal") {
      for (let i = 1; i < 3; i++) {
        let contenedorRecompensa = document.getElementById(
          "contenedorRecompensas"
        );
        let nuevaRecompensa = document.createElement("div");
        nuevaRecompensa.classList.add("recompensa");
        nuevaRecompensa.id = `recompensa${i}`;
        if (i === 1) nuevaRecompensa.textContent = `Oro: ${ganancia}`;
        else if (i === 2) nuevaRecompensa.textContent = `Escoge una carta`;
        contenedorRecompensa.appendChild(nuevaRecompensa);
      }
      let recompensa2 = document.getElementById("recompensa2");
      recompensa2.style.cursor = "var(--pointer)";
      recompensa2.addEventListener("click", irSeleccion);
    } else if (monstruo.tipo === "elite") {
      getEvent("reliquia-elite", (data) => {
        reliquiaElite1 = data.reliquia;
        console.log("Reliquia de Elite ganada: ", reliquiaElite1);
      });

      if (!siBlack) {
        setTimeout(() => {
          for (let i = 1; i <= 3; i++) {
            let contenedorRecompensa = document.getElementById(
              "contenedorRecompensas"
            );
            let nuevaRecompensa = document.createElement("div");
            nuevaRecompensa.classList.add("recompensa");
            nuevaRecompensa.id = `recompensa${i}`;

            if (i === 1) nuevaRecompensa.textContent = `Oro: ${ganancia}`;
            else if (i === 2)
              nuevaRecompensa.textContent = `${reliquiaElite1.nombre}`;
            else nuevaRecompensa.textContent = `Escoge una carta`;
            contenedorRecompensa.appendChild(nuevaRecompensa);
          }
          let recompensa3 = document.getElementById("recompensa3");
          recompensa3.style.cursor = "var(--pointer)";
          recompensa3.addEventListener("click", irSeleccion);
        }, 100);
      } else {
        getEvent("reliquia-elite", (data) => {
          reliquiaElite2 = data.reliquia;
          console.log("Reliquia de Elite ganada: ", reliquiaElite2);
        });
        setTimeout(() => {
          for (let i = 1; i <= 4; i++) {
            let contenedorRecompensa = document.getElementById(
              "contenedorRecompensas"
            );
            let nuevaRecompensa = document.createElement("div");
            nuevaRecompensa.classList.add("recompensa");
            nuevaRecompensa.id = `recompensa${i}`;

            if (i === 1) nuevaRecompensa.textContent = `Oro: ${ganancia}`;
            else if (i === 2) {
              nuevaRecompensa.textContent = `${reliquiaElite1.nombre}`;
            } else if (i === 3) {
              nuevaRecompensa.textContent = `${reliquiaElite2.nombre}`;
            } else nuevaRecompensa.textContent = `Escoge una carta`;
            contenedorRecompensa.appendChild(nuevaRecompensa);
          }
          let recompensa4 = document.getElementById("recompensa4");
          recompensa4.style.cursor = "var(--pointer)";
          recompensa4.addEventListener("click", irSeleccion);
        }, 100);
      }

      let recompensa3 = document.getElementById("recompensa3");
      recompensa3.style.cursor = "var(--pointer)";
      recompensa3.addEventListener("click", irSeleccion);
    }
  }
  function cofre() {
    cajaMonstruo.style.height = "40vh";
    cajaMonstruo.style.aspectRatio = "1/1";
    cajaMonstruo.style.position = "relative";
    cajaMonstruo.style.top = "15vh";
    fotoM.style.backgroundImage = "url(../Cosas/cofre.png)";
    fotoM.style.backgroundSize = "67%";
    // vidaP.style.display = "none";
    vidaM.style.display = "none";
    setTimeout(() => {
      fotoM.style.backgroundSize = "contain";
      cajaMonstruo.style.top = "6.5vh";
      cajaMonstruo.style.left = "5vh";
      fotoM.style.backgroundImage = "url(../Cosas/cofre-abierto.png)";
      Array.from(eleccionReliquias).forEach((r) => {
        r.style.display = "block";
      });
      getEvent("reliquia-jefe", (data) => {
        const reliquiaJefe1 = data.reliquia1;
        const reliquiaJefe2 = data.reliquia2;
        const reliquiaJefe3 = data.reliquia3;
        const reliquiaJefe4 = data.reliquia4;
        const reliquiaJefe5 = data.reliquia5;

        console.log(reliquiaJefe1);
        console.log(reliquiaJefe2);
        console.log(reliquiaJefe3);
        console.log(reliquiaJefe4);
        console.log(reliquiaJefe5);

        const slotsJefe = [
          { el: reliquia1, data: reliquiaJefe1 },
          { el: reliquia2, data: reliquiaJefe2 },
          { el: reliquia3, data: reliquiaJefe3 },
          { el: reliquia4, data: reliquiaJefe4 },
          { el: reliquia5, data: reliquiaJefe5 },
        ];

        // Array completo de reliquias disponibles
        const todasReliquias = [
          reliquiaJefe1,
          reliquiaJefe2,
          reliquiaJefe3,
          reliquiaJefe4,
          reliquiaJefe5,
        ];

        slotsJefe.forEach(({ el, data }) => {
          if (!el || !data) return;

          // Fondo con imagen
          el.style.backgroundImage = `url('${data.ruta}')`;
          el.style.backgroundSize = "contain";
          el.style.backgroundRepeat = "no-repeat";
          el.style.backgroundPosition = "center";
          el.style.cursor = "var(--pointer, pointer)";

          // Tooltip
          el.dataset.nombre = data.nombre || "";
          el.dataset.efecto = data.efecto || "";
          el.dataset.ruta = data.ruta || "";

          el.addEventListener("mouseenter", () =>
            showFloatingTooltipFromElement(el)
          );
          el.addEventListener("mousemove", (e) =>
            moveFloatingTooltip(e.clientX, e.clientY)
          );
          el.addEventListener("mouseleave", hideFloatingTooltip);

          // Evento de click → devolver las NO elegidas
          el.addEventListener("click", () => {
            hideFloatingTooltip();
            console.log(`Reliquia elegida: ${data.nombre}`);

            postEvent("devolver-reliquias", { reliquias: data.nombre });
            console.log("Reliquia elegida: " + data.nombre);

            el.style.outline = "4px dotted gold";
            el.style.borderRadius = "50%";
            setTimeout(() => (el.style.outline = ""), 500);
            window.location.href = "../2/index2.html";
          });
        });
      });
    }, 800);
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
    /*const modal2 = document.querySelector("[data-modal2]");
    modal2.showModal();
    const modal = document.querySelector("[data-modal]")
    modal.close();*/
    window.location.href = "../seleccion-cartas/index.html";
  }
  cartas.addEventListener("click", mostrarCartas);
  atras.addEventListener("click", volverBatalla);
  atras2.addEventListener("click", volverBatalla);
  //omitir.addEventListener("click", irSeleccion);
  reliquias.addEventListener("click", mostrarReliquias);

  // === TOOLTIP FLOTANTE PARA RELIQUIAS (versión completa) ===

  // Variable global del tooltip activo
  let __floatingTooltip = null;

  // Activa tooltips para todas las reliquias mostradas
  function activarTooltipsReliquias() {
    const reliquiasDivs = document.querySelectorAll("#cajaReliquias .todas");

    reliquiasDivs.forEach((div, i) => {
      const data = reliquia[i];
      if (!data) return;

      div.dataset.nombre = data.nombre || "";
      div.dataset.efecto = data.efecto || "";
      div.dataset.ruta = data.ruta || "";

      div.addEventListener("mouseenter", () =>
        showFloatingTooltipFromElement(div)
      );
      div.addEventListener("mousemove", (e) =>
        moveFloatingTooltip(e.clientX, e.clientY)
      );
      div.addEventListener("mouseleave", hideFloatingTooltip);
    });
  }

  // Crear y mostrar el tooltip
  function showFloatingTooltipFromElement(el) {
    hideFloatingTooltip();

    const nombre = el.dataset.nombre || "";
    const efecto = el.dataset.efecto || "";
    const ruta = el.dataset.ruta || "";

    __floatingTooltip = document.createElement("div");
    __floatingTooltip.className = "tooltip-floating";
    __floatingTooltip.innerHTML = `
    <div class="tooltip-header">
      <div class="tooltip-title">${escapeHtml(nombre)}</div>
    </div>
    <div class="tooltip-body">${escapeHtml(efecto)}</div>
  `;

    document.body.appendChild(__floatingTooltip);
    __floatingTooltip.style.opacity = "0";

    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.bottom + 12;
    const left = window.scrollX + rect.left + rect.width / 2;

    __floatingTooltip.style.left = `${left}px`;
    __floatingTooltip.style.top = `${top}px`;

    requestAnimationFrame(() => {
      __floatingTooltip.style.opacity = "1";
    });
  }

  // Mueve el tooltip con el mouse
  function moveFloatingTooltip(clientX, clientY) {
    if (!__floatingTooltip) return;
    const tooltipRect = __floatingTooltip.getBoundingClientRect();
    let left = clientX + 16;
    let top = clientY + 16;
    const maxLeft =
      window.scrollX +
      document.documentElement.clientWidth -
      tooltipRect.width -
      8;
    const maxTop =
      window.scrollY +
      document.documentElement.clientHeight -
      tooltipRect.height -
      8;
    __floatingTooltip.style.left = `${Math.min(left, maxLeft)}px`;
    __floatingTooltip.style.top = `${Math.min(top, maxTop)}px`;
  }

  // Oculta el tooltip
  function hideFloatingTooltip() {
    if (!__floatingTooltip) return;
    __floatingTooltip.remove();
    __floatingTooltip = null;
  }

  // Escapar HTML para evitar errores o inyección
  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Llama automáticamente después de renderizar reliquias
  const oldMostrarReliquia = mostrarReliquia;
  mostrarReliquia = function () {
    oldMostrarReliquia();
    setTimeout(activarTooltipsReliquias, 100); // espera un instante a que se inserten en el DOM
  };
});

/*
function cartaVerdaderoValor() {
  mana -= 1;
  cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
  mazorobar.push("Verdadero valor");

  if (monstruo.vida <= 0) {
    console.log(`Rival matado por ${"Verdadero valor"}`);
    ganar();
  }
}

function cartaSegundoAliento() {
  let noAtaque = cartasmano.filter(c => c.tipo !== "ataque");
  mana += 5 * noAtaque.length;
  if (mana > manaMax) mana = manaMax;
  cajaMana.innerHTML = `<h1>${mana}/${manaMax}</h1>`;
  mazorobar.push("Segundo aliento");

  if (monstruo.vida <= 0) {
    console.log(`Rival matado por ${"Segundo aliento"}`);
    ganar();
  }
}*/
