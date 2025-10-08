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

  connect2Server();

  let salida = document.getElementById("salida");
  let pisosContainer = document.getElementById("pisos-container");
  let svg = document.getElementById("conecciones");
  let container = document.getElementById("container-mapa");

  pisosContainer.innerHTML = "";
  svg.innerHTML = "";

  getEvent(`mapa?cantidadpisos=${7}`, (data) => {
    salida.innerText = JSON.stringify(data, null, 2);
    rendermapa(data);
  });

  function rendermapa(data) {
    pisosContainer.innerHTML = "";
    svg.innerHTML = "";

    let posiciones = {};

    data.grafo.forEach((piso, pisoIndex) => {
      let fila = document.createElement("div");
      fila.className = "piso";

      piso.forEach((nodo, nodoIndex) => {
        let div = document.createElement("div");
        div.classList.add("nodo");
        div.dataset.nodo = nodo; // para identificarlo

        let tipo = "M";
        let texto = nodo;

        if (nodo === "Final Boss") {
          div.classList.add("finalBoss");
          div.textContent = "B";
          tipo = "final";
          texto = "Final Boss";
        } else {
          let partes = nodo.split(" ");
          if (partes.length === 2) {
            tipo = partes[1];
            div.classList.add(tipo);
            div.textContent = tipo;
            texto = nodo;
          }
        }

        fila.appendChild(div);

        // calcular posición relativa
        setTimeout(() => {
          let rect = div.getBoundingClientRect();
          let parentRect = container.getBoundingClientRect();
          posiciones[texto] = {
            x: rect.left + rect.width / 2 - parentRect.left,
            y: rect.top + rect.height / 2 - parentRect.top,
          };
        }, 50);
      });

      container.appendChild(fila);
    });

    // dibujar conexiones
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

  let fogata = document.getElementById("fogata");
  let batalla = document.getElementById("batalla");

  fogata.addEventListener("click", () => window.location.href = "../fogata/index.html");
  batalla.addEventListener("click", () => window.location.href = "../batalla/batalla.html");

  // evento personaje
  getEvent("personaje", (data) => {
    let personaje = data;

    if (personaje === "mago") {
      h1.style.fontFamily = "Galdeano, sans-serif";
      h1.textContent = "The Magician";
      h1.style.color = "black";
      h1.style.fontSize = "12rem";
    } else if (personaje === "jon") {
      h1.textContent = "Warrior";
    } else if (personaje === "bear") {
      h1.textContent = "The Bear";
      h1.style.fontFamily = "Sedgwick Ave Display, cursive";
      h1.style.color = "#D52CB0";
      h1.style.fontSize = "13rem";

      // agregar clase a todos los nodos
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
