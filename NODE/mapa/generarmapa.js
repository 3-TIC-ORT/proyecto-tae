import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
function generarmapa(query){
let cantidadpisos = query && query.cantidadpisos ? parseInt(query.cantidadpisos) : 0;
console.log("Recibí petición con cantidadpisos =", cantidadpisos);
let grafo = [];
let conexiones = [];
let finalboss = ["Final Boss"]
function palabraaleatoria() {
  const rand = Math.random() * 100;

  if (rand < 40) {
      return "M"; 
  } else if (rand < 80) {
      return "T"; 
  } else if (rand < 80) {
      return "F"; 
  } else {
      return "E"; 
  }
}
function numeroAleatorio() {
    return Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  }

for(let i = 0;i <= cantidadpisos;i++){
let piso = []
for(let z = 1; z <= numeroAleatorio(); z++){
  if(i === 0){
    piso.push(i+"-"+z+" "+"M")
  }
  else {
    piso.push(i+"-"+z+" "+palabraaleatoria())  
  }
}
grafo.push(piso)
}
grafo.push(finalboss)
for (let i = 0; i < grafo.length - 1; i++) {
    let pisoactual = grafo[i];
    let pisosiguiente = grafo[i + 1];
    for (let j = 0; j < pisoactual.length; j++) {
        let nodo = pisoactual[j]
        let cantidadConexiones = Math.floor(Math.random() * 2) + 1;
      
        for (let c = 0; c < cantidadConexiones; c++) {
          let aleatorio = nodo +- Math.floor(Math.random() * 2) + 1;
          conexiones.push([nodo, aleatorio]);
        }
      }


}
for(let w = 0; w < conexiones.length-1;w++){
  if(conexiones[w][0] === conexiones[w+1][0] && conexiones[w][1] === conexiones[w+1][1]){
    conexiones.splice(w,1)
    w--
  }
}
return {grafo, conexiones}
}
subscribeGETEvent("mapa",generarmapa);
startServer(4000);