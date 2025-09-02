export {verestado, estado}
let estado = {
    muerto: "muerto",
    curarse: "curarse",
    defendiendo: "defendiendo",
    habilidad: "habilidad",
    aturdido: "aturdido",
    debuffeo: "debuffeo"
}

function verestado(monstruo, dañorecibido, cartasjugadas, buffeosjugador, condicionhabilidad){
    monstruo.vida = monstruo.vida -dañorecibido;
    if (monstruo.vida <= 0) {
        return estado.muerto
      }
    if(condicionhabilidad === true){
        return estado.habilidad
      }

    if (monstruo.vida <= (monstruo.vidamax/10*3)) {
        monstruo.vida = monstruo.vida + monstruo.vida * (0.3 + Math.random() * 0.2);
        return estado.curarse
      }
    if (dañorecibido > 30) {
        return estado.defendiendo
      }
    for (let i = 0; i <= cartasjugadas.lenght ; i++){
        if(cartasjugadas[i] === "aturde"){
          return estado.aturdido
        }
      }
    if (buffeosJugador > 0) {
        return estado.debuffeo;
      }

}
