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
    const cartasAMostrar = Object.entries(cartas).slice(0, 6);
    console.log (cartasAMostrar);

    cartasAMostrar.forEach((carta, index) => {
        const idDiv = `#carta${index + 1}`; 
        const divCarta = document.querySelector(idDiv);

        console.log(carta[1])
        
        if (divCarta) {
            divCarta.innerHTML = `
                <div class="card-nombre">${carta[1].nombre}</div>
                <div class="card-costo">ORO: ${carta[1].elixir}</div>
                <div class="card-desc">${carta[1].efecto}</div>
                <img class="card-img" src="${carta[1].ruta}"> </img>
            `;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMercado(); 
});