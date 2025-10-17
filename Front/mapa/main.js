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
  // Obtener h1 para el nombre del personaje
  let h1 = document.querySelector("h1");
  if (!h1) return console.error("No se encontró el elemento <h1>");

  connect2Server();

  let salida = document.getElementById("salida");
  let pisosContainer = document.getElementById("pisos-container");
  let svg = document.getElementById("conecciones");
  let container = document.getElementById("container-mapa");

  let dataMapa = {}; // para almacenar datos del mapa
  let nodosDesbloqueados = new Set(); // nodos desbloqueados inicialmente

  pisosContainer.innerHTML = "";
  svg.innerHTML = "";

  // 🔸 Cargar mapa desde servidor
  getEvent(`mapa?cantidadpisos=${7}`, (data) => {
    dataMapa = data;
    inicializarMapa(data);
    rendermapa(data);
    salida.innerText = JSON.stringify(data, null, 2);

    // ✅ Revisar si venimos de batalla y desbloquear nodos
    let nodoGanado = sessionStorage.getItem("nodoGanado");
    if (nodoGanado) {
      desbloquearConectados(nodoGanado);
      sessionStorage.removeItem("nodoGanado");
    }
  });

  // Inicializar nodos desbloqueados (primer piso)
  function inicializarMapa(data) {
    data.grafo.forEach((piso, pisoIndex) => {
      piso.forEach((nodo) => {
        if (pisoIndex === 0) nodosDesbloqueados.add(nodo);
      });
    });
  }

  // Renderizar mapa
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

        // Tipo de nodo
        let tipo = "M";
        if (nodo === "Final Boss") {
          div.classList.add("finalBoss");
          div.textContent = "B";
          tipo = "final";
        } else {
          let partes = nodo.split(" ");
          if (partes.length === 2) {
            tipo = partes[1];
            div.classList.add(tipo);
            div.textContent = tipo;
          }
        }

        // ✅ Evento solo si está desbloqueado
        if (nodosDesbloqueados.has(nodo)) {
          div.classList.add("desbloqueado");
          div.addEventListener("click", () => {
            sessionStorage.setItem("nodoGanado", nodo);
            window.location.href = "../batalla/batalla.html";
          });
        } else {
          div.classList.add("bloqueado");
        }

        fila.appendChild(div);

        // Posición para conexiones
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

    // Dibujar conexiones
    setTimeout(() => {
      data.conexiones.forEach(([origen, destino]) => {
        if (posiciones[origen] && posiciones[destino]) {
          let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
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

  // Desbloquear nodos conectados al nodo ganado
  function desbloquearConectados(nodoGanado) {
    if (!dataMapa.conexiones) return; // evita error si aún no hay conexiones
    dataMapa.conexiones.forEach(([origen, destino]) => {
      if (origen === nodoGanado) nodosDesbloqueados.add(destino);
      if (destino === nodoGanado) nodosDesbloqueados.add(origen);
    });
    rendermapa(dataMapa);
  }

  // Botones fogata y batalla
  let fogata = document.getElementById("fogata");
  let batalla = document.getElementById("batalla");

  fogata.addEventListener("click", () => window.location.href = "../fogata/index.html");
  batalla.addEventListener("click", () => window.location.href = "../batalla/batalla.html");

  // Evento personaje
  getEvent("personaje", (data) => {
    let personaje = data;

    if (personaje === "mago") {
      h1.style.fontFamily = "Galdeano, sans-serif";
      h1.textContent = "The Magician";
      h1.style.color = "black";
      h1.style.fontSize = "12rem";
    } else if (personaje === "jon") {
      h1.textContent = "The Lawyer";
      h1.style.fontSize = "13rem";
      h1.style.fontFamily = "Galdeano, sans-serif";
    } else if (personaje === "bear") {
      h1.textContent = "The Bear";
      h1.style.fontFamily = "Sedgwick Ave Display, cursive";
      h1.style.color = "#D52CB0";
      h1.style.fontSize = "13rem";

      let nodos = document.querySelectorAll(".nodo");
      nodos.forEach(n => n.classList.add("nodoBear"));
    } else if (personaje === "pick") {
      h1.style.fontFamily = "EB Garamond, serif";
      h1.textContent = "The Pickpocket";
      h1.style.color = "black";
      h1.style.fontSize = "6rem";
      h1.style.backgroundImage = "url('../Cosas/bala.png')";
      let nodos = document.querySelectorAll(".nodo");
      nodos.forEach(n => n.classList.add("nodoPick"));
    } else {
      h1.textContent = personaje;
    }
  });
});
