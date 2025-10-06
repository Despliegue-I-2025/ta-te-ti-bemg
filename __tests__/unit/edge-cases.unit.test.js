// Unit Tests - Edge Cases and Boundary Conditions
// Consolidated from multiple coverage test files

// import algoritmoCincoRefactored from '../../app/algoritmo.cinco.core.js'
import algoritmoCinco from '../../app/algoritmo.cinco.di.js'
import algoritmoTresRefactored from '../../app/algoritmo.tres.core.js'
import algoritmoTres from '../../app/algoritmo.tres.di.js'
import { BOARD_CONFIGS, SYMBOLS } from '../../app/config.js'

const CONFIG_TRES = BOARD_CONFIGS.TRES
const CONFIG_CINCO = BOARD_CONFIGS.CINCO

describe('Unit Tests - Edge Cases and Boundary Conditions', () => {
  // Helper functions
  const createEmptyBoard = size => new Array(size).fill(SYMBOLS.EMPTY)
  const getEmptyPositions = board =>
    board
      .map((cell, index) => (cell === SYMBOLS.EMPTY ? index : null))
      .filter(i => i !== null)

  describe('Algorithm Edge Cases', () => {
    test('should handle board with all positions occupied except one', () => {
      const board = new Array(9).fill(SYMBOLS.X)
      board[8] = SYMBOLS.EMPTY // Only one position left
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(8)
    })

    test('should handle 5x5 board with only center empty', () => {
      const board = new Array(25).fill(SYMBOLS.X)
      board[CONFIG_CINCO.center] = SYMBOLS.EMPTY
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoCinco(board, emptyPositions)
      expect(result).toBe(CONFIG_CINCO.center)
    })

    test('should handle board with invalid values gracefully', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = getEmptyPositions(board)

      // Should not throw error even with invalid values
      expect(() => {
        algoritmoTres(board, emptyPositions)
      }).not.toThrow()
    })

    test('should handle minimal empty positions efficiently', () => {
      const board = createEmptyBoard(9)
      // Fill 8 positions, leave only 1 empty
      for (let i = 0; i < 8; i++) {
        board[i] = i % 2 === 0 ? SYMBOLS.X : SYMBOLS.O
      }
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(8)
    })

    test('should handle complex board state efficiently', () => {
      const board = createEmptyBoard(25)
      // Create a complex scenario
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.X
      board[3] = SYMBOLS.O
      board[4] = SYMBOLS.X
      board[5] = SYMBOLS.O
      board[6] = SYMBOLS.X
      board[7] = SYMBOLS.O
      board[8] = SYMBOLS.X
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoCinco(board, emptyPositions)
      expect(emptyPositions).toContain(result)
    })
  })

  describe('Error Handling Edge Cases', () => {
    test('should handle null board gracefully', () => {
      const result = algoritmoTresRefactored(null, [0, 1, 2, 3, 4, 5, 6, 7, 8])
      expect(typeof result).toBe('number')
    })

    test('should handle undefined emptyPositions gracefully', () => {
      expect(() => {
        algoritmoTresRefactored([0, 0, 0, 0, 0, 0, 0, 0, 0], undefined)
      }).toThrow()
    })

    test('should handle empty emptyPositions array', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1]
      const emptyPositions = []

      const result = algoritmoTresRefactored(board, emptyPositions)
      expect(result).toBeUndefined()
    })

    test('should handle large number of empty positions efficiently', () => {
      const board = createEmptyBoard(25)
      const emptyPositions = getEmptyPositions(board)

      const start = Date.now()
      const result = algoritmoCinco(board, emptyPositions)
      const duration = Date.now() - start

      expect(emptyPositions).toContain(result)
      expect(duration).toBeLessThan(100) // Should be fast
    })
  })

  describe('Boundary Value Tests', () => {
    test('should handle minimum valid board size (3x3)', () => {
      const board = createEmptyBoard(9)
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(CONFIG_TRES.center)
    })

    test('should handle maximum valid board size (5x5)', () => {
      const board = createEmptyBoard(25)
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoCinco(board, emptyPositions)
      expect(result).toBe(CONFIG_CINCO.center)
    })

    test('should handle boundary values in determinarSimbolos', () => {
      // Test with different numbers of empty positions
      const board1 = createEmptyBoard(9)
      board1[0] = SYMBOLS.X // 8 empty positions (even)
      const emptyPositions1 = getEmptyPositions(board1)

      const board2 = createEmptyBoard(9)
      board2[0] = SYMBOLS.X
      board2[1] = SYMBOLS.O // 7 empty positions (odd)
      const emptyPositions2 = getEmptyPositions(board2)

      // Both should work without errors
      expect(() => algoritmoTres(board1, emptyPositions1)).not.toThrow()
      expect(() => algoritmoTres(board2, emptyPositions2)).not.toThrow()
    })
  })

  describe('Complex Scenarios', () => {
    test('should handle complex 3x3 scenarios with multiple strategies', () => {
      const board = createEmptyBoard(9)
      // Create a complex scenario
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.X
      board[3] = SYMBOLS.O
      board[4] = SYMBOLS.EMPTY // Center is empty
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(4) // Should take center
    })

    test('should handle complex 5x5 scenarios with multiple strategies', () => {
      const board = createEmptyBoard(25)
      // Create a complex scenario
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.X
      board[3] = SYMBOLS.O
      board[4] = SYMBOLS.X
      board[5] = SYMBOLS.O
      board[6] = SYMBOLS.X
      board[7] = SYMBOLS.O
      board[8] = SYMBOLS.X
      board[9] = SYMBOLS.O
      board[10] = SYMBOLS.X
      board[11] = SYMBOLS.O
      board[12] = SYMBOLS.EMPTY // Center is empty
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoCinco(board, emptyPositions)
      expect(result).toBe(12) // Should take center
    })

    test('should handle mixed winning and blocking opportunities', () => {
      const board = createEmptyBoard(9)
      // Create a scenario where both winning and blocking moves are available
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.X
      board[2] = SYMBOLS.EMPTY // Can win here
      board[3] = SYMBOLS.O
      board[4] = SYMBOLS.O
      board[5] = SYMBOLS.EMPTY // Can block here
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoTres(board, emptyPositions)
      expect([2, 5]).toContain(result) // Should prioritize winning over blocking
    })

    test('should handle multiple winning opportunities', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.X
      board[1] = SYMBOLS.X
      board[2] = SYMBOLS.EMPTY // Can win row
      board[3] = SYMBOLS.X
      board[6] = SYMBOLS.EMPTY // Can win column
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoTres(board, emptyPositions)
      expect([2, 6]).toContain(result)
    })

    test('should handle multiple blocking opportunities', () => {
      const board = createEmptyBoard(9)
      board[0] = SYMBOLS.O
      board[1] = SYMBOLS.O
      board[2] = SYMBOLS.EMPTY // Can block row
      board[3] = SYMBOLS.O
      board[6] = SYMBOLS.EMPTY // Can block column
      const emptyPositions = getEmptyPositions(board)

      const result = algoritmoTres(board, emptyPositions)
      expect([2, 6]).toContain(result)
    })
  })

  describe('Performance Edge Cases', () => {
    test('should handle large number of empty positions efficiently', () => {
      const board = createEmptyBoard(25)
      const emptyPositions = getEmptyPositions(board)

      const start = Date.now()
      const result = algoritmoCinco(board, emptyPositions)
      const duration = Date.now() - start

      expect(emptyPositions).toContain(result)
      expect(duration).toBeLessThan(100) // Should be fast
    })

    test('should handle complex board state efficiently', () => {
      const board = createEmptyBoard(25)
      // Fill some positions to create complexity
      for (let i = 0; i < 12; i++) {
        board[i] = i % 2 === 0 ? SYMBOLS.X : SYMBOLS.O
      }
      const emptyPositions = getEmptyPositions(board)

      const start = Date.now()
      const result = algoritmoCinco(board, emptyPositions)
      const duration = Date.now() - start

      expect(emptyPositions).toContain(result)
      expect(duration).toBeLessThan(100) // Should be fast
    })
  })
})
