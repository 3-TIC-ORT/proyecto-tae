window.addEventListener("DOMContentLoaded", () => {
  let cama = document.getElementById("cama");
  let mina = document.getElementById("mina");
  let act = document.getElementById("axion");
  let oro = document.getElementById("oro");
  let vida = document.getElementById("vida");
  let mapa = document.getElementById("mapa");
  let reliquias = document.getElementById("reliquias");
  let cartas = document.getElementById("cartas");
  let titulo = document.getElementById("titulo");
  let cajaBatalla = document.getElementById("batalla");
  let lugarReliquias = document.getElementById("LugarReliquias");
  let atras = document.getElementById("atras");
  let atras2 = document.getElementById("atras2");
  let circCartas = document.getElementById("circulo-cartas");
  let circReliquias = document.getElementById("circulo-reliquias");
  let container = document.getElementById("container");
  let vidaPersonaje;
  let reliquiaInicial = {};
  let reliquia = [];
  mina.disabled = false;
  cama.disabled = false;
  const min = 50;
  const max = 115;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randomNumber);

  let info = {};

  connect2Server();

  getEvent("fogata", (data) => {
    info = {
      oro: data.oro,
      vida: data.vida,
      vidamax: data.vidamax,
      mapa: data.mapa,
    };
    console.log(info);
    mostrar();
  });

  getEvent("personaje", (data) => {
    let personaje = data;

    if (personaje === "mago") {
      container.style.backgroundImage = "Url(../Cosas/fogata-mago.png)";
    } else if (personaje === "jon") {
      container.style.backgroundImage = "Url(../Cosas/fogata-lawyer.png)";
    } else if (personaje === "bear") {
      container.style.backgroundImage = "Url(../Cosas/fogata-bear.png)";
    } else if (personaje === "pick") {
      container.style.backgroundImage = "Url(../Cosas/fogata-pick.png)";
    } else {
      container.style.backgroundColor = "blue";
    }
  });
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
      if (mazo[i].nombre === "Verdadero valor") {
        nuevaCarta.classList.add("carta-verdaderoValor");
      }
      if (mazo[i].nombre === "Segundo aliento") {
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
      if (mazo[i].nombre === "Columna suertuda") {
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

  getEvent("reliquia", (data) => {
    reliquia = data;
    console.log("Reliquias recibidas:", reliquia);
    console.log(reliquia[0]);
    mostrarReliquia();
    reliquiaInicial = reliquia[0].nombre;
    console.log(reliquiaInicial);
  });

  getEvent("mazo", (data) => {
    mazo = data;
    console.log("Mazo recibido:", mazo);
    mostrarMazo();
  });

  function mostrar() {
    vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
    oro.textContent = `Oro: ${info.oro}`;
  }

  function hoverCama() {
    act.textContent = "Cura un 30% de tu PV";
  }

  function hoverMina() {
    act.textContent = "Consigue oro, la cantidad puede ser entre 50 y 115";
  }

  function irMapa() {
    window.location.href = "../mapa/index.html";
  }

  function clickMina() {
    info.oro = info.oro += randomNumber;
    postEvent("fogata", {
      oro: info.oro,
      vida: info.vida,
      vidamax: info.vidamax,
    });
    mostrar();
    mina.disabled = true;
    cama.disabled = true;
    const nodoActual = sessionStorage.getItem("nodoGanado");
    if (nodoActual) {
      // Mantener el mismo valor, el mapa lo usará al recargar
      sessionStorage.setItem("nodoGanado", nodoActual);
    }
    setTimeout(() => {
      irMapa();
    }, 1000);
  }
  function clickCama() {
    console.log(info.vida);
    if (info.vida < info.vidamax) {
      info.vida = info.vida + info.vida * 0.3;
      info.vida = Math.floor(info.vida);
      info.vida = info.vida;
      console.log(info.vida);
      if (info.vida >= info.vidamax) {
        console.log(info.vida);
        info.vida = info.vidamax;
        info.vida = info.vida;
        console.log(info.vida);
      }
      postEvent("fogata", {
        oro: info.oro,
        vida: info.vida,
        vidamax: info.vidamax,
      });
      cama.disabled = true;
      mina.disabled = true;
      console.log(info.vida + "/" + info.vidamax);
      mostrar();

      const nodoActual = sessionStorage.getItem("nodoGanado");
      if (nodoActual) {
        sessionStorage.setItem("nodoGanado", nodoActual);
      }

      setTimeout(() => {
        irMapa();
      }, 1000);
    } else {
      alert("Vida maxima, no se puede curar.");
    }
  }

  function nada() {
    act.textContent = "";
  }

  function irReliquia() {
    window.location.href = "../menu-reliquias/reliquias.html";
  }
  function irCarta() {
    window.location.href = "../cartas/index.html";
  }

  cama.addEventListener("mouseover", hoverCama);
  mina.addEventListener("mouseover", hoverMina);
  cama.addEventListener("mouseleave", nada);
  mina.addEventListener("mouseleave", nada);
  cama.addEventListener("click", clickCama);
  mina.addEventListener("click", clickMina);

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
