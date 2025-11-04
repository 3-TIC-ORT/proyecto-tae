document.addEventListener("DOMContentLoaded", () => {
  const cartasDisponibles = [
    // --- ATAQUE ---
    { nombre: "Golpe", clase: "carta-golpe", tipo: "ataque" },
    { nombre: "Espada pesada", clase: "carta-espadaPesada", tipo: "ataque" },
    { nombre: "Ira", clase: "carta-ira", tipo: "ataque" },
    { nombre: "Rafaga", clase: "carta-rafaga", tipo: "ataque" },
    { nombre: "Festin", clase: "carta-festin", tipo: "ataque" },
    { nombre: "Ataque rapido", clase: "carta-ataqueRapido", tipo: "ataque" },
    { nombre: "Chapiadora.com", clase: "carta-chapiadora", tipo: "ataque" },
    { nombre: "Promo 2027", clase: "carta-promo", tipo: "ataque" },
    { nombre: "Choque", clase: "carta-choque", tipo: "ataque" },
    { nombre: "Garrote", clase: "carta-garrote", tipo: "ataque" },
    { nombre: "Zip", clase: "carta-zip", tipo: "ataque" },
    { nombre: "Uppercut", clase: "carta-uppercut", tipo: "ataque" },
  
    // --- DEFENSA ---
    { nombre: "Escudo", clase: "carta-escudo", tipo: "defensa" },
    { nombre: "Trinchera", clase: "carta-trinchera", tipo: "defensa" },
    { nombre: "Protector", clase: "carta-protector", tipo: "defensa" },
    { nombre: "Heroico", clase: "carta-heroico", tipo: "defensa" },
    { nombre: "Verdadero valor", clase: "carta-verdaderoValor", tipo: "defensa" },
    { nombre: "Segundo aliento", clase: "carta-segundoAliento", tipo: "defensa" },
    { nombre: "Defensa en placas", clase: "carta-defensaEnPlacas", tipo: "defensa" },
    { nombre: "Estrategia defensiva", clase: "carta-estrategiaDefensiva", tipo: "defensa" },
    { nombre: "Copa", clase: "carta-copa", tipo: "defensa" },
    { nombre: "Auto-escudo", clase: "carta-autoEscudo", tipo: "defensa" },
    { nombre: "Mutacion", clase: "carta-mutacion", tipo: "defensa" },
    { nombre: "Espadas orbitantes", clase: "carta-espadasOrbitantes", tipo: "defensa" },
  
    // --- APOYO ---
    { nombre: "Flexionar", clase: "carta-flexionar", tipo: "apoyo" },
    { nombre: "Ritual", clase: "carta-ritual", tipo: "apoyo" },
    { nombre: "Doble ataque", clase: "carta-dobleAtaque", tipo: "apoyo" },
    { nombre: "Furia", clase: "carta-furia", tipo: "apoyo" },
    { nombre: "Columna suertuda", clase: "carta-columnaSuertuda", tipo: "apoyo" },
    { nombre: "Ataque ancestral", clase: "carta-ataqueAncestral", tipo: "apoyo" },
    { nombre: "Debilidad", clase: "carta-debilidad", tipo: "apoyo" },
    { nombre: "Barricada", clase: "carta-barricada", tipo: "apoyo" },
    { nombre: "Golpe de cuerpo", clase: "carta-golpeDeCuerpo", tipo: "apoyo" },
    { nombre: "Ignorar", clase: "carta-ignorar", tipo: "apoyo" },
    { nombre: "Lamento penetrante", clase: "carta-lamentoPenetrante", tipo: "apoyo" },
  ];
  

  connect2Server();

  const contenedores = document.getElementsByClassName("cartasSeleccion");

  // 🔹 Función que devuelve N cartas aleatorias sin repetición
  function cartasRandomUnicas(cantidad) {
    const copia = [...cartasDisponibles]; // clonamos el array
    const seleccionadas = [];

    for (let i = 0; i < cantidad && copia.length > 0; i++) {
      const indice = Math.floor(Math.random() * copia.length);
      seleccionadas.push(copia.splice(indice, 1)[0]); // extrae una carta sin repetir
    }
    return seleccionadas;
  }

  // 🔹 Mostrar cartas únicas al cargar
  const cartasIniciales = cartasRandomUnicas(contenedores.length);

  for (let i = 0; i < contenedores.length; i++) {
    const contenedor = contenedores[i];
    const carta = cartasIniciales[i];

    contenedor.classList.add(carta.clase);
    console.log(`Carta inicial ${i + 1}: ${carta.nombre}`);
  }
  let cartaElegida = null; // Variable para guardar la carta seleccionada

  for (let i = 0; i < contenedores.length; i++) {
    const contenedor = contenedores[i];
    const carta = cartasIniciales[i];

    contenedor.classList.add(carta.clase);
    contenedor.dataset.nombre = carta.nombre;

    contenedor.addEventListener("click", () => {
      boton.disable = true;
      cartaElegida = carta.nombre;
      console.log("Carta elegida:", cartaElegida);

      const nodoActual = sessionStorage.getItem("nodoGanado");
      if (nodoActual) {
        sessionStorage.setItem("nodoGanado", nodoActual);
      }
      postEvent("modificar-mazo", {
        accion: "agregar",
        carta: cartaElegida,
      });
      window.location.href = "../mapa/index.html";
    });
  }
  let boton = document.getElementById("boton");
  function omitir(){
    window.location.href = "../mapa/index.html"
  }
    boton.addEventListener("click", omitir);
});
