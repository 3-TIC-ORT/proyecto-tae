window.addEventListener("DOMContentLoaded", () => {
    let oro = document.getElementById("oro");
    let vida = document.getElementById("vida");
    let cama = document.getElementById("cama");
    let mina = document.getElementById("mina");
    let act = document.getElementById("axion");
    let mapa = document.getElementById("mapa");
  
    let info = {};
  
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
  
    function hoverCama() {
      console.log("hola");
      act.textContent = "Cura un 30% de tu PV";
    }
  
    function hoverMina() {
      act.textContent = "Minar";
    }
  
    function nada() {
      act.textContent = "";
    }
  
    function irMapa() {
      window.location.href = "../mapa/index.html";
    }
  
    cama.addEventListener("mouseover", hoverCama);
    mina.addEventListener("mouseover", hoverMina);
    cama.addEventListener("mouseleave", nada);
    mina.addEventListener("mouseleave", nada);
    vida.addEventListener("click", mostrarVida);
    mapa.addEventListener("click", irMapa);
  });
  