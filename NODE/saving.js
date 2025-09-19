import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import {personaje,cartas,reliquias} from "./datosprueba.js"
import { generarmapa } from './mapa/generarmapa.js';
import fs from "fs";
let info = {
    personaje:personaje,
    mazo:cartas,
    mapa:null,
    reliquias:reliquias
}
console.log(info.mapa)
subscribeGETEvent("mapa",(query) => {
  const mapa = generarmapa(query)
  info.mapa = mapa
  return mapa
})

subscribePOSTEvent("guardar",() => {
  let saving = JSON.parse(fs.readFileSync("./jsons/saving.json"))
  saving.push(info)
  fs.writeFileSync("./jsons/saving.json",JSON.stringify(saving))
})
startServer(4000);
