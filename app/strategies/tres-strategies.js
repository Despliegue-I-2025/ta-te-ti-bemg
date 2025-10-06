// 3x3 Tic-Tac-Toe Strategy Functions
// Extracted from algoritmo.tres.core.js for better testability

import { BOARD_CONFIGS } from '../config.js'

const CONFIG = BOARD_CONFIGS.TRES

/**
 * Handle opponent in corner position - block opposite diagonal
 * @param {number} opponentPos - Opponent's position
 * @param {Array} emptyPositions - Available empty positions
 * @returns {number|null} Blocking position or null if not available
 */
export function handleOpponentInCorner(opponentPos, emptyPositions) {
  if (!CONFIG.corners.includes(opponentPos)) {
    return null
  }

  const diagonalOpuesta = CONFIG.diagonalOpposites[opponentPos]
  if (
    diagonalOpuesta !== undefined &&
    emptyPositions.includes(diagonalOpuesta)
  ) {
    return diagonalOpuesta
  }

  return null
}

/**
 * Handle opponent in center position - take any available corner
 * @param {Array} emptyPositions - Available empty positions
 * @returns {number|null} Corner position or null if none available
 */
export function handleOpponentInCenter(emptyPositions) {
  const esquinasDisponibles = CONFIG.corners.filter(pos =>
    emptyPositions.includes(pos)
  )

  if (esquinasDisponibles.length > 0) {
    return esquinasDisponibles[0]
  }

  return null
}

/**
 * Handle opponent in edge position - block row or column
 * @param {number} opponentPos - Opponent's position
 * @param {Array} emptyPositions - Available empty positions
 * @param {number} boardSize - Board size (3 for 3x3)
 * @returns {number|null} Blocking position or null if not available
 */
export function handleOpponentInEdge(
  opponentPos,
  emptyPositions,
  boardSize = 3
) {
  if (!CONFIG.edges.includes(opponentPos)) {
    return null
  }

  const fila = Math.floor(opponentPos / boardSize)
  const columna = opponentPos % boardSize

  // Check row positions (same row, different columns)
  for (let i = 0; i < boardSize; i++) {
    const posFila = fila * boardSize + i
    if (emptyPositions.includes(posFila) && posFila !== opponentPos) {
      return posFila
    }
  }

  // Check column positions (same column, different rows)
  for (let i = 0; i < boardSize; i++) {
    const posColumna = i * boardSize + columna
    if (emptyPositions.includes(posColumna) && posColumna !== opponentPos) {
      return posColumna
    }
  }

  return null
}

/**
 * Get the best strategic move when opponent is in a specific position
 * @param {number} opponentPos - Opponent's position
 * @param {Array} emptyPositions - Available empty positions
 * @returns {number|null} Best strategic move or null if none available
 */
export function getStrategicMove(opponentPos, emptyPositions) {
  // Try corner strategy first
  const cornerMove = handleOpponentInCorner(opponentPos, emptyPositions)
  if (cornerMove !== null) {
    return cornerMove
  }

  // Try center strategy
  if (opponentPos === CONFIG.center) {
    return handleOpponentInCenter(emptyPositions)
  }

  // Try edge strategy
  return handleOpponentInEdge(opponentPos, emptyPositions)
}
