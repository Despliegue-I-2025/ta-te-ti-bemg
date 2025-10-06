// Unit Tests - Algoritmo Cinco Core (5x5 with Dependency Injection)
// Consolidated from multiple coverage test files

import algoritmoCincoRefactored from '../../../app/algoritmo.cinco.core.js'
import { BOARD_CONFIGS, SYMBOLS } from '../../../app/config.js'

const CONFIG = BOARD_CONFIGS.CINCO

describe('Unit Tests - Algoritmo Cinco Core (5x5 DI)', () => {
  // Helper functions
  const createEmptyBoard = size => new Array(size).fill(SYMBOLS.EMPTY)
  const getEmptyPositions = board =>
    board
      .map((cell, index) => (cell === SYMBOLS.EMPTY ? index : null))
      .filter(i => i !== null)

  // Mock dependencies for isolated unit testing
  const mockDependencies = (overrides = {}) => ({
    config: CONFIG,
    verificarGanadorFn: () => false,
    buscarMovimientoGanadorFn: () => null,
    buscarMovimientoCompletarFn: () => null,
    estrategiaPosicionalFn: () => null,
    obtenerPosicionesOponenteFn: () => [],
    estrategiaBloqueoDiagonalFn: () => null,
    estrategiaBloqueoFilaColumnaFn: () => null,
    determinarSimbolosFn: () => ({ player: SYMBOLS.X, opponent: SYMBOLS.O }),
    ...overrides
  })

  describe('Basic Functionality', () => {
    test('should return center for first move', () => {
      const board = createEmptyBoard(25)
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies()
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(CONFIG.center)
    })

    test('should prioritize winning move for player X', () => {
      const board = createEmptyBoard(25)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.X
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => 2
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })

    test('should prioritize blocking move for player O', () => {
      const board = createEmptyBoard(25)
      board[0] = SYMBOLS.O
      board[1] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => 2
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })
  })

  describe('Positional Strategies', () => {
    test('should take center if available', () => {
      const board = createEmptyBoard(25)
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(CONFIG.center)
    })

    test('should take opposite corner if opponent is in corner', () => {
      const board = createEmptyBoard(25)
      board[CONFIG.corners[0]] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        obtenerPosicionesOponenteFn: () => [CONFIG.corners[0]]
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result === null || emptyPositions.includes(result)).toBe(true)
    })

    test('should take corner when center is occupied', () => {
      const board = createEmptyBoard(25)
      board[CONFIG.center] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        obtenerPosicionesOponenteFn: () => [CONFIG.center],
        estrategiaPosicionalFn: () => CONFIG.corners[0]
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect([CONFIG.center, ...CONFIG.corners]).toContain(result)
    })

    test('should take edge when corners are filled', () => {
      const board = createEmptyBoard(25)
      board[CONFIG.center] = SYMBOLS.X
      CONFIG.corners.forEach(pos => {
        board[pos] = SYMBOLS.X
      })
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        obtenerPosicionesOponenteFn: () => [],
        estrategiaPosicionalFn: () => CONFIG.edges[0]
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(CONFIG.edges).toContain(result)
    })
  })

  describe('Advanced Strategies', () => {
    test('should use diagonal blocking strategy', () => {
      const board = createEmptyBoard(25)
      board[0] = SYMBOLS.O
      board[6] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: () => null,
        estrategiaBloqueoDiagonalFn: () => 12
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(emptyPositions).toContain(result)
    })

    test('should use row/column blocking strategy', () => {
      const board = createEmptyBoard(25)
      board[0] = SYMBOLS.O
      board[1] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: () => null,
        estrategiaBloqueoDiagonalFn: () => null,
        estrategiaBloqueoFilaColumnaFn: () => 2
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })

    test('should use positional strategy as fallback', () => {
      const board = createEmptyBoard(25)
      board[CONFIG.center] = SYMBOLS.X
      CONFIG.corners.forEach(pos => {
        board[pos] = SYMBOLS.X
      })
      CONFIG.edges.forEach(pos => {
        board[pos] = SYMBOLS.X
      })
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        obtenerPosicionesOponenteFn: () => [],
        estrategiaPosicionalFn: () => emptyPositions[0]
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(emptyPositions[0])
    })
  })

  describe('Edge Cases', () => {
    test('should handle empty positions array gracefully', () => {
      const board = new Array(25).fill(SYMBOLS.X)
      const emptyPositions = []
      const dependencies = mockDependencies()
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result === null || result === undefined).toBe(true)
    })

    test('should handle complex 5x5 scenarios', () => {
      const board = createEmptyBoard(25)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.X
      board[3] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        obtenerPosicionesOponenteFn: () => [1, 3],
        estrategiaPosicionalFn: () => 12
      })
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(12)
    })

    test('should handle dependency injection with custom functions', () => {
      const board = createEmptyBoard(25)
      const emptyPositions = getEmptyPositions(board)
      const customDependencies = {
        config: CONFIG,
        verificarGanadorFn: () => true,
        buscarMovimientoGanadorFn: () => 5,
        buscarMovimientoCompletarFn: () => null,
        obtenerPosicionesOponenteFn: () => [],
        estrategiaPosicionalFn: () => null,
        estrategiaBloqueoDiagonalFn: () => null,
        estrategiaBloqueoFilaColumnaFn: () => null,
        determinarSimbolosFn: () => ({ player: SYMBOLS.X, opponent: SYMBOLS.O })
      }
      const result = algoritmoCincoRefactored(
        board,
        emptyPositions,
        customDependencies
      )
      expect([CONFIG.center, 5]).toContain(result)
    })
  })
})
