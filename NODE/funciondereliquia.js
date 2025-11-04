import fs from "fs";
export function reliquia_elite() {
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json", "utf-8"))
  let adquiridas = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"))
  if (reliquias.length === 0) {
    console.log("No hay reliquias disponibles.");
    return null;
  }

  let indiceAleatorio = Math.floor(Math.random() * reliquias.length);
  let reliquiaSeleccionada = reliquias[indiceAleatorio];

  reliquias.splice(indiceAleatorio, 1);

  adquiridas.push(reliquiaSeleccionada);

  fs.writeFileSync("./NODE/jsons/reliquias.json", JSON.stringify(reliquias, null, 2), "utf-8");
  fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(adquiridas, null, 2), "utf-8");

  return { reliquia: reliquiaSeleccionada };
}
export function reliquia_jefe() {
  let reliquias = JSON.parse(fs.readFileSync("./NODE/jsons/reliquias.json", "utf-8"))
  let adquiridas = JSON.parse(fs.readFileSync("./NODE/jsons/reliquiauso.json", "utf-8"))
  if (reliquias.length === 0) {
    console.log("No hay reliquias disponibles.");
    return null;
  }
  function reliquiaA(){
  let indiceAleatorio = Math.floor(Math.random() * reliquias.length);
  let reliquiaSeleccionada = reliquias[indiceAleatorio];
  reliquias.splice(indiceAleatorio, 1);
  adquiridas.push(reliquiaSeleccionada);
  return reliquiaSeleccionada
  }
  

  fs.writeFileSync("./NODE/jsons/reliquias.json", JSON.stringify(reliquias, null, 2), "utf-8");
  fs.writeFileSync("./NODE/jsons/reliquiauso.json", JSON.stringify(adquiridas, null, 2), "utf-8");

  return {
    reliquia1: reliquiaA(),
    reliquia2: reliquiaA(),
    reliquia3: reliquiaA(),
    reliquia4: reliquiaA(),
    reliquia5: reliquiaA()    
   };
}
