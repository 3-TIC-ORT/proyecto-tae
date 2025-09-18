import { quepersonaje, mazo, reliquia } from './index.js';
export {personaje,cartas,reliquias}
let personaje = quepersonaje(1);
let cartas = mazo("mostrar")
let reliquias = reliquia(0)

/*
console.log("en tu mazo hay: " + mazo("mostrar"));
console.log("robaste la carta: " + mazo("robas"));
console.log("agregaste esta carta: "+mazo("agregar", "ataque"));
console.log("en tu mazo hay: " + mazo("mostrar"));
console.log("hay esta cantidad de cartas en tu mazo: " + mazo("cantidad"));
*/