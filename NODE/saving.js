import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import {personaje,cartas,reliquias} from "./datosprueba.js"
import { generarmapa } from './mapa/generarmapa.js';
let data = {
    personaje:personaje,
    mazo:cartas,
    mapa:null
}
console.log(data.mapa)
subscribeGETEvent("mapa",(query) => {
  const mapa = generarmapa(query)
  data.mapa = mapa
  return mapa
})
startServer(4000);
