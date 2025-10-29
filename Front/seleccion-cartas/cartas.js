document.addEventListener("DOMContentLoaded", () => {
  const cartasDisponibles = [
    // --- ATAQUE ---
    { nombre: "Golpe", clase: "carta-golpe" },
    { nombre: "Espada pesada", clase: "carta-espadaPesada" },
    { nombre: "Ira", clase: "carta-ira" },
    { nombre: "Ráfaga", clase: "carta-rafaga" },
    { nombre: "Festín", clase: "carta-festin" },
    { nombre: "Ataque rápido", clase: "carta-ataqueRapido" },
    { nombre: "Chapiadora.com", clase: "carta-chapiadora" },
    { nombre: "Promo 2027", clase: "carta-promo" },
    { nombre: "Choque", clase: "carta-choque" },
    { nombre: "Garrote", clase: "carta-garrote" },
    { nombre: "Zip", clase: "carta-zip" },
    { nombre: "Uppercut", clase: "carta-uppercut" },

    // --- DEFENSA ---
    { nombre: "Escudo", clase: "carta-escudo" },
    { nombre: "Trinchera", clase: "carta-trinchera" },
    { nombre: "Protector", clase: "carta-protector" },
    { nombre: "Heroico", clase: "carta-heroico" },
    { nombre: "Verdadero valor", clase: "carta-verdaderoValor" },
    { nombre: "Segundo aliento", clase: "carta-segundoAliento" },
    { nombre: "Defensa en placas", clase: "carta-defensaEnPlacas" },
    { nombre: "Estrategia defensiva", clase: "carta-estrategiaDefensiva" },
    { nombre: "Copa", clase: "carta-copa" },
    { nombre: "Auto-escudo", clase: "carta-autoEscudo" },
    { nombre: "Mutación", clase: "carta-mutacion" },
    { nombre: "Espadas orbitantes", clase: "carta-espadasOrbitantes" },

    // --- APOYO ---
    { nombre: "Flexionar", clase: "carta-flexionar" },
    { nombre: "Ritual", clase: "carta-ritual" },
    { nombre: "Doble ataque", clase: "carta-dobleAtaque" },
    { nombre: "Furia", clase: "carta-furia" },
    { nombre: "Columna suertuda", clase: "carta-columnaSuertuda" },
    { nombre: "Ataque ancestral", clase: "carta-ataqueAncestral" },
    { nombre: "Debilidad", clase: "carta-debilidad" },
    { nombre: "Barricada", clase: "carta-barricada" },
    { nombre: "Golpe de cuerpo", clase: "carta-golpeDeCuerpo" },
    { nombre: "Ignorar", clase: "carta-ignorar" },
    { nombre: "Lamento penetrante", clase: "carta-lamentoPenetrante" },
  ];

  connect2Server();

  const contenedores = document.getElementsByClassName("cartas");

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
});
