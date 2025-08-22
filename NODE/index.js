let personaje = "";
let reliquia = "";
let vidamaxima = 0;
let oroinicial = 0;
let mazo = ["ataque","ataque","escudo","escudo","porrazo"];
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
function analizarmazo(){
    
}
quepersonaje(1);
console.log(personaje + " " + reliquia);
console.log("tu vida maxima e inicial es: " + vidamaxima + " y tu oro inicial es: " + oroinicial);