<template>
  <div class='game' id='game'>
    <h2> {{$t('GAME.LEVEL')}}: {{ nivel.number }} </h2>
    <h3> {{ nivel.title }} </h3>
    <div class='tablero' :style='cssVarsTablero'>
      <div v-for='(fila, indexFila) in computedGrilla' v-bind:key='indexFila'>
        <div class='fila' :style='cssVarsFila'>
          <div v-for='(casilla, indexCasilla) in fila' v-bind:key='indexCasilla'>
            <div class='casilla' :style='cssVarsCasilla'>
              <img class='asset' :style='cssVarsAsset' src='/img/ground.gif'>
              <img class='asset' :style='cssVarsAsset' v-if='pertenece(casilla, ".*+")' src='/img/goal.gif'>
              <img class='asset' :style='cssVarsAsset' v-if='pertenece(casilla, "@+")' :src='`${playerAsset}`'>
              <img class='asset' :style='cssVarsAsset' v-if='pertenece(casilla, "$*")' src='/img/box.gif'>
              <img class='asset' :style='cssVarsAsset' v-if='pertenece(casilla, "#")' src='/img/wall.gif'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='controls'>
      <button type='button' class='controls-button controls-button-arrow-up' v-on:click='realizar_movimiento("NORTE")'> {{$t('GAME.UP')}} </button>
      <button type='button' class='controls-button controls-button-arrow-left' v-on:click='realizar_movimiento("ESTE")'> {{$t('GAME.LEFT')}} </button>
      <button type='button' class='controls-button controls-button-arrow-right' v-on:click='realizar_movimiento("OESTE")'> {{$t('GAME.RIGHT')}} </button>
      <button type='button' class='controls-button controls-button-arrow-down' v-on:click='realizar_movimiento("SUR")'> {{$t('GAME.DOWN')}} </button>
      <button type='button' class='controls-button controls-button-reset' v-on:click='deshacer()'> {{$t('GAME.UNDO')}} </button>
      <button type='button' class='controls-button controls-button-undo' v-on:click='reiniciar()'> {{$t('GAME.RESET')}} </button>
    </div>
  </div>
</template>

<script scoped lang='ts'>
import { Vue } from 'vue-class-component';
import { getLevel as backendPlaceholderGetLevel, updateRanking as backendPlaceholderUpdateRanking, } from '../backendPlaceholder';
import { Level, LevelDescription, Grilla, Coordenada, Direccion, Historial } from '../backendPlaceholder/types';

export default class Game extends Vue {
  private playerName = 'unknown';

  public nivel: Level = {
    number: 1,
    title: '',
    description: [
      '####  ',
      '# .#  ',
      '#  ###',
      '#*@  #',
      '#  $ #',
      '#  ###',
      '####  ',
    ],
    creator: '',
  };
  public playerAsset: string = '/img/player.gif';
  private nFilas: number = 7;
  private nColumnas: number = 6;

  private grilla: Grilla | null = null;
  private tiempo: number | null = null;
  private sigNivel: Level | null = null;
  
  private movimientos: Historial = [];

  private coordenadas: Record<Coordenada, Direccion> = {
    NORTE: [0, -1],
    OESTE: [-1, 0],
    SUR: [0, 1],
    ESTE: [1, 0],
  };
  private imgSize: number = 64;

  public created(): void {
    this.getPlayerName();
    this.grilla = this.crear_grilla(this.nivel.description);
    this.guardarEstadoInicial(this.grilla, this.movimientos);
    this.getLevel(this.nivel.number + 1);
  }

  public mounted(): void {
    this.setWindowSize()
    this.tiempo = Date.now();
    window.addEventListener('resize', this.setWindowSize);
    window.addEventListener('keydown', this.keyDown);
  }

  public beforeUnmount(): void {
    window.removeEventListener('resize', this.setWindowSize);
    window.removeEventListener('keydown', this.keyDown);
  }

  public deshacer(): void {
  /* Deshace el ultimo movimiento */
    this.grilla = this.ultimoMovimiento(this.movimientos);
  }

  public reiniciar(): void {
  /* Reinicia la grilla actual y la lista de movimientos */
    this.movimientos = [],
    this.grilla = this.crear_grilla(this.nivel.description);
    this.guardarEstadoInicial(this.grilla, this.movimientos);
  }

