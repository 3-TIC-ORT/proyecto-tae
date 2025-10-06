import fs from "fs"
export function cartas_mercado(){
let cartas = JSON.parse(fs.readFileSync("./NODE/jsons/cartas.json","utf-8"))
function numeroAleatorio() {
  return Math.floor(Math.random() * (cartas.length + 1));
}
let mercado = {
    carta1: cartas[numeroAleatorio()],
    carta2: cartas[numeroAleatorio()],
    carta3: cartas[numeroAleatorio()],
    carta4: cartas[numeroAleatorio()],
    carta5: cartas[numeroAleatorio()],
    carta6: cartas[numeroAleatorio()],
}
return mercado
}
