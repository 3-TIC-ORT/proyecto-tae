window.addEventListener("DOMContentLoaded", () => {
    connect2Server();
    let avanzar1 = document.getElementById("avanzar");
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

    let info = {};
    let mazo = [];
    let reliquia = [];

    // Para mostrar vida y oro
    getEvent("fogata", (data) => {
        info = {
            oro: data.oro,
            vida: data.vida,
            vidamax: data.vidamax,
        };
        mostrar();
    });

    function mostrar() {
        vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
        oro.textContent = `Oro: ${info.oro}`;
    }

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

    getEvent("reliquia", (data) => {
        reliquia = data;
        circReliquias.textContent = reliquia.length;
    });

    getEvent("mazo", (data) => {
        mazo = data;
        circCartas.textContent = mazo.length;
    });

    function mostrar() {
        vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
        oro.textContent = `Oro: ${info.oro}`;
    }

    function irReliquia() {
        window.location.href = "../menu-reliquias/reliquias.html";
    }

    function irCarta() {
        window.location.href = "../cartas/index.html";
    }

    function mostrarCartas() {
        LugarCartas.style.display = "block";
        LugarCartas.style.backgroundColor = "black";
        cajaBatalla.style.display = "none";
        lugarReliquias.style.display = "none";
        lugarReliquias.style.background = "none";
    }

    function mostrarReliquiasS() {
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
    reliquias.addEventListener("click", mostrarReliquiasS);

    function cargarMercado() {
        console.log("Iniciando carga del mercado...");
        getEvent("mercado", (cartasRecibidas) => {
            console.log("Respuesta del servidor recibida:", cartasRecibidas);
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

    function dibujarCartas(cartas) {
        console.log("Cartas: ", cartas);
        let cartasAMostrar = Object.entries(cartas).slice(0, 6);
        console.log(cartasAMostrar);

        cartasAMostrar.forEach((carta, index) => {
            let idDiv = `#carta${index + 1}`;
            let divCarta = document.querySelector(idDiv);

            console.log(carta[1])

            if (divCarta) {
                divCarta.innerHTML = `
                    <img class="card-img" src="${carta[1].ruta}"> </img>
                    <div class= "card-oro"> <p> <img class = "foto-oro" src= "../Cosas/image 43.png">:</img> ${valorAleatorio()} </p> </div>
                `;
            }
        });
    }

    function mostrarReliquias(mercado) {
        let reliquiasAMostrar = Object.entries(mercado)
            .filter(([key]) => key.startsWith("reliquia"))
            .slice(0, 4);

        reliquiasAMostrar.forEach(([key, reliquia], index) => {
            let divReliquia = document.querySelector(`#reliquia${index + 1}`);
            if (divReliquia) {
                divReliquia.innerHTML = `
                    <div class="reliquia-contenedor" 
                         data-nombre="${escapeHtml(reliquia.nombre || '')}" 
                         data-efecto="${escapeHtml(reliquia.efecto || '')}">
                        <img class="reliquia-img" src="${reliquia.ruta}" alt="${escapeHtml(reliquia.nombre)}">
                        <div class="card-oro">
                            <img class="foto-oro" src="../Cosas/image 43.png" alt="oro">
                            <span class="oro-texto">: ${valorAleatorio()}</span>
                        </div>
                    </div>
                `;

                const cont = divReliquia.querySelector('.reliquia-contenedor');

                cont.addEventListener('mouseenter', (e) => {
                    showFloatingTooltipFromElement(cont);
                });
                cont.addEventListener('mouseleave', (e) => {
                    hideFloatingTooltip();
                });
            }
        });
    }

    let __floatingTooltip = null;

    function showFloatingTooltipFromElement(el) {
        hideFloatingTooltip();

        const nombre = el.dataset.nombre || '';
        const efecto = el.dataset.efecto || '';
        const ruta = el.dataset.ruta || '';

        __floatingTooltip = document.createElement('div');
        __floatingTooltip.className = 'tooltip-floating';
        __floatingTooltip.innerHTML = `
            <div class="tooltip-title">${nombre}</div>
            <div class="tooltip-body">${efecto}</div>
            <div class="tooltip-meta"><small>${ruta}</small></div>
        `;
        document.body.appendChild(__floatingTooltip);

        const rect = el.getBoundingClientRect();
        const tooltipRect = __floatingTooltip.getBoundingClientRect();

        const cardOro = el.querySelector('.card-oro');
        let margin = 8;
        if (cardOro) {
            margin += cardOro.offsetHeight;
        }

        const top = window.scrollY + rect.bottom + margin;
        let left = window.scrollX + rect.left + (rect.width / 2) - (tooltipRect.width / 2);

        const minLeft = window.scrollX + 8;
        const maxLeft = window.scrollX + document.documentElement.clientWidth - tooltipRect.width - 8;
        left = Math.max(minLeft, Math.min(left, maxLeft));

        __floatingTooltip.style.left = `${left}px`;
        __floatingTooltip.style.top = `${top}px`;

        requestAnimationFrame(() => {
            __floatingTooltip.style.opacity = '1';
        });
    }

    function moveFloatingTooltip(clientX, clientY) {
        if (!__floatingTooltip) return;
        const tooltipRect = __floatingTooltip.getBoundingClientRect();
        let left = clientX + 12;
        let top = clientY + 12;
        left = Math.min(left, window.scrollX + document.documentElement.clientWidth - tooltipRect.width - 8);
        top = Math.min(top, window.scrollY + document.documentElement.clientHeight - tooltipRect.height - 8);
        __floatingTooltip.style.left = `${left}px`;
        __floatingTooltip.style.top = `${top}px`;
    }

    function hideFloatingTooltip() {
        if (!__floatingTooltip) return;
        __floatingTooltip.remove();
        __floatingTooltip = null;
    }

    function escapeHtml(str) {
        if (str === undefined || str === null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function avanzar() {
        window.location.href = "../mapa/index.html";
    }

    // Iniciamos todo
    cargarMercado();
    avanzar1.addEventListener("click", avanzar);
    cartas.addEventListener("click", mostrarCartas);
    atras.addEventListener("click", volverBatalla);
    atras2.addEventListener("click", volverBatalla);
    omitir.addEventListener("click", irSeleccion);
    reliquias.addEventListener("click", mostrarReliquiasS);
});