  public realizar_movimiento(coordenada: Coordenada): void {
  /* apila el último movimiento al historial y mueve al jugador */
    if (!this.grilla) { throw new Error('Unexpected error, non-existent grid state') }
    this.grilla = this.mover(this.grilla, this.coordenadas[coordenada]);
    this.movimientos = this.historial(this.grilla, this.movimientos);
    if (this.juego_ganada(this.grilla)) {
      this.siguiente_nivel()
    }
  }

  public pertenece(asset: string, arrAssets: string) {
    /* Recibe un asset y una array de assets, devuelve true si el asset pertenece al array */
    return arrAssets.includes(asset)
  }

  private getPlayerName(): void {
  /* Obtiene desde la URL el identificador que indico el jugador desde userConfig */
    const currentURL = window.location.href;
    const URLParts = currentURL.split('/');
    this.playerName = URLParts[URLParts. length - 1];
  }

  private setWindowSize(): void {
  /* Calcula el tamaño de imagen del asset en funcion del tamaño del componente, máximo 64px */
    let elm = document.getElementById('game');
    if (!elm) {
      throw new Error('No game HTMLElement founded')
    }
    let maxWidth = elm.clientWidth;
    let assetWidth = maxWidth / (this.nColumnas + 1);
    this.imgSize = assetWidth > 64 ? 64 : assetWidth;
  }

  private keyDown(event: KeyboardEvent): void {
    /* Recive un evento keyDown, si la tecla coincide realiza una acción */
    if ([37, 38, 39, 40].includes(event.keyCode)) {
      event.preventDefault();
    }
    if ([38, 87].includes(event.keyCode)) {
      this.realizar_movimiento('NORTE');
    } else if ([37, 65].includes(event.keyCode)) {
      this.realizar_movimiento('ESTE');
    } else if ([39, 68].includes(event.keyCode)) {
      this.realizar_movimiento('OESTE');
    } else if ([40, 83].includes(event.keyCode)) {
      this.realizar_movimiento('SUR');
    } else if ([90].includes(event.keyCode)) {
      this.deshacer();
    } else if ([82].includes(event.keyCode)) {
      this.reiniciar();
    }
  }

  private siguiente_nivel(): void {
  /* Informa al servidor los resultados del nivel anterior, inicializa el nivel actual y pide al servidor el proximo nivel */
    this.easterEgggetPlayerAsset();
    this.updateRanking();
    this.movimientos = [];
    this.nivel = Object.assign({}, this.sigNivel);
    this.nFilas = this.dimensiones(this.nivel.description)[1];
    this.nColumnas = this.dimensiones(this.nivel.description)[0];
    this.grilla = this.crear_grilla(this.nivel.description);
    this.guardarEstadoInicial(this.grilla, this.movimientos);
    this.setWindowSize();
    this.getLevel(this.nivel.number + 1);
  }

  private crear_grilla(desc: LevelDescription): Grilla {
  /* Crea una grilla a partir de la descripción del estado inicial.
      La descripción es una lista de cadenas, cada cadena representa una
      fila y cada caracter una celda. Los caracteres pueden ser los siguientes:
      Caracter  Contenido de la celda
      --------  ---------------------
          #  Pared
          $  Caja
          @  Jugador
          .  Objetivo
          *  Objetivo + Caja
          +  Objetivo + Jugador
      Ejemplo:
      >>> crear_grilla([
          '#####',
          '#.$ #',
          '#@  #',
          '#####',
    ]) */
    let grilla = [];
    let fila = [];
    for (let i = 0; i < desc.length ; i++) {
      let cadena = desc[i];
      for (let j = 0; j < cadena.length ; j++) {
        let caracter = cadena[j];
        if ( '#$@.* +'.includes(caracter) ) {
          fila.unshift(caracter);
        }
      }
      grilla.push(fila);
      fila = [];
    }
    return grilla
  }

  private dimensiones(grilla: Grilla | LevelDescription): [number, number] {
  /* Devuelve una tupla con la cantidad de columnas y filas de la grilla. */
    return [grilla[0].length, grilla.length]
  }

  private hay_pared(grilla: Grilla, c: number, f: number): boolean {
  /* Devuelve True si hay una pared en la columna y fila (c, f). */
    return grilla[f][c] == '#'
  }

