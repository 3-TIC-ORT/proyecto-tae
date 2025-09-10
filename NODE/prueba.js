let boton = document.getElementById("boton");
let input = document.getElementById("input");
let salida = document.getElementById("salida")
function mapa(data){
console.log(data)
} 
let pisos = input.value;
boton.addEventListener("click", () => {if(pisos <= 0){alert("la cantidad de pisos no puede ser menor o igual a 0")}});
getEvent(`mapa?cantidadpisos=${pisos}`, (data) => {
    console.log("Mapa generado:", data);
    salida.innerText = JSON.stringify(data, null , 2);
});