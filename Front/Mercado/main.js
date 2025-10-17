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
    const cartasAMostrar = cartas.slice(0, 6);

    cartasAMostrar.forEach((carta, index) => {
        const idDiv = `#carta${index + 1}`; 
        const divCarta = document.querySelector(idDiv);
        
        if (divCarta) {
            divCarta.innerHTML = `
                <div class="card-nombre">${carta.nombre}</div>
                <div class="card-costo">ORO: ${carta.costo}</div>
                <div class="card-desc">${carta.descripcion}</div>
            `;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarMercado(); 
});