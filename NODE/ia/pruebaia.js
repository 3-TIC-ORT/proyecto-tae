import { verestado} from "./ia.js";
import fs from "fs";
let  mounstros =[{
    nombre : "",
    recompenzas : 0,
    habilidad : "",
    reliquia : false,
    tipo : "",
    cartas : 0
    }
]
let mounstro = {}
mounstros = JSON.parse(fs.readFileSync("jsons/mounstros.json","utf-8"));
for(let i = 0;i < mounstros.length;i++){
    if(mounstros[i].nombre === "slime"){
        mounstro = mounstros[i];
    }
}
console.log(mounstro.habilidad)
let dañorecibido = 0;
let cartasjugadas = ["golpe"];
let buffeosJugador = 0
console.log(verestado(mounstro, dañorecibido, cartasjugadas, buffeosJugador, mounstro.habilidad))