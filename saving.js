import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import { generarmapa } from './NODE/mapa/generarmapa.js';
import {cartas_mercado,cartas_eleccion} from "./NODE/mercado.js"
import fs from "fs";
import { verestado } from "./NODE/ia/ia.js";
import { reliquia_elite, reliquia_jefe } from "./NODE/funciondereliquia.js";
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

subscribeGETEvent("reliquia-elite",reliquia_elite)

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

subscribeGETEvent("estado-basico",()=>{
  let random = Math.random();
  let estado = {}
if (random < 0.6) {
  estado = {
    tipo:"ataque",
  }
} else {
  estado = {
    tipo:"defensa",
  }
}
return estado
})

subscribePOSTEvent("fogata",(data) => {
  info.personaje.oro = data.oro
  info.personaje.vida = data.vida
  info.personaje.vidamax = data.vidamax
});

subscribePOSTEvent("guardar",(data) => {
  if(data === true){
  let saving = JSON.parse(fs.readFileSync("./NODE/jsons/saving.json"))
  saving = info
  fs.writeFileSync("./NODE/jsons/saving.json",JSON.stringify(saving,null,2))
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

subscribeGETEvent("reliquia-jefe",reliquia_jefe)

subscribePOSTEvent("reiniciar",(data)=>{
  if(data){
    let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json","utf-8"))
    let adquiridas = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json","utf-8"))
    reliquias = [
      {
        "nombre": "Vajra",
        "efecto": "+1 de Fuerza",
        "obtencion": "Cofres, tienda",
        "ruta": "/Front/Cosas/reliquias/vajra.png"
      },
      {
        "nombre": "Anchor",
        "efecto": "Empiezas el combate con 10 Bloqueo",
        "obtencion": "Cofres, tienda",
        "ruta": "/Front/Cosas/reliquias/anchor.png"
      },
      {
        "nombre": "Bag of Preparation",
        "efecto": "Robas 1 carta adicional al inicio de cada turno",
        "obtencion": "Cofres, tienda",
        "ruta": "/Front/Cosas/reliquias/bag-of-preparation.png"
      },
      {
        "nombre": "Lantern",
        "efecto": "Comienzas cada combate con +1 mana",
        "obtencion": "Cofres, tienda",
        "ruta": "/Front/Cosas/reliquias/lantern.png"
      },
      {
        "nombre": "Regal Pillow",
        "efecto": "Cuando comienzaa un combate recuperas 5 PV.",
        "obtencion": "Cofres, tienda",
        "ruta": "/Front/Cosas/reliquias/regal-pillow.png"
      },
      {
        "nombre": "Roca Rúnica",
        "efecto": "Cada vez que un enemigo muere, ganas 2 PV maximos.",
        "obtencion": "Elite",
        "ruta": "/Front/Cosas/reliquias/roca-runica.png"
      },
      {
        "nombre": "Piedra Filosofal",
        "efecto": "Obtienes 1 de Fuerza al inicio de cada turno. Al inicio del combate, cada enemigo obtiene 1 de Vulnerabilidad",
        "obtencion": "Elite",
        "ruta": "/Front/Cosas/reliquias/piedra-filosofal.png"
      },
      {
        "nombre": "Salvia",
        "efecto": "Tu carta hace su daño sumado al 30% del daño del rival.",
        "obtencion": "Elite",
        "ruta": "/Front/Cosas/reliquias/salvia.png"
      },
      {
        "nombre": "Red star",
        "efecto": "Al inicio de los combates contra jefes, recupera 25 PV",
        "obtencion": "Elite",
        "ruta": "/Front/Cosas/reliquias/red-star.png"
      },
      {
        "nombre": "Sombrero mágico",
        "efecto": "50% de descuento en todos los productos de la tienda",
        "obtencion": "Elite",
        "ruta": "/Front/Cosas/reliquias/sombrero-magico.png"
      },
      {
        "nombre": "Sombrero constructor",
        "efecto": "Reduce el daño recibido de elites y jefes en un 15%",
        "obtencion": "Jefe",
        "ruta": "/Front/Cosas/reliquias/sombrero-constructor.png"
      },
      {
        "nombre": "Escudo Clásico",
        "efecto": "En combates contra élites o jefes, obtienes 10 de escudo durante 3 turnos",
        "obtencion": "Jefe",
        "ruta": "/Front/Cosas/reliquias/escudo-clasico.png"
      },
      {
        "nombre": "Black Star",
        "efecto": "Hace que los élites suelten dos reliquias en lugar de solo una",
        "obtencion": "Jefe",
        "ruta": "/Front/Cosas/reliquias/black-star.png"
      },
      {
        "nombre": "Caja de Devolución",
        "efecto": "Al recogerla, tu deck inicial y el siguiente aumentan en 2 cartas",
        "obtencion": "Jefe",
        "ruta": "/Front/Cosas/reliquias/caja-de-devolucion.png"
      },
      {
        "nombre": "Fortaleza",
        "efecto": "Al comienzo de tu turno, gana 1 de Fuerza y todos los enemigos ganan 1 de debilidad",
        "obtencion": "Jefe",
        "ruta": "/Front/Cosas/reliquias/fortaleza.png"
      }
    ]
    adquiridas = []
    fs.writeFileSync("./NODE/jsons/reliquias.json", JSON.stringify(reliquias, null, 2), "utf-8");
    fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(adquiridas, null, 2), "utf-8");


  }
})

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
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiasiniciales.json", "utf-8"))
  if(data === "bear"){
    reliquiasuso.push(reliquias[0])
    info.personaje.vidamax = 80
    info.personaje.vida = 80
    info.personaje.oro = 99
}
  else if(data === "pick"){
    reliquiasuso.push(reliquias[1])
    info.personaje.vidamax = 75
    info.personaje.vida = 75
    info.personaje.oro = 50
  }
  else if(data === "mago"){
    reliquiasuso.push(reliquias[2])
    info.personaje.vidamax = 70
    info.personaje.vida = 70
    info.personaje.oro = 150
  }
  else if(data === "jon"){
    reliquiasuso.push(reliquias[3])
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

subscribePOSTEvent("final-turno",(data) => {
  infoia.dañorecibido = data.dañorecibido
  infoia.buffeosjugador
  infoia.condicionhabilidad = data.habilidad
  infoia.cartasjugadas = data.cartasjugadas
})

subscribePOSTEvent("devolver-reliquias",(data)=>{
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json", "utf-8"));
  for(let i = 0; i<data.length;i++){
    reliquias.push(data[i])
  }
  fs.writeFileSync("./NODE/jsons/reliquias.json", JSON.stringify(reliquias, null, 2));
  return "se devolvieron y guardaron las reliquias"
})

startServer();