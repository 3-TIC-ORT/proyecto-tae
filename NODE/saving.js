import {personaje,cartas,reliquias} from "./datosprueba.js"
import {generarmapa} from ".mapa/generarmapa.js"
let mapa = generarmapa
let data = {
    personaje:personaje,
    mazo:cartas,
    mapa:mapa
}
console.log(data)