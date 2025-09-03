let grafo = [];
let conexiones = [];
let cantidadpisos = 10;
let finalboss = ["Final Boss"]
function numeroAleatorio() {
    return Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  }
for(let i = 0;i <= cantidadpisos;i++){
let piso = []
for(let z = 1; z <= numeroAleatorio(); z++){
    piso.push(i+"-"+z)  
}
grafo.push(piso)
}
grafo.push(finalboss)
console.log(grafo)
for (let i = 0; i < grafo.length - 1; i++) {
    let pisoactual = grafo[i];
    let pisosiguiente = grafo[i + 1];
    for (let j = 0; j < pisoactual.length; j++) {
        let nodo = pisoactual[j]
        let cantidadConexiones = Math.floor(Math.random() * 2) + 1;
      
        for (let c = 0; c < cantidadConexiones; c++) {
          let aleatorio = pisosiguiente[Math.floor(Math.random() * pisosiguiente.length)];
          conexiones.push([nodo, aleatorio]);
        }
      }


}
console.log(conexiones)