window.addEventListener("DOMContentLoaded", () => {
  let oro = document.getElementById("oro");
  let vida = document.getElementById("vida");
  let info = {};
  let mapa = document.getElementById("mapa");
  let boton = document.getElementById("buton");
  let botonSacar = document.getElementById("butonSacar");
  let abajo = document.getElementById("abajo");
  let titulo = document.getElementById("titulo");

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

  function volver(){
    window.location.href = "../2/index2.html";
  }
  
  titulo.addEventListener("click", volver);
  mapa.addEventListener("click", irMapa);

  function sumarCarta() {
    if (contadorCartas > 9) return;

    let carta = document.createElement("div");
    carta.classList.add(`carta${contadorCartas}`, "cartaG");
    carta.id = `C${contadorCartas}`;

    // Si es la carta 1, le ponemos el click para restar 10 de vida
    if (contadorCartas === 1) {
      carta.addEventListener("click", () => {
        menosVida(10);
        console.log("-10 de vida");
      });
    }

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

  function menosVida(cantidad) {
    info.vida -= cantidad;

    if (info.vida < 0) info.vida = 0;

    mostrarVida();

    // Si la vida llega a 0, vamos a Game Over
    if (info.vida <= 0) {
      window.location.href = "../Game_over/index.html";
    }
  }

  // Botones para sumar o sacar cartas manualmente
  boton.addEventListener("click", sumarCarta);
  botonSacar.addEventListener("click", sacarCarta);

  // --- Inicializamos el juego con 5 cartas ---
  for (let i = 0; i < 5; i++) {
    sumarCarta();
  }
});