  private hay_objetivo(grilla: Grilla, c: number, f: number): boolean {
  /* Devuelve True si hay un objetivo en la columna y fila (c, f). */
    return '.*+'.includes(grilla[f][c])
  }

  private hay_caja(grilla: Grilla, c: number, f: number): boolean {
  /* Devuelve True si hay una caja en la columna y fila (c, f). */
    return '$*'.includes(grilla[f][c])
  }

  private hay_jugador(grilla: Grilla, c: number, f: number): boolean {
  /* Devuelve True si el jugador está en la columna y fila (c, f).*/
    return '@+'.includes(grilla[f][c])
  }

  private juego_ganada(grilla: Grilla): boolean {
  /* Devuelve True si el juego está ganado. */
    for (let i = 0; i < grilla.length; i++) {
      let fila = grilla[i];
      if (fila.includes('.') || fila.includes('+')) {
        return false
      }
    }
    return true
  }

  private busca_jugador(grilla: Grilla): [number, number] {
  /* Devuelve una tupla con la posición del jugador en la columna y fila de la grilla. */
    let dimension = this.dimensiones(grilla);
    for (let f = 0; f < dimension[1]; f++) {
      for (let c = 0; c < dimension[0]; c++) {
        if (this.hay_jugador(grilla, c, f)) {
          return [c, f]
        }
      }
    }
    throw new Error('Invalid grid description');
  }

  private mover(grilla: Grilla, direccion: Direccion): Grilla {
  /* Mueve el jugador en la dirección indicada.
  La dirección es una tupla con el movimiento horizontal y vertical. Dado que
  no se permite el movimiento diagonal, la dirección puede ser una de cuatro
  posibilidades:
  direccion  significado
  ---------  -----------
  (-1, 0)    Oeste
  (1, 0)     Este
  (0, -1)    Norte
  (0, 1)     Sur
  La función debe devolver una grilla representando el estado siguiente al
  movimiento efectuado. La grilla recibida NO se modifica; es decir, en caso
  de que el movimiento sea válido, la función devuelve una nueva grilla. */
    let grilla_movida = grilla;
    let posicion_jugador = this.busca_jugador(grilla);
    let posicion_deseada = [(posicion_jugador[0] + direccion[0]),(posicion_jugador[1] + direccion[1])];
    let posicion_deseada_2 = [(posicion_deseada[0] + direccion[0]),(posicion_deseada[1] + direccion[1])];
    if (this.hay_pared(grilla, posicion_deseada[0], posicion_deseada[1])) {
      return grilla_movida
    }
    if (this.hay_caja(grilla, posicion_deseada[0], posicion_deseada[1])) {
      if (this.hay_pared(grilla, posicion_deseada_2[0], posicion_deseada_2[1])) {
        return grilla_movida
      }
      if (this.hay_caja(grilla, posicion_deseada_2[0], posicion_deseada_2[1])) {
        return grilla_movida
      }
      if (this.hay_objetivo(grilla, posicion_deseada_2[0], posicion_deseada_2[1])) {
        grilla_movida[posicion_deseada_2[1]][posicion_deseada_2[0]] = '*';
      } else {
        grilla_movida[posicion_deseada_2[1]][posicion_deseada_2[0]] = '$';
      }
    }
    if (this.hay_objetivo(grilla, posicion_deseada[0], posicion_deseada[1])) {
      grilla_movida[posicion_deseada[1]][posicion_deseada[0]] = '+';
    } else {
      grilla_movida[posicion_deseada[1]][posicion_deseada[0]] = '@';
    }
    if (this.hay_objetivo(grilla, posicion_jugador[0], posicion_jugador[1])) {
      grilla_movida[posicion_jugador[1]][posicion_jugador[0]] = '.';
    } else {
      grilla_movida[posicion_jugador[1]][posicion_jugador[0]] = ' ';
    }
    return grilla_movida
  }

  private guardarEstadoInicial(grilla: Grilla, movimientos: Historial): void {
    movimientos.push(JSON.parse(JSON.stringify(grilla)));
  }

  private historial(grilla: Grilla, movimientos: Historial): Historial {
  /* Recibe un estado de la grilla y una lista. Si la lista no tiene estados o el ultimo estado es diferente al estado actual, apila el nuevo estado */
    if (movimientos.length == 0) {
      throw new Error('Unexpected error')
    }
    if (JSON.stringify(grilla) === JSON.stringify(movimientos[movimientos.length - 1])) {
      return movimientos
    }
    movimientos.push(JSON.parse(JSON.stringify(grilla)));
    return movimientos
  }

