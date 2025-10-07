window.addEventListener("DOMContentLoaded", () => {
  let oro = document.getElementById("oro");
  let vida = document.getElementById("vida");
  let info = {};
  let mapa = document.getElementById("mapa");
  let boton = document.getElementById("buton");
  let botonSacar = document.getElementById("butonSacar");
  let abajo = document.getElementById("abajo");

  let contadorCartas = 1; // empieza en carta1

  connect2Server();

  getEvent("fogata", (data) => {
    info = {
      oro: data.oro,
      vida: data.vida,
      vidamax: data.vidamax,
      mapa: data.mapa,
      reliquias: data.reliquias,
    };
    mostrarOro();
    mostrarVida();
  });

  function mostrarVida() {
    vida.textContent = "PV: " + info.vida + "/" + info.vidamax;
  }

  function mostrarOro() {
    oro.textContent = "Oro: " + info.oro;
  }

  function irMapa() {
    window.location.href = "../mapa/index.html";
  }

  mapa.addEventListener("click", irMapa);

  function sumarCarta() {
    if (contadorCartas > 9) return;

    let carta = document.createElement("div");
    carta.classList.add(`carta${contadorCartas}`, "cartaG");
    abajo.appendChild(carta);

    contadorCartas++;
  }

  function sacarCarta() {
    if (contadorCartas <= 1) return;

    contadorCartas--;

    let cartaAEliminar = abajo.querySelector(`.carta${contadorCartas}`);
    if (cartaAEliminar) {
      cartaAEliminar.remove();
    }
  }

  boton.addEventListener("click", sumarCarta);
  botonSacar.addEventListener("click", sacarCarta);
});
