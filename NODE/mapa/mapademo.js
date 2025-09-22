let grafo = [];
let conexiones = [];
const cant_niveles = 5;

const TIPODESALA = {
    MOUNSTRO: "M",
    TIENDA: "T",
    FOGATA: "F",
    FINALBOSS: "B",
    ELITE: "E"
};


// Función para generar un número entero aleatorio entre a y b 
function numeroAleatorio(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function crearsalas() {
    for (let nivel = 0; nivel < cant_niveles; nivel++) {
        grafo[nivel] = [];
        for (let sala = 0; sala < numeroAleatorio(3, 5); sala++) {
            if (nivel === 0) {
                grafo[nivel][sala] = TIPODESALA.MOUNSTRO;
                continue;
            }
            if (nivel === cant_niveles - 1) {
                grafo[nivel][sala] = TIPODESALA.FOGATA;
                continue;
            }

            const num = numeroAleatorio(1, 100);
            let tipoSala;
            if (num <= 50) {
                tipoSala = TIPODESALA.MOUNSTRO;
            }
            if (num > 50 && num <= 70) {
                tipoSala = TIPODESALA.FOGATA;
            }
            if (num > 70 && num <= 85) {
                tipoSala = TIPODESALA.ELITE;
            }
            if (num > 85) {
                tipoSala = TIPODESALA.TIENDA;
            }

            grafo[nivel][sala] = (tipoSala);
        }
        grafo.push([TIPODESALA.FINALBOSS]);
    }
}
function crearMapa() {
    crearsalas();
    crearconexiones();
};

function crearconexiones() {
    for (let nivel = 0; nivel < grafo.length - 1; nivel++) {
        conexiones[nivel] = [];
        for (let sala = 0; sala < grafo[nivel].length; sala++) {
            const numConexiones = 1;

            let con = [];
            for (let i = 0; i < numConexiones; i++) {
                con.push([nivel + 1, numeroAleatorio(0, grafo[nivel + 1].length - 1)]);
            }
            conexiones[nivel][sala] = con;
        }
    }

}

function mostrarMapa() {
    for (let nivel = 0; nivel < grafo.length; nivel++) {
        for (let sala = 0; sala < grafo[nivel].length; sala++) {
            process.stdout.write(grafo[nivel][sala] + " ");
        }
        console.log();
    }
}

function mostrarConexiones(){
    conexiones.forEach(e => {
        console.log(e)
    });
}

crearMapa();
mostrarMapa();
mostrarConexiones();
