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
  const min = 20;
  const max = 50;
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
    vida.textContent = `PV: ${info.vida}/${info.vidamax}`;
    oro.textContent = `Oro: ${info.oro}`;
  }

  function hoverCama() {
    act.textContent = "Cura un 30% de tu PV";
  }

  function hoverMina() {
    act.textContent = "Consigue oro, la cantidad puede ser entre 20 y 50";
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
});
