connect2Server()
let boton = document.getElementById("boton");
let input = document.getElementById("input");
let salida = document.getElementById("salida")
let guardar = document.getElementById("guardar")
let mazo = document.getElementById("mazo")
let carta = document.getElementById("carta")
let agregar = document.getElementById("agregar")
let eliminar = document.getElementById("eliminar")
let reliquias = document.getElementById("reliquias")
let reliquia = document.getElementById("reliquia")
let agregarreliquia = document.getElementById("agregar-reliquia")
let mercado = document.getElementById("mercado")
function mapa(data){
    console.log(data)
} 
mercado.addEventListener("click",() => {
    getEvent("mercado",(data)=>{
        
        salida.innerText = JSON.stringify(data,null,2)
    })
})
reliquias.addEventListener("click",() => {
    getEvent("reliquia",(data)=>{
        salida.innerText = JSON.stringify(data,null,2)
    })
}) 
agregarreliquia.addEventListener("click",()=>{
    console.log("modificando reliquias")
    postEvent("agregar-reliquia",reliquia.value)
})

agregar.addEventListener("click",()=>{
    console.log("modificando mazo")
    postEvent("modificar-mazo",{accion:"agregar",carta:carta.value})
})
eliminar.addEventListener("click",()=>{
    console.log("modificando mazo")
    postEvent("modificar-mazo",{accion:"eliminar",carta:carta.value})
})
mazo.addEventListener("click",() => {
    getEvent("mazo",(data)=>{
        salida.innerText = JSON.stringify(data,null,2)
    })
})  
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
guardar.addEventListener("click",() => {
    postEvent("guardar",true)})
