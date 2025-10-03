function abajo() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, 500);
}

window.onload = abajo();
window.addEventListener("DOMContentLoaded", () => {
  // Obtener el elemento h1 una vez que el DOM esté listo
  let h1 = document.querySelector("h1");
  if (!h1) {
    console.error("No se encontró el elemento <h1> en el DOM");
    return;
  }

  // Conectar al servidor
  connect2Server();

  // Escuchar evento 'personaje'
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
      h1.style.fontWeight = "400";
      h1.style.fontStyle = "normal";
      h1.style.color = "#D52CB0";
      h1.style.fontSize = "13rem";
    } else if (personaje === "pick") {
      h1.style.fontFamily = "EB Garamond, serif";
      h1.textContent = "The Pickpocket";
      h1.style.color = "black";
      h1.style.fontSize = "6rem";
      h1.style.backgroundImage = "url('../Cosas/bala.png')";
    } else {
      h1.textContent = personaje;
    }
  });

  // Variables para otros elementos
  let salida = document.getElementById("salida");
  let pisosContainer = document.getElementById("pisos-container");
  let svg = document.getElementById("conecciones");

  pisosContainer.innerHTML = "";
  svg.innerHTML = "";

  // Escuchar evento para el mapa
  getEvent(`mapa?cantidadpisos=${7}`, (data) => {
    salida.innerText = JSON.stringify(data, null, 2);
    rendermapa(data);
  });

  function rendermapa(data) {
    let container = document.getElementById("container-mapa");
    let svg = document.getElementById("conecciones");
    pisosContainer.innerHTML = "";
    svg.innerHTML = "";

    let posiciones = {};

    data.grafo.forEach((piso) => {
      let fila = document.createElement("div");
      fila.className = "piso";

      piso.forEach((nodo) => {
        let div = document.createElement("div");
        div.className = "nodo";
        let tipo = "M";
        let texto = nodo;

        if (nodo === "Final Boss") {
          div.className = "finalBoss";
          div.textContent = "B";
          tipo = "final";
          texto = "Final Boss";
        } else {
          let partes = nodo.split(" ");
          if (partes.length === 2) {
            tipo = partes[1];
            div.className = "nodo " + tipo;
            div.textContent = tipo;
            texto = nodo;
          }
        }

        fila.appendChild(div);

        // Calcular posición relativa al container
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

    // Dibujar las conexiones con SVG
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
});

let fogata = document.getElementById("fogata");
function ir(){
  window.location.href = "../fogata/index.html"
}
fogata.addEventListener("click", ir);
