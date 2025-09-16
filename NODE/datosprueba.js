import { quepersonaje, mazo, sumaescudo, reliquia } from './index.js';
let personaje = quepersonaje(1);
console.log(personaje)
let cartas = mazo("mostrar")
console.log(cartas)
sumaescudo(45);
reliquia(1,{nombre:"arveja",descripcion:"arveja laser"})
reliquia(4)
/*
console.log("en tu mazo hay: " + mazo("mostrar"));
console.log("robaste la carta: " + mazo("robas"));
console.log("agregaste esta carta: "+mazo("agregar", "ataque"));
console.log("en tu mazo hay: " + mazo("mostrar"));
console.log("hay esta cantidad de cartas en tu mazo: " + mazo("cantidad"));
*/