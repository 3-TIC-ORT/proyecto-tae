let personaje = "";
let reliquia = "";
let vidamaxima = 0;
let oroinicial = 0;
let cartas = ["ataque","ataque","escudo","escudo","porrazo"];
let cantidadescudo = 0
let reliquias = ["armadura de cobre","black star","sombrero magico"]
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
            personaje = "warrior";
            reliquia = "1";
            vidamaxima= 80;
            oroinicial = 99;
            break
        case 2:
            personaje = "mago";
            reliquia = "2";
            vidamaxima= 70;
            oroinicial= 150;
            break
        case 3:
            personaje = "valkiria";
            reliquia = "3";
            vidamaxima= 80;
            oroinicial= 125;
            break
        case 4:
            personaje = "packpocket";
            reliquia = "4";
            vidamaxima= 75;
            oroinicial= 50;
            break

    }
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
        console.log("las cartas en tu mazo son: " + cartas);
        break
        case "robas":
        let cartarobada = cartas.shift();
        console.log("la proxima carta a robar es: " + cartarobada);
        break
        case "agregar":
        if(carta){
            cartas.push(carta);
            console.log("agregaste la carta " + carta + " a tu mazo");
        }
        break
        case "cantidad":
        console.log(cartas.length);
        break
        default:
        console.log("no se reconocio la accion")
    }
}
function sumaescudo(escudoagregado){
    cantidadescudo = cantidadescudo + escudoagregado;
    console.log("cantidad de escudo del jugador es: " + cantidadescudo);
}
function reliquia(accion, indice = null){
    switch(accion){
        case "moastrar":
            console.log("las reliquias que tenes son: " + reliquias)
            break
        case "descripcion":
            switch(indice){
                case 1:
                console.log("tu reliquia es la armadura de cobre. Al inicio de cada combate contra élites o jefes, obtienes 10 de escudo que bloquea un daño fijo durante 3 turnos.");
                break
                case 2:
                console.log("tu reliquia es black star. Hace que los élites suelten dos reliquias en lugar de solo una.");
                break
                case 3:
                console.log("tu reliquia es el sombrero magico. 50% de descuento en todos los productos de la tienda");
            }

    }
}
function agregarreliquia(reliquiaagregada){
    reliquias.push(reliquiaagregada)
    console.log("se agrego la reliquia: " + reliquiaagregada)
}
quepersonaje(1);
console.log(personaje + " " + reliquia);
console.log("tu vida maxima e inicial es: " + vidamaxima + " y tu oro inicial es: " + oroinicial);
mazo("mostrar");
mazo("robas");
mazo("agregar", "ataque");
mazo("mostrar");
mazo("cantidad");
sumaescudo(45);
reliquia("mostrar")
reliquia("descripcion",1)
agregarreliquia("arveja")
reliquia("mostrar")