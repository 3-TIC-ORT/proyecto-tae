window.addEventListener("DOMContentLoaded", () => {
  let salida = document.getElementById("salida");
  let pisosContainer = document.getElementById("pisos-container");
let svg = document.getElementById("conecciones");

pisosContainer.innerHTML = "";
svg.innerHTML = "";
connect2Server()
  getEvent(`mapa?cantidadpisos=${3}`, (data) => {
    salida.innerText = JSON.stringify(data, null, 2);
    rendermapa(data);
  });
  

  function rendermapa(data) {
    let container = document.getElementById("container-mapa");
    let svg = document.getElementById("conecciones");
    container.innerText = "";
    svg.innerText = "";

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
        setTimeout(() => {
          let rect = div.getBoundingClientRect();
          let parentReact = container.getBoundingClientRect();
          posiciones[texto] = {
            x: rect.left + rect.width / 2 - parentReact.left,
            y: rect.top + rect.height / 2 - parentReact.top
          };
        }, 50);
      });
      container.appendChild(fila);
    });

    setTimeout(() => {
      data.conexiones.forEach(([origen, destino]) => {
        if (posiciones[origen] && posiciones[destino]) {
          let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", posiciones[origen].x);
          line.setAttribute("y1", posiciones[origen].y);
          line.setAttribute("x2", posiciones[destino].x);
          line.setAttribute("y2", posiciones[destino].y);
          line.setAttribute("stroke", "black");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
        }
      });
    }, 100);
  }
});
