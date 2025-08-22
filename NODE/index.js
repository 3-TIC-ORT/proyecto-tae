let personaje = "";
let reliquia = "";
let vidamaxima = 0;
let oroinicial = 0;
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
quepersonaje(1);
console.log(personaje + " " + reliquia);
console.log("tu vida maxima e inicial es: " + vidamaxima + " y tu oro inicial es: " + oroinicial);