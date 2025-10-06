// Import shared utilities and strategies
import {
  determinePlayerSymbols,
  findImmediateWin,
  findImmediateBlock,
  findStrategicCompletion,
  selectPositionalMove,
  getOpponentPositions,
  verifyWinner
} from './algoritmo-base.js'
import { getStrategicMove } from './strategies/tres-strategies.js'
import { BOARD_CONFIGS } from './config.js'

const CONFIG = BOARD_CONFIGS.TRES

function algoritmoTres (board, emptyPositions) {
  const vacias = emptyPositions.length
  const { miSimbolo, simboloOponente } = determinePlayerSymbols(vacias)
  const posicionesVacias = emptyPositions

  // Movimiento 1: Centro
  if (vacias === CONFIG.size) {
    return CONFIG.center
  }

  // Movimiento 2: Centro o esquina
  if (vacias === CONFIG.size - 1) {
    return selectPositionalMove(posicionesVacias, CONFIG)
  }

  // Movimiento 3: Estrategia específica
  if (vacias === CONFIG.size - 2) {
    // Intentar ganar
    const movimientoGanador = findImmediateWin(board, posicionesVacias, miSimbolo, CONFIG.winningCombinations)
    if (movimientoGanador !== null) {
      return movimientoGanador
    }

    // Bloquear oponente
    const movimientoBloqueo = findImmediateBlock(board, posicionesVacias, simboloOponente, CONFIG.winningCombinations)
    if (movimientoBloqueo !== null) {
      return movimientoBloqueo
    }

    // Estrategia posicional específica
    const posicionesO = getOpponentPositions(board, simboloOponente)
    const posicionO = posicionesO[0]

    const strategicMove = getStrategicMove(posicionO, posicionesVacias)
    if (strategicMove !== null) {
      return strategicMove
    }

    return posicionesVacias[0]
  }

  // Movimientos 4+: Estrategia avanzada
  if (vacias <= CONFIG.size - 3) {
    // Intentar ganar
    const movimientoGanador = findImmediateWin(board, posicionesVacias, miSimbolo, CONFIG.winningCombinations)
    if (movimientoGanador !== null) {
      return movimientoGanador
    }

    // Bloquear oponente
    const movimientoBloqueo = findImmediateBlock(board, posicionesVacias, simboloOponente, CONFIG.winningCombinations)
    if (movimientoBloqueo !== null) {
      return movimientoBloqueo
    }

    // Completar combinación propia
    const movimientoCompletar = findStrategicCompletion(board, posicionesVacias, miSimbolo, CONFIG.winningCombinations)
    if (movimientoCompletar !== null) {
      return movimientoCompletar
    }

    // Bloquear combinación oponente
    const movimientoBloquearCombinacion = findStrategicCompletion(board, posicionesVacias, simboloOponente, CONFIG.winningCombinations)
    if (movimientoBloquearCombinacion !== null) {
      return movimientoBloquearCombinacion
    }

    // Estrategia posicional
    return selectPositionalMove(posicionesVacias, CONFIG)
  }

  return posicionesVacias[0]
}

// Re-export utility functions for testing
export {
  findImmediateWin as buscarMovimientoGanador,
  findStrategicCompletion as buscarMovimientoCompletar,
  selectPositionalMove as estrategiaPosicional,
  verifyWinner as verificarGanador
}

export default algoritmoTres
