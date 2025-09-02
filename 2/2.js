let mago = document.getElementById("magician");
let oro = document.getElementById("li1")
let vida = document.getElementById("li2")

function statsmago(){
    oro.textContent = "Oro: 10";
    vida.textContent = "Vida: 20";
}

mago.addEventListener("click", statsmago);