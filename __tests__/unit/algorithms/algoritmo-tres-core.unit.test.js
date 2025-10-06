// Unit Tests - Algoritmo Tres Core (3x3 with Dependency Injection)
// Consolidated from multiple coverage test files

import algoritmoTresRefactored from '../../../app/algoritmo.tres.core.js'
import { BOARD_CONFIGS, SYMBOLS } from '../../../app/config.js'

const CONFIG = BOARD_CONFIGS.TRES

describe('Unit Tests - Algoritmo Tres Core (3x3 DI)', () => {
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
      const board = createEmptyBoard(9)
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies()
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(CONFIG.center)
    })

    test('should return center if available in second move', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies()
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(CONFIG.center)
    })

    test('should prioritize winning move', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.X
      board[2] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => 2
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })

    test('should prioritize blocking move', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.O
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => 2
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })
  })

  describe('Positional Strategies', () => {
    test('should take corner when opponent is in center', () => {
      const board = createEmptyBoard(9)
      board[CONFIG.center] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        obtenerPosicionesOponenteFn: () => [CONFIG.center],
        estrategiaPosicionalFn: () => CONFIG.corners[0]
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(CONFIG.corners).toContain(result)
    })

    test('should take opposite corner when opponent is in corner', () => {
      const board = createEmptyBoard(9)
      board[CONFIG.corners[0]] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        obtenerPosicionesOponenteFn: () => [CONFIG.corners[0]]
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect([
        CONFIG.center,
        CONFIG.diagonalOpposites[CONFIG.corners[0]]
      ]).toContain(result)
    })

    test('should take center or corner when opponent is in edge', () => {
      const board = createEmptyBoard(9)
      board[CONFIG.edges[0]] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        obtenerPosicionesOponenteFn: () => [CONFIG.edges[0]]
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect([CONFIG.center, ...CONFIG.corners]).toContain(result)
    })

    test('should handle multiple opponent positions', () => {
      const board = createEmptyBoard(9)
      board[CONFIG.corners[0]] = SYMBOLS.O
      board[CONFIG.edges[0]] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        obtenerPosicionesOponenteFn: () => [CONFIG.corners[0], CONFIG.edges[0]]
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(emptyPositions).toContain(result)
    })
  })

  describe('Winning and Blocking Strategies', () => {
    test('should complete winning row', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.X
      board[2] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => 2
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })

    test('should complete winning column', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[3] = SYMBOLS.X
      board[6] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => 6
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(6)
    })

    test('should complete winning diagonal', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[4] = SYMBOLS.X
      board[8] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => 8
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(8)
    })

    test('should block opponent row', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.O
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => 2
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })

    test('should block opponent column', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.O
      board[3] = SYMBOLS.O
      board[6] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => 6
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(6)
    })

    test('should block opponent diagonal', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.O
      board[4] = SYMBOLS.O
      board[8] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => 8
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(8)
    })
  })

  describe('Advanced Strategies', () => {
    test('should handle complex blocking scenario', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.O
      board[1] = SYMBOLS.O
      board[3] = SYMBOLS.O
      board[4] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => 2
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })

    test('should use positional strategy when no immediate win/block', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.X
      board[3] = SYMBOLS.O
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: () => 4
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(4)
    })

    test('should handle almost full board', () => {
      const board = createEmptyBoard(9)
      for (let i = 0; i < 8; i++) {
        board[i] = i % 2 === 0 ? SYMBOLS.X : SYMBOLS.O
      }
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: () => 8
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(8)
    })

    test('should handle board with no winning moves available', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.X
      board[3] = SYMBOLS.O
      board[4] = SYMBOLS.X
      board[5] = SYMBOLS.O
      board[6] = SYMBOLS.X
      board[7] = SYMBOLS.O
      board[8] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        obtenerPosicionesOponenteFn: () => [1, 3, 5, 7],
        estrategiaPosicionalFn: () => 8
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(8)
    })
  })

  describe('Edge Cases', () => {
    test('should handle empty positions array gracefully', () => {
      const board = new Array(9).fill(SYMBOLS.X)
      const emptyPositions = []
      const dependencies = mockDependencies()
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBeUndefined()
    })

    test('should handle mixed winning and blocking opportunities', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.X
      board[2] = SYMBOLS.EMPTY
      board[3] = SYMBOLS.O
      board[4] = SYMBOLS.O
      board[5] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)
      const dependencies = mockDependencies({
        buscarMovimientoGanadorFn: () => 2,
        buscarMovimientoCompletarFn: () => 5
      })
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        dependencies
      )
      expect(result).toBe(2)
    })

    test('should handle dependency injection with custom functions', () => {
      const board = createEmptyBoard(9)
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
      const result = algoritmoTresRefactored(
        board,
        emptyPositions,
        customDependencies
      )
      expect([4, 5]).toContain(result)
    })
  })
})