  private ultimoMovimiento(movimientos: Historial): Grilla {
  /* Recibe una lista de movimientos. Si hay más de un elemento borra y devuelve el ultimo (el nuevo ultimo, no el borrado), si no; devuelve el primero */
    if (movimientos.length == 1) {
      return JSON.parse(JSON.stringify(movimientos[0]))
    }
    movimientos.pop();
    return JSON.parse(JSON.stringify(movimientos[movimientos.length - 1]))
  }

  private getLevel(n: number): void {
  /* Envia un peticion al servidor del nivel pasado por parametro y lo almacena en this.sigNivel */
    this.sigNivel = backendPlaceholderGetLevel(n);
  }

  private updateRanking(): void {
  /* Envia una peticion al servidor con un nombre de usuario el numero de nivel y el tiempo tardado */
  if (!this.tiempo) { throw new Error('Invalid time') }
  backendPlaceholderUpdateRanking(this.playerName, this.nivel.number, (Date.now() - this.tiempo));
  }

  private easterEgggetPlayerAsset(): void {
  /* Pequeño easterEgg que cambia el asset del jugador aprox 1 vez cada 10000 niveles superados, codigo ofuscado adrede */
    if (Math.ceil(10/4/1997) == Math.floor(Math.random()*10000)) {
      console.log('Somebody once told me...');
      this.playerAsset = '/img/easterEgg.gif';
    }
  }

  get computedGrilla(): Grilla {
    return this.grilla!;
  }

  get cssVarsTablero() {
    return {
      'width': (this.imgSize * this.nColumnas) + 'px',
      'height': (this.imgSize * this.nFilas) + 'px'
    }
  }

  get cssVarsFila() {
    return {
      'width': (this.imgSize * this.nColumnas) + 'px',
      'height': this.imgSize + 'px'
    }
  }

  get cssVarsCasilla() {
    return {
      'width': this.imgSize + 'px',
      'height': this.imgSize + 'px'
    }
  }

  get cssVarsAsset() {
    return {
      'width': this.imgSize + 'px'
    }
  }

}
</script>

<style scoped>
.game {
  width: 90vw;
  background-color: #222;
  padding-top: 2vh;
  padding-bottom: 7vh;
  padding-left: 1vw;
  padding-right: 1vw;
  color: #fff;
}
.game h2 {
  color: #fff;
  font-size: 25px;
  letter-spacing: 2px;
  margin: 0;
}
.game h3 {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 22px;
  letter-spacing: 2px;
  margin-bottom: 2vh;
}
.tablero {
  background-color: #222;
  margin: 0px auto;
}
.casilla {
  float: right;
}
.asset {
  display: block;
  position: absolute;
  height: auto;
}
.controls {
  background-color: #222;
  border: 2px solid #fff;
  border-radius: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  margin:0px auto;
  margin-top: 5vh;
  padding: 10px;
  max-width: 400px;
  max-height: 625px;
  width: 100%;
  height: 50%;
  column-gap: 1vw;
  row-gap: 1vw;
}
.controls-button {
  background-color: #222;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 12px;
  font-weight: bold;

  width: 100%;
  height: 10vh;
}
.controls-button:hover {
  color: #32ed43;
  border: 2px solid #32ed43;
}
.controls-button-arrow-up {
  grid-column: 2;
  grid-row: 1;
  align-self: center;
  justify-self: center;
}
.controls-button-arrow-left {
  grid-column: 1;
  grid-row: 2;
  align-self: center;
  justify-self: center;
}
.controls-button-arrow-right {
  grid-column: 3;
  grid-row: 2;
  align-self: center;
  justify-self: center;
}
.controls-button-arrow-down {
  grid-column: 2;
  grid-row: 2;
  align-self: center;
  justify-self: center;
}
.controls-button-reset {
  grid-column: 1/4;
  grid-row: 3;
  align-self: center;
  max-width: 100%;
  width: 100%;
}
.controls-button-undo {
  grid-column: 1/4;
  grid-row: 4;
  align-self: center;
  max-width: 100%;
  width: 100%;
}
</style>
