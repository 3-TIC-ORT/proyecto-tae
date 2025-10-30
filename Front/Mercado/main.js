let avanzar1 = document.getElementById ("avanzar");
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

connect2Server(); 

function cargarMercado() {
    getEvent("mercado", (cartasRecibidas) => {
        if (!cartasRecibidas || cartasRecibidas.length === 0) {
            console.error("No se recibieron cartas válidas del backend.");
            return;
        }
        dibujarCartas(cartasRecibidas);
    });
}

function dibujarCartas(cartas) {
    console.log("Cartas: ", cartas);
    let cartasAMostrar = Object.entries(cartas).slice(0, 6);
    console.log (cartasAMostrar);

    cartasAMostrar.forEach((carta, index) => {
        let idDiv = `#carta${index + 1}`; 
        let divCarta = document.querySelector(idDiv);

        console.log(carta[1])
        
        if (divCarta) {
            divCarta.innerHTML = `
                <img class="card-img" src="${carta[1].ruta}"> </img>
                <div class="card-costo">ORO: ${carta[1].elixir}</div>
            `;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMercado(); 
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
    vida.textContent = `PV: ${vidaPersonaje}/${info.vidamax}`;
    oro.textContent = `Oro: ${info.oro}`;
  }

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

function avanzar (){
    window.location.href = "../mapa/index.html";
}

avanzar1.addEventListener ("click",avanzar);
cartas.addEventListener("click", mostrarCartas);
reliquias.addEventListener("click", mostrarReliquias);