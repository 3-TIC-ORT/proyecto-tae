window.addEventListener("DOMContentLoaded", () => {
    let oro = document.getElementById("oro");
    let vida = document.getElementById("vida");
    let info = {};

    connect2Server();

    getEvent("fogata", (data) => {
        info = {
            oro: data.oro,
            vida: data.vida,
            vidamax: data.vidamax,
            mapa: data.mapa,
            reliquias: data.reliquias
        };

        // 👇 Mostrar recién acá, cuando ya tenemos los datos
        mostrarOro();
        mostrarVida();
    });

    function mostrarVida() {
        vida.textContent = "PV: " + info.vida + "/" + info.vidamax;
    }

    function mostrarOro() {
        oro.textContent = "Oro: " + info.oro;
    }
});