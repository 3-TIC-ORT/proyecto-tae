import { verestado,estado } from "./ia.js";
let dañorecibido = 0;
let mounstro = [{nombre:"slime",vida:30,vidamax:80,habilidad:false}]
mounstro[0].habilidad = mounstro[0].vida <= mounstro[0].vidamax / 2;
let cartasjugadas = ["golpe","aturde"];
let buffeosJugador = 3
console.log(verestado(mounstro[0], dañorecibido, cartasjugadas, buffeosJugador, mounstro[0].habilidad))