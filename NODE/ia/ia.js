export {verestado}
function verestado(monstruo, dañorecibido, cartasjugadas, buffeosjugador, condicionhabilidad){
let estado = {
    muerto: "muerto",
    curarse: "curarse",
    defendiendo: "defendiendo",
    habilidad: "habilidad",
    aturdido: "aturdido",
    debuffeo: "debuffeo",
    atacar: "atacar"
}
  monstruo.vida = monstruo.vida -dañorecibido;
    if (monstruo.vida <= 0) {
        return estado.muerto
      }
    else if(condicionhabilidad === true){
        return estado.habilidad
      }
    else if (monstruo.vida <= (monstruo.vidamax/10*3)) {
        monstruo.vida = monstruo.vida + monstruo.vida * (0.3 + Math.random() * 0.2);
        return estado.curarse
      }
    else if (dañorecibido > 30) {
        return estado.defendiendo
      }
    for (let i = 0; i <= cartasjugadas.length ; i++){
        if(cartasjugadas[i] === "aturde"){
          return estado.aturdido
        }
      }
    if (buffeosjugador > 0) {
        return estado.debuffeo;
      }
    else{
      return estado.atacar
    }

}
