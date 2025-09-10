let boton = document.getElementById("boton");

function mapa(data){
console.log(data)
}
getEvent("mapa",mapa) 

boton.addEventListener("click", mapa);
