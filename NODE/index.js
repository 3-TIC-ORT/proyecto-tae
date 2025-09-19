export {quepersonaje, sumaescudo, reliquia, mazo};
let personaje = "";
let reliquiainicial = "";
let vidamaxima = 0;
let oroinicial = 0;
let cartas = ["ataque","ataque","escudo","escudo","porrazo"];
let cantidadescudo = 0
let reliquias = [{nombre:"armadura de cobre", descripcion:"Al inicio de cada combate contra élites o jefes, obtienes 10 de escudo que bloquea un daño fijo durante 3 turnos."},{nombre:"black star" ,descripcion:"Hace que los élites suelten dos reliquias en lugar de solo una."},{nombre:"Sombrero magico",descripcion:"50% de descuento en todos los productos de la tienda"}]
/**
 * Configura las propiedades del personaje según el número proporcionado.
 *
 * Esta función asigna el nombre del personaje, la reliquia asociada, la vida máxima
 * y el oro inicial según el valor de `numpersonaje`. Los valores se guardan en variables
 * globales.
 *
 * Parámetros:
 * @param {number} numpersonaje - Número que representa el personaje a seleccionar.
 *                               - 1: Warrior
 *                               - 2: Mago
 *                               - 3: Valkiria
 *                               - 4: Packpocket
 *
 * Variables globales modificadas:
 * - personaje (string): Nombre del personaje seleccionado.
 * - reliquia (string): Identificador de la reliquia del personaje.
 * - vidamaxima (number): Vida máxima del personaje.
 * - oroinicial (number): Oro inicial del personaje.
 *
 * Ejemplo de uso:
 * quepersonaje(1);
 * console.log(personaje); // "warrior"
 * console.log(vidamaxima); // 80
 */
function quepersonaje(numpersonaje){
    switch(numpersonaje){
        case 1:
            personaje = {
            nombre:"warrior",
            reliquiainicial: "1",
            vidamaxima: 80,
            oroinicial: 99
        }
            break
        case 2:
            personaje = {
            nombre: "mago",
            reliquiainicial: "2",
            vidamaxima: 70,
            oroinicial: 150
        }
            break
        case 3:
            personaje = {
            nombre: "valkiria",
            reliquiainicial: "3",
            vidamaxima: 80,
            oroinicial: 125
        }
            break
        case 4:
            personaje = {
            nombre: "packpocket",
            reliquiainicial: "4",
            vidamaxima: 75,
            oroinicial: 50
        }
            break

    }
    return personaje
}
 /**
  * Gestiona un mazo de cartas, permitiendo mostrar, robar, agregar y contar las cartas.
  *
  * @param {string} accion - La acción a realizar en el mazo. Puede ser:
  * - "mostrar": Muestra todas las cartas del mazo.
  * - "robas": Roba la primera carta del mazo (elimina y devuelve el primer elemento del array).
  * - "agregar": Agrega una carta al final del mazo.
  * - "cantidad": Muestra la cantidad total de cartas en el mazo.
  * @param {* | null} [carta=null] - (Opcional) La carta a agregar. Solo se utiliza con la acción "agregar".
  * @returns {void} Esta función no devuelve ningún valor, solo imprime mensajes en la consola.
  */
function mazo(accion, carta = null){
    switch (accion){
        case "mostrar":
        return cartas;
        case "robas":
        let cartarobada = cartas.shift();
        return  cartarobada;

        case "agregar":
        if(carta){
            cartas.push(carta);
            return carta;
        }
        
        case "cantidad":
        return(cartas.length);
        default:
        return("Error")
    }
}
/**
 * Añade una cantidad especificada al total actual de escudo del jugador.
 *
 * @param {number} escudoagregado - La cantidad de escudo que se desea sumar al total.
 *
 * Esta función incrementa la variable global `cantidadescudo` con el valor proporcionado
 * y luego imprime en consola la nueva cantidad total de escudo del jugador.
 *
 * Ejemplo de uso:
 * sumaescudo(10);
 * // consola: "cantidad de escudo del jugador es: 10"
 */
function sumaescudo(escudoagregado){
    cantidadescudo = cantidadescudo + escudoagregado;
    return cantidadescudo;
}
/**
 * Muestra información de una reliquia específica y opcionalmente agrega una nueva reliquia al arreglo.
 *
 * @param {number} indice - El índice (1-based) de la reliquia en el arreglo `reliquias` para mostrar su información.
 * @param {object|null} [agregar=null] - Un objeto que representa una nueva reliquia para agregar al arreglo `reliquias`. Si no se proporciona, no se agrega nada.
 *
 * Descripción:
 * - Recorre el arreglo `reliquias` y busca la reliquia que coincide con la posición `indice` (considerando que `indice` es 1-based).
 * - Si la encuentra, imprime en consola el nombre y la descripción de esa reliquia.
 * - Si el parámetro `agregar` no es nulo, agrega ese objeto al arreglo `reliquias` e imprime un mensaje de confirmación.
 *
 * Ejemplo de uso:
 * reliquia(2);
 * // Muestra el nombre y descripción de la segunda reliquia en el arreglo.
 *
 * reliquia(1, { nombre: "Reliquia nueva", descripcion: "Una reliquia mágica." });
 * // Muestra la primera reliquia y luego agrega la nueva reliquia al arreglo.
 */
function reliquia( nombrereliquia , agregar = null){
    if((nombrereliquia === 0 || nombrereliquia === "ninguno") && agregar){
        reliquias.push(agregar);
        return reliquias[reliquias.length-1]
    }
    if((nombrereliquia === 0 || nombrereliquia === "ninguno") && agregar === null){
    return reliquias    
    }
    
    else{
    for(let i = 0; i < reliquias.length;i++){
        if (reliquias[i].nombre === nombrereliquia){
            return ({nombre:reliquias[i].nombre,
                  descripcion:reliquias[i].descripcion});
        }
    }
    }
}