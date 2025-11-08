import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import { generarmapa } from './NODE/mapa/generarmapa.js';
import { cartas_mercado, cartas_eleccion } from "./NODE/mercado.js";
import fs from "fs";
import { verestado } from "./NODE/ia/ia.js";
import { reiniciar, reliquia_elite, reliquia_jefe } from "./NODE/funciondereliquia.js";

let info = {
  personaje: {
    personaje: "",
    vida: 0,
    vidamax: 0,
    oro: 0,
  },
  mazo: null,
  mapa: null,
  reliquias: null,
  reliquiaJefe: ""
};

let infoia = {
  monstruo: null,
  dañorecibido: 0,
  cartasjugadas: null,
  buffeosjugador: 0,
  condicionhabilidad: null
};

// EVENTOS GET 

// Generar mapa
subscribeGETEvent("mapa", (query) => {
  info.mapa = generarmapa(query);
  return info.mapa;
});

// Reliquia de élite
subscribeGETEvent("reliquia-elite", reliquia_elite);

// Obtener personaje actual
subscribeGETEvent("personaje", () => {
  console.log("GET solicitado. Personaje actual: ", info.personaje.personaje);
  return info.personaje.personaje;
});

// Obtener info
subscribeGETEvent("fogata", () => {
  let fogata = {
    oro: info.personaje.oro,
    vida: info.personaje.vida,
    vidamax: info.personaje.vidamax,
    mapa: info.mapa,
    reliquia: info.reliquias,
    mazo: info.mazo
  };
  console.log("GET solicitado. Fogata: ", fogata);
  return fogata;
});

// Estado básico 
subscribeGETEvent("estado-basico", () => {
  let random = Math.random();
  let estado = (random < 0.6) ? { tipo: "ataque" } : { tipo: "defensa" };
  return estado;
});

// Obtener mazo
subscribeGETEvent("mazo", () => {
  info.mazo = JSON.parse(fs.readFileSync("./NODE/jsons/mazo.json", "utf-8"));
  return info.mazo;
});

// Reliquia del jefe
subscribeGETEvent("reliquia-jefe", reliquia_jefe);

// Obtener reliquias activas
subscribeGETEvent("reliquia", () => {
  info.reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"));
  return info.reliquias;
});

// Obtener monstruo aleatorio
subscribeGETEvent("mounstro", (query) => {
  let mounstros = JSON.parse(fs.readFileSync("./NODE/jsons/mounstros.json", "utf-8"));
  let tipoSolicitado = "normal";

  if (typeof query === "string") {
    tipoSolicitado = query.toLowerCase();
  } else if (typeof query === "object" && query !== null) {
    tipoSolicitado = (query.tipo || "normal").toLowerCase();
  }
  let posibles = mounstros.filter(m => m.tipo.toLowerCase() === tipoSolicitado);
  if (posibles.length === 0) posibles = mounstros;

  let indice = Math.floor(Math.random() * posibles.length);
  let mounstro = posibles[indice];

  console.log(`GET mounstro (${tipoSolicitado}) → ${mounstro.nombre}`);
  infoia.monstruo = mounstro.nombre;
  return mounstro;
});

// Cartas del mercado
subscribeGETEvent("mercado", cartas_mercado);

// Cartas de elección
subscribeGETEvent("eleccion", cartas_eleccion);

// Estado de la MEF
subscribeGETEvent("estado", () => {
  let estado = verestado(
    infoia.monstruo,
    infoia.dañorecibido,
    infoia.cartasjugadas,
    infoia.buffeosjugador,
    infoia.condicionhabilidad
  );
  console.log(`El estado del monstruo es: ${estado}`);
  return estado;
});

// Reliquia del jefe obtenida
subscribeGETEvent("jefe-reliquia", () => info.reliquiaJefe);

// EVENTOS POST

// Actualizar valores de info
subscribePOSTEvent("fogata", (data) => {
  info.personaje.oro = data.oro;
  info.personaje.vida = data.vida;
  info.personaje.vidamax = data.vidamax;
});

// Guardar progreso
subscribePOSTEvent("guardar", (data) => {
  if (data) {
    let saving = info;
    fs.writeFileSync("./NODE/jsons/saving.json", JSON.stringify(saving, null, 2));
    console.log("Progreso guardado correctamente.");
  }
});

// Modificar mazo (agregar/eliminar cartas)
subscribePOSTEvent("modificar-mazo", (data) => {
  console.log("POST recibido:", data);
  let mazo = JSON.parse(fs.readFileSync("./NODE/jsons/mazo.json", "utf-8"));
  let cartas = JSON.parse(fs.readFileSync("./NODE/jsons/cartas.json", "utf-8"));
  let carta = cartas.find(c => c.nombre.toLowerCase() === data.carta.toLowerCase());
  if (!carta) {
    console.log("Carta no encontrada:", data.carta);
    return { error: "Carta no encontrada" };
  }
  if (data.accion === "agregar") {
    mazo.push(carta);
  } else if (data.accion === "eliminar") {
    let index = mazo.findIndex(c => c.nombre === carta.nombre);
    if (index !== -1) mazo.splice(index, 1);
  }
  fs.writeFileSync("./NODE/jsons/mazo.json", JSON.stringify(mazo, null, 2));
  return mazo;
});

// Agregar reliquia
subscribePOSTEvent("agregar-reliquia", (data) => {
  console.log("POST recibido:", data);
  let reliquiasuso = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"));
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json", "utf-8"));
  for(let i = 0;i<reliquias.length;i++){
    if(reliquias[i].nombre===data){
      reliquiasuso.push(reliquias[i])
      reliquias.splice(i,1)
    }
  }
  fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(reliquiasuso, null, 2));
  fs.writeFileSync("./NODE/jsons/reliquias.json", JSON.stringify(reliquias, null, 2));
  console.log("se agrego la reliquia: "+data)
});

// Seleccionar personaje
subscribePOSTEvent("personaje", (data) => {
  console.log("POST recibido:", data);
  info.personaje.personaje = data;
  let reliquiasuso = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"));
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiasiniciales.json", "utf-8"));
  let personajes = {
    bear: { vida: 80, vidamax: 80, oro: 99, reliquia: reliquias[0] },
    pick: { vida: 75, vidamax: 75, oro: 50, reliquia: reliquias[1] },
    mago: { vida: 70, vidamax: 70, oro: 150, reliquia: reliquias[2] },
    jon: { vida: 80, vidamax: 80, oro: 125, reliquia: reliquias[3] }
  };
  let personaje = personajes[data];
  if (personaje) {
    Object.assign(info.personaje, personaje);
    reliquiasuso.push(personaje.reliquia);
    fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(reliquiasuso, null, 2));
  }
});

// Reiniciar datos del juego
subscribePOSTEvent("reiniciar", reiniciar);

// Agarar info de partida para la MEF
subscribePOSTEvent("final-turno", (data) => {
  infoia.dañorecibido = data.dañorecibido;
  infoia.buffeosjugador = data.buffeosjugador;
  infoia.condicionhabilidad = data.habilidad;
  infoia.cartasjugadas = data.cartasjugadas;
});

// Actualizar reliquia del jefe
subscribePOSTEvent("devolver-reliquias", (data) => {
  info.reliquiaJefe = data;
  console.log("Se actualizó reliquiaJefe por: " + data);
});

startServer();
