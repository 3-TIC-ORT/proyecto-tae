import fs from "fs"
export function reliquia_elite(){
let reliquias = JSON.parse(fs.readFileSync("../jsons/reliquias.json","utf-8"))
let adquiridas = JSON.parse(fs.readFileSync("../jsons/reliquiauso.json","utf-8"))
for(let i = 0;i<reliquias.length;i++){
let reliquia = reliquias[i]
for (let z = 0; z < adquiridas.length; z++) {
    if(reliquia === adquiridas[i]){
        reliquias.splice(i, 1);
        i--
    }    
}
}
fs.writeFileSync("../jsons/reliquias.json", JSON.stringify(reliquias, null, 2), "utf-8");
}