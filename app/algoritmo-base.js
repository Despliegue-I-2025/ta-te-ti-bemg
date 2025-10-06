// Base Algorithm Utilities for Tic-Tac-Toe
// Extracted shared logic from both 3x3 and 5x5 algorithms

import { BOARD_CONFIGS, SYMBOLS } from './config.js';

/**
 * Determine player and opponent symbols based on empty positions count
 * @param {number} emptyCount - Number of empty positions on the board
 * @returns {Object} Object with miSimbolo and simboloOponente
 */
export function determinePlayerSymbols(emptyCount) {
  const somosX = emptyCount % 2 === 1;
  return {
    miSimbolo: somosX ? SYMBOLS.X : SYMBOLS.O,
    simboloOponente: somosX ? SYMBOLS.O : SYMBOLS.X
  };
}

/**
 * Check if placing a symbol at a position results in a win
 * @param {Array} board - Current board state
 * @param {number} position - Position to test
 * @param {number} symbol - Symbol to place
 * @param {Array} winningCombinations - Array of winning combinations
 * @returns {boolean} True if the move wins
 */
export function evaluateWinningMove(board, position, symbol, winningCombinations) {
  const testBoard = [...board];
  testBoard[position] = symbol;
  
  return winningCombinations.some((combinacion) =>
    combinacion.every((pos) => testBoard[pos] === symbol)
  );
}

/**
 * Find an immediate winning move for a player
 * @param {Array} board - Current board state
 * @param {Array} emptyPositions - Available empty positions
 * @param {number} symbol - Player symbol
 * @param {Array} winningCombinations - Array of winning combinations
 * @returns {number|null} Position of winning move or null if none
 */
export function findImmediateWin(board, emptyPositions, symbol, winningCombinations) {
  for (const position of emptyPositions) {
    if (evaluateWinningMove(board, position, symbol, winningCombinations)) {
      return position;
    }
  }
  return null;
}

/**
 * Find an immediate blocking move to prevent opponent from winning
 * @param {Array} board - Current board state
 * @param {Array} emptyPositions - Available empty positions
 * @param {number} opponentSymbol - Opponent symbol
 * @param {Array} winningCombinations - Array of winning combinations
 * @returns {number|null} Position of blocking move or null if none
 */
export function findImmediateBlock(board, emptyPositions, opponentSymbol, winningCombinations) {
  return findImmediateWin(board, emptyPositions, opponentSymbol, winningCombinations);
}

/**
 * Find a strategic completion move (completing 2-in-a-row)
 * @param {Array} board - Current board state
 * @param {Array} emptyPositions - Available empty positions
 * @param {number} symbol - Player symbol
 * @param {Array} winningCombinations - Array of winning combinations
 * @returns {number|null} Position of completion move or null if none
 */
export function findStrategicCompletion(board, emptyPositions, symbol, winningCombinations) {
  for (const combinacion of winningCombinations) {
    const posicionesCombinacion = combinacion.filter(
      (pos) => board[pos] === symbol
    );

    if (posicionesCombinacion.length === 2) {
      const posicionFaltante = combinacion.find((pos) => board[pos] === SYMBOLS.EMPTY);
      if (
        posicionFaltante !== undefined &&
        emptyPositions.includes(posicionFaltante)
      ) {
        return posicionFaltante;
      }
    }
  }
  return null;
}

/**
 * Select the best positional move based on priority (center > corners > edges)
 * @param {Array} emptyPositions - Available empty positions
 * @param {Object} config - Board configuration with center, corners, edges
 * @returns {number} Best available position
 */
export function selectPositionalMove(emptyPositions, config) {
  // Priority 1: Center
  if (emptyPositions.includes(config.center)) {
    return config.center;
  }

  // Priority 2: Corners
  const esquinasDisponibles = config.corners.filter((pos) => 
    emptyPositions.includes(pos)
  );
  if (esquinasDisponibles.length > 0) {
    return esquinasDisponibles[0];
  }

  // Priority 3: Edges
  const bordesDisponibles = config.edges.filter((pos) => 
    emptyPositions.includes(pos)
  );
  if (bordesDisponibles.length > 0) {
    return bordesDisponibles[0];
  }

  // Fallback: First available position
  return emptyPositions[0];
}

/**
 * Get opponent positions from the board
 * @param {Array} board - Current board state
 * @param {number} opponentSymbol - Opponent symbol
 * @returns {Array} Array of opponent positions
 */
export function getOpponentPositions(board, opponentSymbol) {
  return board
    .map((cell, index) => (cell === opponentSymbol ? index : null))
    .filter((i) => i !== null);
}

/**
 * Verify if a player has won with the current board state
 * @param {Array} board - Current board state
 * @param {number} symbol - Player symbol
 * @param {Array} winningCombinations - Array of winning combinations
 * @returns {boolean} True if player has won
 */
export function verifyWinner(board, symbol, winningCombinations) {
  return winningCombinations.some((combinacion) =>
    combinacion.every((posicion) => board[posicion] === symbol)
  );
}

/**
 * Calculate board size from board length
 * @param {number} boardLength - Length of board array
 * @returns {number} Board size (3 for 3x3, 5 for 5x5)
 */
export function getBoardSize(boardLength) {
  return Math.sqrt(boardLength);
}

/**
 * Get row and column from position for a given board size
 * @param {number} position - Board position
 * @param {number} boardSize - Size of board (3 or 5)
 * @returns {Object} Object with row and column
 */
export function getRowColumn(position, boardSize) {
  return {
    row: Math.floor(position / boardSize),
    column: position % boardSize
  };
}

/**
 * Get position from row and column for a given board size
 * @param {number} row - Row number
 * @param {number} column - Column number
 * @param {number} boardSize - Size of board (3 or 5)
 * @returns {number} Board position
 */
export function getPosition(row, column, boardSize) {
  return row * boardSize + column;
}
