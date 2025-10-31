let avanzar1 = document.getElementById ("avanzar");
connect2Server(); 

function cargarMercado() {
    getEvent("mercado", (cartasRecibidas) => {
        if (!cartasRecibidas || cartasRecibidas.length === 0) {
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
    console.log (cartasAMostrar);

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
              <img class="reliquia-img" src="${reliquia.ruta}">
              <div class= "card-oro"> <p> <img class = "foto-oro" src= "../Cosas/image 43.png">:</img> ${valorAleatorio()} </p> </div>
          `;
      }
  });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMercado(); 
});

function avanzar (){
    window.location.href = "../mapa/index.html";
}

avanzar1.addEventListener ("click",avanzar);