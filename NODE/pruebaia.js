import { verestado,estado } from "./ia.js";
let dañorecibido = 45;
let mounstro = [{nombre:"slime",vida:80,vidamax:80,habilidad:}]
mounstro[0].habilidad = mounstro.vida <= mounstro.vidamax / 2;
console.log(mounstro[0].habilidad)
let cartasjugadas = ["golpe","aturde"];
let buffeosJugador = 3
console.log(verestado(mounstro[0], dañorecibido, cartasjugadas, buffeosJugador, mounstro[0].habilidad()))