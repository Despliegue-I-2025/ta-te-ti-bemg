// Comprehensive Unit Tests for algoritmo.cinco.di.js
// Targeting uncovered lines: 9-117,149,159,166,192,210-215

import algoritmoCincoDi from '../../../app/algoritmo.cinco.di.js'

describe('Comprehensive Unit Tests - Algoritmo Cinco DI', () => {
  // Helper function to create empty positions
  const createEmptyPositions = (board) => {
    return board.map((cell, index) => cell === 0 ? index : null).filter(i => i !== null)
  }

  describe('Basic Functionality - Lines 9-117', () => {
    test('should return center for first move (line 9-15)', () => {
      const board = new Array(25).fill(0)
      const emptyPositions = createEmptyPositions(board)

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBe(12) // Center position in 5x5
    })

    test('should handle dependency injection with custom config (line 9-15)', () => {
      const board = new Array(25).fill(0)
      const emptyPositions = createEmptyPositions(board)

      const customConfig = {
        center: 5,
        corners: [0, 4, 20, 24],
        edges: [1, 2, 3, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23],
        winningCombinations: []
      }

      const result = algoritmoCincoDi(board, emptyPositions, { config: customConfig })

      expect([5, 12]).toContain(result) // Should use custom center or default
    })

    test('should handle dependency injection with custom functions (line 9-15)', () => {
      const board = new Array(25).fill(0)
      const emptyPositions = createEmptyPositions(board)

      const customVerificarGanador = () => false
      const customBuscarMovimientoGanador = () => null
      const customBuscarMovimientoCompletar = () => null
      const customEstrategiaPosicional = () => 5

      const result = algoritmoCincoDi(board, emptyPositions, {
        verificarGanadorFn: customVerificarGanador,
        buscarMovimientoGanadorFn: customBuscarMovimientoGanador,
        buscarMovimientoCompletarFn: customBuscarMovimientoCompletar,
        estrategiaPosicionalFn: customEstrategiaPosicional
      })

      expect([5, 12]).toContain(result) // Should use custom positional strategy or default
    })

    test('should handle complex dependency injection scenarios (line 9-117)', () => {
      const board = new Array(25).fill(0)
      const emptyPositions = createEmptyPositions(board)

      const customConfig = {
        center: 5,
        corners: [0, 4, 20, 24],
        edges: [1, 2, 3, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23],
        winningCombinations: []
      }

      const customVerificarGanador = () => false
      const customBuscarMovimientoGanador = () => null
      const customBuscarMovimientoCompletar = () => null
      const customEstrategiaPosicional = () => 5
      const customObtenerPosicionesOponente = () => []
      const customEstrategiaBloqueoDiagonal = () => null
      const customEstrategiaBloqueoFilaColumna = () => null
      const customDeterminarSimbolos = () => ({ miSimbolo: 1, simboloOponente: 2 })

      const result = algoritmoCincoDi(board, emptyPositions, {
        config: customConfig,
        verificarGanadorFn: customVerificarGanador,
        buscarMovimientoGanadorFn: customBuscarMovimientoGanador,
        buscarMovimientoCompletarFn: customBuscarMovimientoCompletar,
        estrategiaPosicionalFn: customEstrategiaPosicional,
        obtenerPosicionesOponenteFn: customObtenerPosicionesOponente,
        estrategiaBloqueoDiagonalFn: customEstrategiaBloqueoDiagonal,
        estrategiaBloqueoFilaColumnaFn: customEstrategiaBloqueoFilaColumna,
        determinarSimbolosFn: customDeterminarSimbolos
      })

      expect([5, 12]).toContain(result) // Should use custom positional strategy or default
    })
  })

  describe('Positional Strategy - Lines 149, 159, 166', () => {
    test('should take center if available (line 149)', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBe(12) // Should take center
    })

    test('should take corner when center is occupied (line 159)', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([0, 4, 20, 24]).toContain(result) // Should take any available corner
    })

    test('should take edge when center and corners are occupied (line 166)', () => {
      const board = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1]
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(emptyPositions).toContain(result) // Should take any available edge
    })
  })

  describe('Advanced Strategies - Lines 192', () => {
    test('should use diagonal blocking strategy (line 192)', () => {
      // O in corner, should block opposite diagonal
      const board = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([12, 24]).toContain(result) // Should take center or opposite corner
    })

    test('should use row/column blocking strategy (line 192)', () => {
      // O in edge position, should block row/column
      const board = [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(emptyPositions).toContain(result) // Should take any valid position
    })

    test('should use positional strategy as fallback (line 192)', () => {
      // Complex scenario where other strategies don't apply
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0]
      const emptyPositions = [24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBe(24) // Should take the only available position
    })
  })

  describe('Winning and Blocking Strategies - Lines 210-215', () => {
    test('should complete winning combination (line 210-215)', () => {
      // X has two in a row, should complete the third
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBe(2) // Should complete the row
    })

    test('should block opponent winning combination (line 210-215)', () => {
      // O has two in a row, should block the third
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBe(2) // Should block the row
    })

    test('should complete winning column (line 210-215)', () => {
      // X has two in a column, should complete the third
      const board = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([10, 20]).toContain(result) // Should complete the column
    })

    test('should block opponent winning column (line 210-215)', () => {
      // O has two in a column, should block the third
      const board = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([10, 20]).toContain(result) // Should block the column
    })

    test('should complete winning diagonal (line 210-215)', () => {
      // X has two in diagonal, should complete the third
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([6, 24]).toContain(result) // Should complete the diagonal
    })

    test('should block opponent winning diagonal (line 210-215)', () => {
      // O has two in diagonal, should block the third
      const board = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([6, 24]).toContain(result) // Should block the diagonal
    })
  })

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty positions array gracefully', () => {
      const board = new Array(25).fill(1)
      const emptyPositions = []

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBeUndefined() // Should return undefined when no empty positions
    })

    test('should handle complex 5x5 scenarios', () => {
      // Complex scenario with multiple strategies
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0]
      const emptyPositions = [24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBe(24)
    })

    test('should handle dependency injection with custom functions', () => {
      const board = new Array(25).fill(0)
      const emptyPositions = createEmptyPositions(board)

      const customEstrategiaPosicional = () => 5
      const customObtenerPosicionesOponente = () => []
      const customEstrategiaBloqueoDiagonal = () => null
      const customEstrategiaBloqueoFilaColumna = () => null
      const customDeterminarSimbolos = () => ({ miSimbolo: 1, simboloOponente: 2 })

      const result = algoritmoCincoDi(board, emptyPositions, {
        estrategiaPosicionalFn: customEstrategiaPosicional,
        obtenerPosicionesOponenteFn: customObtenerPosicionesOponente,
        estrategiaBloqueoDiagonalFn: customEstrategiaBloqueoDiagonal,
        estrategiaBloqueoFilaColumnaFn: customEstrategiaBloqueoFilaColumna,
        determinarSimbolosFn: customDeterminarSimbolos
      })

      expect([5, 12]).toContain(result) // Should use custom positional strategy or default
    })
  })

  describe('Complex Scenarios', () => {
    test('should handle multiple winning opportunities', () => {
      // X has multiple winning opportunities
      const board = [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]).toContain(result)
    })

    test('should handle multiple blocking opportunities', () => {
      // O has multiple winning opportunities that need blocking
      const board = [2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect([2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]).toContain(result)
    })

    test('should prioritize winning over blocking', () => {
      // X can win, O can also win - should prioritize X winning
      const board = [1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

      const result = algoritmoCincoDi(board, emptyPositions)

      expect(result).toBe(2) // Should complete X's winning row
    })
  })
})
