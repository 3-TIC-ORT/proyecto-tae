import fs from "fs"

function obtenerNumerosUnicos(cantidad, max) {
  let numeros = Array.from({ length: max }, (_, i) => i);
  for (let i = numeros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
  }
  return numeros.slice(0, cantidad);
}

export function cartas_mercado() {
  let cartas = JSON.parse(fs.readFileSync("./NODE/jsons/cartas.json", "utf-8"));
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json", "utf-8"));

  let indicesCartas = obtenerNumerosUnicos(6, cartas.length);
  let indicesReliquias = obtenerNumerosUnicos(6, reliquias.length);

  let mercado = {
    carta1: cartas[indicesCartas[0]],
    carta2: cartas[indicesCartas[1]],
    carta3: cartas[indicesCartas[2]],
    carta4: cartas[indicesCartas[3]],
    carta5: cartas[indicesCartas[4]],
    carta6: cartas[indicesCartas[5]],
    reliquia1: reliquias[indicesReliquias[0]],
    reliquia2: reliquias[indicesReliquias[1]],
    reliquia3: reliquias[indicesReliquias[2]],
    reliquia4: reliquias[indicesReliquias[3]]
  }

  return mercado;
}

export function cartas_eleccion() {
  let cartas = JSON.parse(fs.readFileSync("./NODE/jsons/cartas.json", "utf-8"));
  let indicesCartas = obtenerNumerosUnicos(3, cartas.length);

  let eleccion = {
    carta1: cartas[indicesCartas[0]],
    carta2: cartas[indicesCartas[1]],
    carta3: cartas[indicesCartas[2]],
  }

  return eleccion;
}
