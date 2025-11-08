function abajo() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, 500);
}

window.onload = abajo;

window.addEventListener("DOMContentLoaded", () => {
  
  let h1 = document.querySelector("h1");
  if (!h1) return console.error("No se encontró el elemento <h1>");

  let salida = document.getElementById("salida");
  let pisosContainer = document.getElementById("pisos-container");
  let svg = document.getElementById("conecciones");
  let container = document.getElementById("container-mapa");

  let dataMapa = {};
  let nodosDesbloqueados = new Set();

  const nodosGuardados = sessionStorage.getItem("nodosDesbloqueados");
  if (nodosGuardados) {
    try {
      const arr = JSON.parse(nodosGuardados);
      arr.forEach((n) => nodosDesbloqueados.add(n));
    } catch (e) {
      console.warn("No se pudo parsear nodosDesbloqueados:", e);
      sessionStorage.removeItem("nodosDesbloqueados");
    }
  }

  pisosContainer.innerHTML = "";
  svg.innerHTML = "";

  const mapaGuardado = sessionStorage.getItem("mapData");
  if (mapaGuardado) {
    try {
      dataMapa = JSON.parse(mapaGuardado);
      inicializarMapa(dataMapa);
      rendermapa(dataMapa);
      salida.innerText = JSON.stringify(dataMapa, null, 2);

      let nodoGanado = sessionStorage.getItem("nodoGanado");
      if (nodoGanado) {
        desbloquearConectados(nodoGanado);
        sessionStorage.removeItem("nodoGanado");
      }

      let nodoFogata = sessionStorage.getItem("nodoFogata");
      if (nodoFogata) {
        desbloquearConectados(nodoFogata);
        sessionStorage.removeItem("nodoFogata");
      }
      let nodoMercado = sessionStorage.getItem("nodoMercado");
      if (nodoMercado) {
        desbloquearConectados(nodoMercado);
        sessionStorage.removeItem("nodoMercado");
      }
    } catch (e) {
      console.warn("Error parseando mapaGuardado, se pedirá al servidor:", e);
      sessionStorage.removeItem("mapData");
    }
  }

  if (!mapaGuardado) {
    getEvent(`mapa?cantidadpisos=${5}`, (data) => {
      dataMapa = data;
      try {
        sessionStorage.setItem("mapData", JSON.stringify(dataMapa));
      } catch (e) {
        console.warn("No se pudo guardar mapData en sessionStorage:", e);
      }
      inicializarMapa(data);
      rendermapa(data);
      salida.innerText = JSON.stringify(data, null, 2);

      let nodoGanado = sessionStorage.getItem("nodoGanado");
      if (nodoGanado) {
        desbloquearConectados(nodoGanado);
        sessionStorage.removeItem("nodoGanado");
      }
    });
  }

  function inicializarMapa(data) {
    data.grafo.forEach((piso, pisoIndex) => {
      piso.forEach((nodo) => {
        if (pisoIndex === 0) nodosDesbloqueados.add(nodo);
      });
    });
    try {
      if (!sessionStorage.getItem("nodosDesbloqueados")) {
        sessionStorage.setItem(
          "nodosDesbloqueados",
          JSON.stringify([...nodosDesbloqueados])
        );
      }
    } catch (e) {
      console.warn("No se pudo guardar nodosDesbloqueados:", e);
    }
  }

  // 🔥 ACÁ ESTÁ LA MODIFICACIÓN
  function rendermapa(data) {
    pisosContainer.innerHTML = "";
    svg.innerHTML = "";

    let posiciones = {};

    data.grafo.forEach((piso) => {
      let fila = document.createElement("div");
      fila.className = "piso";

      piso.forEach((nodo) => {
        let div = document.createElement("div");
        div.classList.add("nodo");
        div.dataset.nodo = nodo;

        let tipo = "M";
        if (nodo === "Final Boss") {
          div.classList.add("finalBoss");
          div.textContent = "B";
          tipo = "B";
        } else {
          let partes = nodo.split(" ");
          if (partes.length === 2) {
            tipo = partes[1];
            div.classList.add(tipo);
            div.textContent = tipo;
          }
        }

        if (nodosDesbloqueados.has(nodo)) {
          div.classList.add("desbloqueado");

          div.addEventListener("click", () => {
            if (!nodosDesbloqueados.has(nodo)) return;
            const nodoLow = String(nodo).toLowerCase();

            // 🔥 Fogata
            if (
              tipo === "F" ||
              nodoLow === "nodof" ||
              nodoLow.includes("nodof") ||
              tipo.toLowerCase() === "fogata"
            ) {
              sessionStorage.setItem("nodoFogata", nodo);
              window.location.href = "../fogata/index.html";
              return;
            }

            // 💰 Mercado / Tienda
            if (
              tipo === "T" ||
              nodoLow === "nodot" ||
              nodoLow.includes("nodot") ||
              tipo.toLowerCase() === "mercado" ||
              tipo.toLowerCase() === "tienda"
            ) {
              sessionStorage.setItem("nodoMercado", nodo);
              window.location.href = "../Mercado/Mercado.html";
              return;
            }

            // ⚔️ Batallas
            if (tipo === "E") {
              sessionStorage.setItem("tipoMonstruo", "elite");
            } else if (tipo === "B" || tipo.toLowerCase().includes("jefe")) {
              sessionStorage.setItem("tipoMonstruo", "jefe");
            } else {
              sessionStorage.setItem("tipoMonstruo", "normal");
            } /*
            if (tipo === "E") {
              postEvent("mounstro", {
                tipo: elite,
              });
            } else if (tipo === "B" || "jefe") {
              postEvent("mounstro", {
                tipo: jefe,
              });
            } else {
              postEvent("mounstro", {
                tipo: normal,
              });
            }*/

            sessionStorage.setItem("nodoGanado", nodo);
            window.location.href = "../batalla/batalla.html";
          });
        } else {
          div.classList.add("bloqueado");
        }

        fila.appendChild(div);

        setTimeout(() => {
          let rect = div.getBoundingClientRect();
          let parentRect = container.getBoundingClientRect();
          posiciones[nodo] = {
            x: rect.left + rect.width / 2 - parentRect.left,
            y: rect.top + rect.height / 2 - parentRect.top,
          };
        }, 50);
      });

      container.appendChild(fila);
    });

    setTimeout(() => {
      data.conexiones.forEach(([origen, destino]) => {
        if (posiciones[origen] && posiciones[destino]) {
          let line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line.setAttribute("x1", posiciones[origen].x);
          line.setAttribute("y1", posiciones[origen].y);
          line.setAttribute("x2", posiciones[destino].x);
          line.setAttribute("y2", posiciones[destino].y);
          line.setAttribute("stroke", "black");
          line.setAttribute("stroke-width", "4");
          svg.appendChild(line);
        }
      });
    }, 100);
  }

  function desbloquearConectados(nodoGanado) {
    if (!dataMapa.conexiones) return;
    let changed = false;
    dataMapa.conexiones.forEach(([origen, destino]) => {
      if (origen === nodoGanado && !nodosDesbloqueados.has(destino)) {
        nodosDesbloqueados.add(destino);
        changed = true;
      }
      if (destino === nodoGanado && !nodosDesbloqueados.has(origen)) {
        nodosDesbloqueados.add(origen);
        changed = true;
      }
    });
    if (changed) {
      try {
        sessionStorage.setItem(
          "nodosDesbloqueados",
          JSON.stringify([...nodosDesbloqueados])
        );
      } catch (e) {
        console.warn("No se pudo persistir nodosDesbloqueados:", e);
      }
    }
    rendermapa(dataMapa);
    location.reload();
  }

  let fogata = document.getElementById("fogata");
  let batalla = document.getElementById("batalla");

  fogata.addEventListener(
    "click",
    () => (window.location.href = "../fogata/index.html")
  );
  batalla.addEventListener(
    "click",
    () => (window.location.href = "../batalla/batalla.html")
  );

  getEvent("personaje", (data) => {
    let personaje = data;

    if (personaje === "mago") {
      h1.style.fontFamily = "Galdeano, sans-serif";
      h1.textContent = "The Magician";
      h1.style.color = "black";
      h1.style.fontSize = "12rem";
      h1.style.backgroundImage =
        "url('../Cosas/meteorite-or-fire-ball-illustration-png_1-removebg-preview.png')";

      document
        .querySelectorAll(".nodo")
        .forEach((n) => n.classList.add("nodoMago"));
      document.body.classList.add("mago-background-global");
      let containerMapa = document.getElementById("container-mapa");
      containerMapa.classList.add("mago-imagen-container");
    } else if (personaje === "jon") {
      h1.textContent = "The Lawyer";
      h1.style.fontSize = "13rem";
      h1.style.fontFamily = "Galdeano, sans-serif";
    } else if (personaje === "bear") {
      h1.textContent = "The Bear";
      h1.style.fontFamily = "Sedgwick Ave Display, cursive";
      h1.style.color = "#D52CB0";
      h1.style.fontSize = "13rem";
      document
        .querySelectorAll(".nodo")
        .forEach((n) => n.classList.add("nodoBear"));
    } else if (personaje === "pick") {
      h1.style.fontFamily = "EB Garamond, serif";
      h1.textContent = "The Pickpocket";
      h1.style.color = "white";
      h1.style.fontSize = "6rem";
      h1.style.backgroundImage = "url('../Cosas/pickpocket.png')";
      document
        .querySelectorAll(".nodo")
        .forEach((n) => n.classList.add("nodoPick"));
      document.body.classList.add("pick-background-global");
      let containerMapa = document.getElementById("container-mapa");
      containerMapa.classList.add("pick-imagen-container");
    } else {
      h1.textContent = personaje;
    }
  });
});

  connect2Server();
  getEvent("jefe-reliquia", (data) => {
    if (data === undefined) {
      return;
    } else {
      postEvent("agregar-reliquia", data);
    }
  });