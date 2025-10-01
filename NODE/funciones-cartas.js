function daño_a_todos_enemigos() {
    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].vida -= 5;
    }
  }
  
  function mazo_robar() {
    if (mazo.length > 0) {
      jugador.mano.push(mazo.pop());
    }
  }
  
  function saltea_turno_contrincante() {
    contrincante.turno_saltado = true;
  }
  
  function agrega_ataque_azar(elixir) {
    const ataquesDisponibles = [
      { nombre: "Golpe", daño: 7, elixir: 1 },
      { nombre: "Espada pesada", daño: 15, elixir: 2 },
      { nombre: "Ira", daño: 8, elixir: 0 }
    ];
    const ataqueAleatorio = ataquesDisponibles[Math.floor(Math.random() * ataquesDisponibles.length)];
    jugador.mano.push(ataqueAleatorio);
  }
  
  function aumentar_vida_si_muerto() {
    if (mounstro.estado === 'muerto') {
      jugador.vidamax += 3;
    }
  }
  
  function cada_ataque_gana_defensa() {
    for (let i = 0; i < jugador.mano.length; i++) {
      if (jugador.mano[i].tipo === 'ataque') {
        jugador.mano[i].daño += 3;
      }
    }
  }
  
  function gana_escudo(escudo, turnos) {
    jugador.bloqueo += escudo;
    setTimeout(() => {
      jugador.bloqueo -= escudo;
    }, turnos * 1000);
  }
  
  function aplica_vulnerabilidad(cantidad) {
    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].mejoras.push('vulnerable');
    }
  }
  
  function proxima_carta_jugada_dos_veces() {
    jugador.proxima_carta_doble = true;
  }
  
  function ataque_con_aumento() {
    for (let i = 0; i < jugador.mano.length; i++) {
      if (jugador.mano[i].tipo === 'ataque' && jugador.mano[i].daño > 0) {
        jugador.mano[i].daño += jugador.mano[i].daño * 0.25;
      }
    }
  }
  
  function reduce_danio_a_enemigos(cantidad) {
    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].daño -= cantidad;
    }
  }
  
  function bloqueo_activo(turnos) {
    jugador.bloqueo += 10;
    setTimeout(() => {
      jugador.bloqueo -= 10;
    }, turnos * 1000);
  }
  
  function inflige_danio_igual_a_bloqueo() {
    for (let i = 0; i < enemigos.length; i++) {
      enemigos[i].vida -= jugador.bloqueo;
    }
  }
  
  function roba_3_cartas() {
    for (let i = 0; i < 3; i++) {
      if (mazo.length > 0) {
        jugador.mano.push(mazo.pop());
      }
    }
  }
  
  function no_robar_mas_turno() {
    jugador.no_robar = true;
  }
  
  function proximas_cartas_escudo_ganan(multiplicador) {
    for (let i = 0; i < jugador.mano.length; i++) {
      if (jugador.mano[i].tipo === 'defensa') {
        jugador.mano[i].bloqueo += jugador.mano[i].bloqueo * multiplicador;
      }
    }
  }
  