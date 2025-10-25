import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import { generarmapa } from './NODE/mapa/generarmapa.js';
import {cartas_mercado,cartas_eleccion} from "./NODE/mercado.js"
import fs from "fs";
import { verestado } from "./NODE/ia/ia.js";
let info = {
    personaje:{
      personaje:"",
      vida:0,
      vidamax:0,
      oro:0,
    },
    mazo:null,
    mapa:null,
    reliquias:null
}
let infoia = {
  monstruo: null,
  dañorecibido: 0,
  cartasjugadas: null,
  buffeosjugador: 0,
  condicionhabilidad: null
}

subscribeGETEvent("mapa",(query) => {
  const mapa = generarmapa(query)
  info.mapa = mapa
  return mapa
});

subscribeGETEvent("personaje", () => {
  console.log("GET solicitado. Personaje actual: ", info.personaje.personaje);
  return info.personaje.personaje;
});

subscribeGETEvent("fogata",() => {
console.log("GET solicitado. ORO, VIDA, MAPA, RELIQUIAS: ", {
  oro:info.personaje.oro,
  vida:info.personaje.vida,
  vidamax:info.personaje.vidamax,
  mapa:info.mapa,
  reliquia:info.reliquias,
  mazo:info.mazo
})
return {
  oro:info.personaje.oro,
  vida:info.personaje.vida,
  vidamax:info.personaje.vidamax,
  mapa:info.mapa,
  reliquia:info.reliquias,
  mazo:info.mazo
}
});

subscribePOSTEvent("fogata",(data) => {
  info.personaje.oro = data.oro
  info.personaje.vida = data.vida
});

subscribePOSTEvent("guardar",(data) => {
  if(data === true){
  let saving = JSON.parse(fs.readFileSync("./jsons/saving.json"))
  saving = info
  fs.writeFileSync("./jsons/saving.json",JSON.stringify(saving,null,2))
}
});

subscribeGETEvent("mazo",() => {
    let mazo = JSON.parse(fs.readFileSync("./NODE/jsons/mazo.json"))
    info.mazo = mazo
    console.log(mazo)
    return mazo
});

subscribePOSTEvent("modificar-mazo", (data) => {
  console.log("POST recibido:", data);

  let mazo = JSON.parse(fs.readFileSync("./NODE/jsons/mazo.json", "utf-8"));
  let cartas = JSON.parse(fs.readFileSync("./NODE/jsons/cartas.json", "utf-8"));

  let carta = cartas.find(carta => carta.nombre.toLowerCase() === data.carta.toLowerCase());

  if(!carta) {
      console.log("Carta no encontrada:", data.carta);
      return { error: "Carta no encontrada" };
  }

  if(data.accion === "agregar"){
      mazo.push(carta);

  } else if(data.accion === "eliminar"){
      let index = mazo.findIndex(carta => carta.nombre === carta.nombre);
      if(index !== -1) mazo.splice(index, 1);
  }

  fs.writeFileSync("./NODE/jsons/mazo.json", JSON.stringify(mazo, null, 2));
  return mazo;
});

subscribePOSTEvent("vaciar-mazo",(data)=>{
  if(data){
    let mazo = JSON.parse(fs.readFileSync("./NODE/jsons/mazo.json", "utf-8"));
    mazo = []
    fs.writeFileSync("./NODE/jsons/mazo.json", JSON.stringify(mazo, null, 2));
  return mazo;
  }
});

subscribeGETEvent("reliquia",() => {
    let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json","utf-8"))
    info.reliquias = reliquias
    console.log(reliquias)
    return reliquias
});

subscribePOSTEvent("agregar-reliquia", (data) => {
  console.log("POST recibido:", data);

  let reliquiasuso = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"));
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json", "utf-8"));

  let reliquia = reliquias.find(r => r.nombre.toLowerCase() === data.toLowerCase());

  if(!reliquia) {
      console.log("Carta no encontrada:", data);
      return { error: "Carta no encontrada" };
  }
  else{
      reliquiasuso.push(reliquia);

  }
  fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(reliquiasuso, null, 2));
  return reliquiasuso;
});

subscribePOSTEvent("vaciar-reliquias",(data)=>{
  if(data){
    console.log("POST event: vaciar-reliquias recibido con data =", data);
    let reliquiasuso = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"));
    reliquiasuso = []
    fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(reliquiasuso, null, 2));
    return reliquiasuso
  }
});

subscribePOSTEvent("personaje",(data) => {
  console.log("POST recibido:", data);
  info.personaje.personaje = data
  let reliquiasuso = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"));
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json", "utf-8"))
  if(data === "bear"){
    reliquiasuso.push(reliquias[15])
    info.personaje.vidamax = 80
    info.personaje.vida = 80
    info.personaje.oro = 99
}
  else if(data === "pick"){
    reliquiasuso.push(reliquias[16])
    info.personaje.vidamax = 75
    info.personaje.vida = 75
    info.personaje.oro = 50
  }
  else if(data === "mago"){
    reliquiasuso.push(reliquias[17])
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
  fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(reliquiasuso, null, 2));
  return info.personaje
});

subscribeGETEvent("mounstro", (query) => {
  let mounstros = JSON.parse(fs.readFileSync("./NODE/jsons/mounstros.json", "utf-8"));

  let tipoSolicitado = "normal";

  if (typeof query === "string") {
    tipoSolicitado = query.toLowerCase();
  } else if (typeof query === "object" && query !== null) {
    tipoSolicitado = (query.tipo || "normal").toLowerCase();
  }

  let posibles = mounstros.filter(m => m.tipo.toLowerCase() === tipoSolicitado);

  if (posibles.length === 0) {
    posibles = mounstros;
  }

  let indice = Math.floor(Math.random() * posibles.length);
  let mounstro = posibles[indice];

  console.log(`GET mounstro (${tipoSolicitado}) → ${mounstro.nombre}`);
  infoia.monstruo = mounstro.nombre
  return mounstro;
});

subscribeGETEvent("mercado",cartas_mercado)

subscribeGETEvent("eleccion",cartas_eleccion)

subscribeGETEvent("estado",()=>{
  let estado = verestado(infoia.monstruo,infoia.dañorecibido,infoia.cartasjugadas,infoia.buffeosjugador,infoia.condicionhabilidad)
  console.log(`el estado del mounstro es: ${estado}`)
  return estado
})

subscribeGETEvent("estado-basico",()=>{
  let random = Math.random();
  let estado = undefined
  let numero = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
if (random < 0.6) {
  estado = {
    tipo:"ataque",
    daño:numero
  }
} else {
  estado = {
    tipo:"defensa",
    daño:numero
  }
}
})

subscribePOSTEvent("final-turno",(data) => {
  infoia.dañorecibido = data.dañorecibido
  infoia.buffeosjugador
  infoia.condicionhabilidad = data.habilidad
  infoia.cartasjugadas = data.cartasjugadas
})

startServer();