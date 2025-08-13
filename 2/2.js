let mago = document.getElementById("magician");

function statsmago(){
    let item = document.createElement("li");
    item.textContent = "Soy nuevo en la página";
    
    document.ul.appendChild(item);
}

mago.addEventListener("mouseenter", statsmago());