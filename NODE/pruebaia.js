import { verestado,estado } from "./ia.js";
let dañorecibido = 80;
let mounstro = {
    vida:80,
    vidamax:80
}
verestado(mounstro, dañorecibido)
console.log(mounstro.vida)
