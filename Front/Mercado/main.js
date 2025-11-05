window.addEventListener("DOMContentLoaded", () => {
    connect2Server();
  
    // referencias DOM
    let avanzar1 = document.getElementById("avanzar");
    let oro = document.getElementById("oro");
    let vida = document.getElementById("vida");
    let mapa = document.getElementById("mapa");
    let reliquias = document.getElementById("reliquias");
    let cartas = document.getElementById("cartas");
    let cajaCartas = document.getElementById("cajaCartas");
    let cajaReliquias = document.getElementById("cajaReliquias");
    let circCartas = document.getElementById("circulo-cartas");
    let circReliquias = document.getElementById("circulo-reliquias");
    let lugarReliquias = document.getElementById("LugarReliquias");
    let atras = document.getElementById("atras");
    let atras2 = document.getElementById("atras2");
  
    // estado local
    let info = { oro: 0, vida: 0, vidamax: 0 };
    let oroactual = 0;
    let mazo = [];
    let reliquia = [];
  
    // obtener datos base del backend
    getEvent("fogata", (data) => {
      info.oro = Number(data?.oro ?? 0);
      info.vida = Number(data?.vida ?? 0);
      info.vidamax = Number(data?.vidamax ?? 0);
      oroactual = info.oro;
      mostrar();
    });
  
    // actualiza texto de oro y vida
    function mostrar() {
      vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
      oro.textContent = `Oro: ${oroactual}`;
    }
  
    // cargar datos iniciales de mazo/reliquias
    getEvent("mazo", (data) => {
      mazo = Array.isArray(data) ? data : [];
      circCartas.textContent = mazo.length;
      mostrarMazo();
    });
  
    getEvent("reliquia", (data) => {
      reliquia = Array.isArray(data) ? data : [];
      circReliquias.textContent = reliquia.length;
      mostrarReliquia();
    });
  
    function mostrarReliquia() {
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
  
    // Cargar mercado y dibujar cartas/reliquias
    function cargarMercado() {
      getEvent("mercado", (cartasRecibidas) => {
        if (!cartasRecibidas || Object.keys(cartasRecibidas).length === 0) {
          console.error("No se recibieron cartas válidas del backend.");
          return;
        }
        dibujarCartas(cartasRecibidas);
        mostrarReliquias(cartasRecibidas);
      });
    }
  
    function valorAleatorio() {
      return Math.floor(Math.random() * (150 - 120 + 1)) + 120;
    }
  
    // DIBUJAR CARTAS
    function dibujarCartas(cartas) {
      let cartasAMostrar = Object.entries(cartas).slice(0, 6);
  
      cartasAMostrar.forEach(([, cartaObj], index) => {
        let idDiv = `#carta${index + 1}`;
        let divCarta = document.querySelector(idDiv);
        if (!divCarta) return;
  
        let costo = valorAleatorio();
  
        divCarta.innerHTML = `
          <img class="card-img" src="${cartaObj.ruta}"></img>
          <div class= "card-oro"> <p> <img class = "foto-oro" src= "../Cosas/image 43.png">:</img> ${costo} </p> </div>
        `;
  
        divCarta.addEventListener("click", () => {
          let ahora = Number(oroactual || 0);
          if (ahora >= costo) {
            oroactual = ahora - costo;
            oro.textContent = `Oro: ${oroactual}`;
            alert(`Compraste la carta ${cartaObj.nombre} por ${costo} de oro`);
  
            let nueva = document.createElement("div");
            nueva.textContent = cartaObj.nombre;
            cajaCartas.appendChild(nueva);
            mazo.push(cartaObj);
            circCartas.textContent = mazo.length;
  
            postEvent("modificar-mazo", { carta: cartaObj.nombre, accion: "agregar" });
            postEvent("fogata", { oro: oroactual, vida: info.vida, vidamax: info.vidamax });
          } else {
            alert("No tenés suficiente oro 😞");
          }
        });
      });
    }
  
    // DIBUJAR RELIQUIAS
    function mostrarReliquias(mercado) {
      let reliquiasAMostrar = Object.entries(mercado)
        .filter(([key]) => key.startsWith("reliquia"))
        .slice(0, 4);
  
      reliquiasAMostrar.forEach(([, reliquiaObj], index) => {
        let divReliquia = document.querySelector(`#reliquia${index + 1}`);
        if (!divReliquia) return;
  
        let costo = valorAleatorio();
  
        divReliquia.innerHTML = `
          <div class="reliquia-contenedor"
               data-nombre="${escapeHtml(reliquiaObj.nombre || '')}"
               data-efecto="${escapeHtml(reliquiaObj.efecto || '')}">
            <img class="reliquia-img" src="${reliquiaObj.ruta}" alt="${escapeHtml(reliquiaObj.nombre)}">
            <div class= "card-oro"> <p> <img class = "foto-oro" src= "../Cosas/image 43.png">:</img> ${costo} </p> </div>
          </div>
        `;
        
  
        let cont = divReliquia.querySelector(".reliquia-contenedor");
        cont.addEventListener("mouseenter", () => showFloatingTooltipFromElement(cont));
        cont.addEventListener("mouseleave", hideFloatingTooltip);
        
        cont.addEventListener("click", () => {
          let ahora = Number(oroactual || 0);
          if (ahora >= costo) {
            oroactual = ahora - costo;
            oro.textContent = `Oro: ${oroactual}`;
            alert(`Compraste la reliquia ${reliquiaObj.nombre} por ${costo} de oro`);
  
            let nueva = document.createElement("div");
            nueva.textContent = reliquiaObj.nombre;
            cajaReliquias.appendChild(nueva);
            reliquia.push(reliquiaObj);
            circReliquias.textContent = reliquia.length;
  
            postEvent("agregar-reliquia", reliquiaObj.nombre);
            postEvent("fogata", { oro: oroactual, vida: info.vida, vidamax: info.vidamax });
            postEvent("guardar", true);
          } else {
            alert("No tenés suficiente oro 😞");
          }
        });
      });
    }
  
    // Helpers para tooltip
    let __floatingTooltip = null;
  
    function showFloatingTooltipFromElement(el) {
      hideFloatingTooltip();
      let nombre = el.dataset.nombre || "";
      let efecto = el.dataset.efecto || "";
      let ruta = el.dataset.ruta || "";
  
      __floatingTooltip = document.createElement("div");
      __floatingTooltip.className = "tooltip-floating";
      __floatingTooltip.innerHTML = `
        <div class="tooltip-title">${nombre}</div>
        <div class="tooltip-body">${efecto}</div>
        <div class="tooltip-meta"><small>${ruta}</small></div>
      `;
      document.body.appendChild(__floatingTooltip);
  
      let rect = el.getBoundingClientRect();
      let tooltipRect = __floatingTooltip.getBoundingClientRect();
      let cardOro = el.querySelector(".card-oro");
      let margin = 8;
      if (cardOro) margin += cardOro.offsetHeight;
  
      let top = window.scrollY + rect.bottom + margin;
      let left = window.scrollX + rect.left + rect.width / 2 - tooltipRect.width / 2;
      left = Math.max(window.scrollX + 8, Math.min(left, window.scrollX + document.documentElement.clientWidth - tooltipRect.width - 8));
  
      __floatingTooltip.style.left = `${left}px`;
      __floatingTooltip.style.top = `${top}px`;
      requestAnimationFrame(() => (__floatingTooltip.style.opacity = "1"));
    }
  
    function hideFloatingTooltip() {
      if (!__floatingTooltip) return;
      __floatingTooltip.remove();
      __floatingTooltip = null;
    }
  
    function escapeHtml(str) {
      if (str === undefined || str === null) return "";
      return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  
    function avanzar() {
      postEvent("fogata", { oro: oroactual, vida: info.vida, vidamax: info.vidamax });
      postEvent("guardar", true);
      setTimeout(() => {
        window.location.href = "../mapa/index.html";
      }, 120);
    }
  
    // listeners
    if (avanzar1) avanzar1.addEventListener("click", avanzar);
    if (cartas) cartas.addEventListener("click", mostrarMazo);
    if (reliquias) reliquias.addEventListener("click", mostrarReliquia);
    if (atras) atras.addEventListener("click", () => window.scrollTo(0, 0));
    if (atras2) atras2.addEventListener("click", () => window.scrollTo(0, 0));
  
    // iniciar todo
    cargarMercado();
  });
  