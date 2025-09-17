import { quepersonaje, mazo, sumaescudo, reliquia } from './index.js';
export {personaje,cartas,reliquias}
let personaje = quepersonaje(1);
console.log(personaje)
let cartas = mazo("mostrar")
console.log(cartas)
console.log(sumaescudo(45));
console.log(reliquia("armadura de cobre"))
console.log(reliquia(0,{nombre:"arveja",descripcion:"arveja laser"}))
console.log(reliquia("arveja"))
let reliquias = reliquia(0)

/*
console.log("en tu mazo hay: " + mazo("mostrar"));
console.log("robaste la carta: " + mazo("robas"));
console.log("agregaste esta carta: "+mazo("agregar", "ataque"));
console.log("en tu mazo hay: " + mazo("mostrar"));
console.log("hay esta cantidad de cartas en tu mazo: " + mazo("cantidad"));
*/