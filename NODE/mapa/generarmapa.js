/**
 * Genera un grafo de pisos para un juego o sistema de niveles,
 * asignando nodos a cada piso y creando conexiones aleatorias entre ellos.
 *
 * Recibe un objeto query con la cantidad de pisos que se deben generar.
 * Cada piso contiene entre 3 y 5 nodos, y cada nodo se conecta a 1 o 2 nodos
 * del piso siguiente, generando así un grafo semi-aleatorio.
 *
 * @param {Object} query - Parámetros enviados por la petición GET.
 * @param {number} query.cantidadpisos - Número de pisos que debe tener el grafo.
 * @returns {{grafo: string[][], conexiones: string[][]}}
 *   - grafo: Array de pisos, donde cada piso es un array de nodos en formato "i-z tipo".
 *   - conexiones: Array de pares [origen, destino] que representan conexiones entre pisos consecutivos.
 */
export function generarmapa(query){
let cantidadpisos = query && query.cantidadpisos ? parseInt(query.cantidadpisos) : 0;
console.log("Recibí petición con cantidadpisos =", cantidadpisos);
let grafo = [];
let conexiones = [];
let finalboss = ["Final Boss"]
function palabraaleatoria() {
  const rand = Math.random() * 100;
  if (rand < 30) {
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
  else if(i === cantidadpisos){
    piso.push(i+"-"+z+" "+"F")  
  }
  else{
    piso.push(i+"-"+z+" "+palabraaleatoria())  
  }
}
grafo.push(piso)
}
grafo.push(finalboss)

//conexion
for(let i = 0; i < grafo.length - 1;i++){
  let level = grafo[i]
  let nextlevel = grafo[i+1]
  for(let z = 0; z < level.length;z++){
      let node = level[z]
      let indiceNodo = parseInt(node.split("-")[1]);
      let cantidadConexiones = (indiceNodo === 0 || indiceNodo === level.length - 1) ? 2 : 3;
      for (let y = 0; y < cantidadConexiones; y++) {
        for(let o = 0; o < nextlevel.length;o++){
      let conectnode = nextlevel[o];
      if((conectnode.split("-")[1]-node.split("-")[1]) <= 1 && (conectnode.split("-")[1]-node.split("-")[1]) > -2){
      conexiones.push([node,conectnode])
     }       
    }
   }
  }
}
for(let w = 0; w < conexiones.length-1;w++){
  if(conexiones[w][0] === conexiones[w+1][0] && conexiones[w][1] === conexiones[w+1][1]){
    conexiones.splice(w,1)
    w--
  }
}

/*
for (let i = 0; i < grafo.length - 1; i++) {
    let pisoactual = grafo[i];
    let pisosiguiente = grafo[i + 1];
    for (let j = 0; j < pisoactual.length; j++) {
        let nodo = pisoactual[j]
        let cantidadConexiones = Math.floor(Math.random() * 2) + 1;
        for (let c = 0; c < cantidadConexiones; c++) {
          
function numcon(nodoactual, pisoLength) {
  const desplazamiento = Math.floor(Math.random() * 3) - 1;
  let nuevoIndice = nodoactual + desplazamiento;
  if (nuevoIndice < 0) nuevoIndice = 0;
  if (nuevoIndice >= pisoLength) nuevoIndice = pisoLength - 1;
  return nuevoIndice;
}

        let nodoactual = parseInt(nodo.split("-")[1]);
        let aleatorio = pisosiguiente[numcon(nodoactual, pisosiguiente.length)];
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
  */
return {grafo,conexiones}
}
