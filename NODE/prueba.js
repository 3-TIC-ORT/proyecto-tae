connect2Server()
let boton = document.getElementById("boton");
let input = document.getElementById("input");
let salida = document.getElementById("salida")
function mapa(data){
console.log(data)
} 

boton.addEventListener("click", () => {
    let pisos = parseInt(input.value);
    if (pisos <= 0) {
        alert("La cantidad de pisos no puede ser menor o igual a 0");
        return;
    }

    getEvent(`mapa?cantidadpisos=${pisos}`, (data) => {
        console.log("Mapa generado:", data);
        salida.innerText = JSON.stringify(data, null, 2);
    });
});
