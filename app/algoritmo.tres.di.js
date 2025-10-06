// Algoritmo Ta-Te-Ti 3x3 Refactorizado con Inyección de Dependencias

import { BOARD_CONFIGS } from './config.js'
import {
  verifyWinner as verificarGanador,
  findImmediateWin as buscarMovimientoGanador,
  findStrategicCompletion as buscarMovimientoCompletar,
  selectPositionalMove as estrategiaPosicional,
  getOpponentPositions as obtenerPosicionesOponente,
  determinePlayerSymbols as determinarSimbolos
} from './algoritmo-base.js'
import { getStrategicMove } from './strategies/tres-strategies.js'

const CONFIG = BOARD_CONFIGS.TRES

/**
 * Algoritmo principal refactorizado con inyección de dependencias
 * @param {Array} board - Tablero del juego
 * @param {Array} emptyPositions - Posiciones vacías
 * @param {Object} dependencies - Dependencias inyectadas (opcional)
 * @returns {number} - Posición del movimiento
 */
function algoritmoTresRefactored (board, emptyPositions, dependencies = {}) {
  const {
    config = CONFIG,
    buscarMovimientoGanadorFn = buscarMovimientoGanador,
    buscarMovimientoCompletarFn = buscarMovimientoCompletar,
    estrategiaPosicionalFn = estrategiaPosicional,
    obtenerPosicionesOponenteFn = obtenerPosicionesOponente,
    determinarSimbolosFn = determinarSimbolos
  } = dependencies

  const vacias = emptyPositions.length
  const { miSimbolo, simboloOponente } = determinarSimbolosFn(vacias)

  // Movimiento 1: Centro
  if (vacias === config.size) {
    return config.center
  }

  // Movimiento 2: Centro o esquina
  if (vacias === config.size - 1) {
    if (emptyPositions.includes(config.center)) {
      return config.center
    }
    return estrategiaPosicionalFn(emptyPositions, config)
  }

  // Movimiento 3: Estrategia específica
  if (vacias === config.size - 2) {
    // Intentar ganar
    const movimientoGanador = buscarMovimientoGanadorFn(
      board,
      emptyPositions,
      miSimbolo,
      config.winningCombinations
    )
    if (movimientoGanador !== null) {
      return movimientoGanador
    }

    // Bloquear oponente
    const movimientoBloqueo = buscarMovimientoGanadorFn(
      board,
      emptyPositions,
      simboloOponente,
      config.winningCombinations
    )
    if (movimientoBloqueo !== null) {
      return movimientoBloqueo
    }

    // Estrategia posicional específica
    const posicionesO = obtenerPosicionesOponenteFn(board, simboloOponente)
    const posicionO = posicionesO[0]

    if (config.corners.includes(posicionO)) {
      // O en esquina - bloquear diagonal opuesta
      const strategicMove = getStrategicMove(posicionO, emptyPositions)
      if (strategicMove !== null) {
        return strategicMove
      }
    }

    if (posicionO === config.center) {
      // O en centro - tomar esquina
      const strategicMove = getStrategicMove(posicionO, emptyPositions)
      if (strategicMove !== null) {
        return strategicMove
      }
    }

    if (config.edges.includes(posicionO)) {
      // O en borde - bloquear fila/columna
      const strategicMove = getStrategicMove(posicionO, emptyPositions)
      if (strategicMove !== null) {
        return strategicMove
      }
    }

    return emptyPositions[0]
  }

  // Movimientos 4+: Estrategia avanzada
  if (vacias <= config.size - 3) {
    // Intentar ganar
    const movimientoGanador = buscarMovimientoGanadorFn(
      board,
      emptyPositions,
      miSimbolo,
      config.winningCombinations
    )
    if (movimientoGanador !== null) {
      return movimientoGanador
    }

    // Bloquear oponente
    const movimientoBloqueo = buscarMovimientoGanadorFn(
      board,
      emptyPositions,
      simboloOponente,
      config.winningCombinations
    )
    if (movimientoBloqueo !== null) {
      return movimientoBloqueo
    }

    // Completar combinación propia
    const movimientoCompletar = buscarMovimientoCompletarFn(
      board,
      emptyPositions,
      miSimbolo,
      config.winningCombinations
    )
    if (movimientoCompletar !== null) {
      return movimientoCompletar
    }

    // Bloquear combinación oponente
    const movimientoBloquearCombinacion = buscarMovimientoCompletarFn(
      board,
      emptyPositions,
      simboloOponente,
      config.winningCombinations
    )
    if (movimientoBloquearCombinacion !== null) {
      return movimientoBloquearCombinacion
    }

    // Estrategia posicional
    return estrategiaPosicionalFn(emptyPositions, config)
  }

  return emptyPositions[0]
}

// Exportar funciones para testing (usando alias de algoritmo-base.js)
export {
  verificarGanador,
  buscarMovimientoGanador,
  buscarMovimientoCompletar,
  estrategiaPosicional,
  obtenerPosicionesOponente,
  determinarSimbolos
}

export default algoritmoTresRefactored
