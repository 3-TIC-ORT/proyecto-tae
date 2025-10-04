import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
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
    mazo:null,
    mapa:null,
    reliquias:null
}

subscribeGETEvent("mapa",(query) => {
  const mapa = generarmapa(query)
  info.mapa = mapa
  return mapa
})
subscribePOSTEvent("personaje",(data) => {
  console.log("POST recibido:", data);
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
  reliquias:reliquias,
})
return {
  oro:info.personaje.oro,
  vida:info.personaje.vida,
  vidamax:info.personaje.vidamax,
  mapa:info.mapa,
}
});

subscribePOSTEvent("fogata",(data) => {
  info.personaje.oro = data.oro
  info.personaje.vida = data.vida
})


subscribePOSTEvent("guardar",(data) => {
  if(data === true){
  let saving = JSON.parse(fs.readFileSync("./jsons/saving.json"))
  saving = info
  fs.writeFileSync("./jsons/saving.json",JSON.stringify(saving,null,2))
}
})

subscribeGETEvent("mazo",() => {
    let mazo = JSON.parse(fs.readFileSync("./NODE/jsons/mazo.json"))
    info.mazo = mazo
    console.log(mazo)
    return mazo
})

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

subscribeGETEvent("reliquia",() => {
    let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json","utf-8"))
    info.reliquias = reliquias
    console.log(reliquias)
    return reliquias
})

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

startServer();