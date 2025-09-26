import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import {cartas,reliquias} from "./NODE/datosprueba.js"
import { generarmapa } from './NODE/mapa/generarmapa.js';
import fs from "fs";
let info = {
    personaje:{
      personaje:"",
      reliquia_inicial:"",
      vida:0,
      vidamax:0,
      oro:0,
    },
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
subscribePOSTEvent("personaje",(data) => {
  info.personaje.personaje = data
  if(data === "bear"){
    info.personaje.reliquia_inicial = "reliquia bear"
    info.personaje.vidamax = 80
    info.personaje.vida = 80
    info.personaje.oro = 99
}
  else if(data === "pick"){
    info.personaje.reliquia_inicial = "reliquia pick"
    info.personaje.vidamax = 75
    info.personaje.vida = 75
    info.personaje.oro = 50
  }
  else if(data === "mago"){
    info.personaje.reliquia_inicial = "reliquia mago"
    info.personaje.vidamax = 70
    info.personaje.vida = 70
    info.personaje.oro = 150
  }
  else if(data === "jon"){
    info.personaje.reliquia_inicial = "reliquia jon"
    info.personaje.vidamax = 80
    info.personaje.vida = 80
    info.personaje.oro = 125
  }
  return info.personaje
})

subscribeGETEvent("personaje",(data) => {
  if(data){
    return info.personaje.personaje
  }
})

subscribePOSTEvent("vida",(data) => {
  info.personaje.vida = data
  return info.personaje.vida
})


subscribePOSTEvent("mazo",(data) => {
  info.mazo = data
  return info.mazo
})


subscribePOSTEvent("guardar",(data) => {
  if(data === true){
  let saving = JSON.parse(fs.readFileSync("./jsons/saving.json"))
  saving = info
  fs.writeFileSync("./jsons/saving.json",JSON.stringify(saving,null,2))
}
})
startServer();