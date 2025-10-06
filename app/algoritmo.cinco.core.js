// Algoritmo Ta-Te-Ti 5x5 Refactorizado con Inyección de Dependencias

import { BOARD_CONFIGS } from './config.js'
// Importaciones legacy removidas - usando algoritmo-base.js
import {
  determinePlayerSymbols,
  findImmediateWin,
  findStrategicCompletion,
  selectPositionalMove,
  getOpponentPositions,
  verifyWinner
} from './algoritmo-base.js'
import { getStrategicMove5x5 } from './strategies/cinco-strategies.js'

const CONFIG = BOARD_CONFIGS.CINCO

/**
 * Algoritmo principal refactorizado con inyección de dependencias
 * @param {Array} board - Tablero del juego
 * @param {Array} emptyPositions - Posiciones vacías
 * @param {Object} dependencies - Dependencias inyectadas (opcional)
 * @returns {number} - Posición del movimiento
 */
function algoritmoCincoRefactored (board, emptyPositions, dependencies = {}) {
  const {
    config = CONFIG,
    buscarMovimientoGanadorFn = findImmediateWin,
    buscarMovimientoCompletarFn = findStrategicCompletion,
    estrategiaPosicionalFn = selectPositionalMove,
    obtenerPosicionesOponenteFn = getOpponentPositions,
    determinarSimbolosFn = determinePlayerSymbols
  } = dependencies

  const vacias = emptyPositions.length
  const { miSimbolo, simboloOponente } = determinarSimbolosFn(vacias)

  // Movimiento 1: Centro
  if (vacias === config.size) {
    return config.center
  }

  // Movimiento 2: Centro o esquina
  if (vacias === config.size - 1) {
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

    const strategicMove = getStrategicMove5x5(posicionO, emptyPositions)
    if (strategicMove !== null) {
      return strategicMove
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

// Re-export utility functions for testing
export {
  verifyWinner as verificarGanador,
  findImmediateWin as buscarMovimientoGanador,
  findStrategicCompletion as buscarMovimientoCompletar,
  selectPositionalMove as estrategiaPosicional,
  getOpponentPositions as obtenerPosicionesOponente,
  determinePlayerSymbols as determinarSimbolos
}

export default algoritmoCincoRefactored
