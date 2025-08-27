export {verestado, estado}
let estado = {
    muerto: "muerto",
    curarse: "curarse",
    defendiendo: "defendiendo",
    habilidad: "habilidad",
    aturdido: "aturdido",
    debuffeo: "debuffeo"
}
function verestado(monstruo,dañorecibido = null){
    monstruo.vida = monstruo.vida -dañorecibido;
    if (monstruo.vida <= 0) {
        console.log(estado.muerto)
      }
      if (monstruo.vida <= (monstruo.vidamax/10*3)) {
        console.log(estado.curarse)
        monstruo.vida = monstruo.vida + monstruo.vida * (0.3 + Math.random() * 0.2);
      }
      if (dañorecibido > 30) {
        console.log(estado.defendiendo)
      }
      /*if (habilidad) {
        console.log(estado.habilidad)
      }
      if (estado === estado.aturdido) {
        console.log(estado.aturdido)
      }
      if (buffeosjugador > 0) {
        console.log(estado.debuffeo)
      }
      */
}
