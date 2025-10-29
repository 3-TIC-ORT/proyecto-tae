let avanzar1 = document.getElementById ("avanzar");

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
                <div class="card-costo">ORO: ${carta[1].elixir}</div>
                <img class="card-img" src="${carta[1].ruta}"> </img>
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