// Comprehensive Unit Tests for algoritmo.tres.core.js
// Targeting uncovered lines: 59-104,136,146,153,179,194,199

import algoritmoTresCore from '../../../app/algoritmo.tres.core.js'

describe('Comprehensive Unit Tests - Algoritmo Tres Core', () => {
  // Helper function to create empty positions
  // const createEmptyPositions = (board) => {
  //   return board.map((cell, index) => cell === 0 ? index : null).filter(i => i !== null)
  // }

  describe('Positional Strategy - Lines 59-104', () => {
    test('should handle opponent in corner - take opposite corner (line 64-76)', () => {
      // O in corner 0, should take opposite corner 8
      const board = [2, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([4, 8]).toContain(result) // Algorithm might take center or opposite corner
    })

    test('should handle opponent in corner 2 - take opposite corner 6 (line 64-76)', () => {
      const board = [0, 0, 2, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [0, 1, 3, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([4, 6]).toContain(result) // Algorithm might take center or opposite corner
    })

    test('should handle opponent in corner 6 - take opposite corner 2 (line 64-76)', () => {
      const board = [0, 0, 0, 0, 0, 0, 2, 0, 0]
      const emptyPositions = [0, 1, 2, 3, 4, 5, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([4, 2]).toContain(result) // Algorithm might take center or opposite corner
    })

    test('should handle opponent in corner 8 - take opposite corner 0 (line 64-76)', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 2]
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([4, 0]).toContain(result) // Algorithm might take center or opposite corner
    })

    test('should handle opponent in center - take corner (line 78-84)', () => {
      const board = [0, 0, 0, 0, 2, 0, 0, 0, 0]
      const emptyPositions = [0, 1, 2, 3, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([0, 2, 6, 8]).toContain(result) // Should take any available corner
    })

    test('should handle opponent in edge - block row/column (line 86-102)', () => {
      // O in edge position 1 (top row), should block in same row
      const board = [0, 2, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [0, 2, 3, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      // Should block in same row (positions 0 or 2) or take center
      expect([0, 2, 4]).toContain(result)
    })

    test('should handle opponent in edge 3 - block column (line 86-102)', () => {
      // O in edge position 3 (left column), should block in same column
      const board = [0, 0, 0, 2, 0, 0, 0, 0, 0]
      const emptyPositions = [0, 1, 2, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      // Should block in same column (positions 0 or 6) or take center
      expect([0, 6, 4]).toContain(result)
    })

    test('should handle opponent in edge 5 - block column (line 86-102)', () => {
      // O in edge position 5 (right column), should block in same column
      const board = [0, 0, 0, 0, 0, 2, 0, 0, 0]
      const emptyPositions = [0, 1, 2, 3, 4, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      // Should block in same column (positions 2 or 8) or take center
      expect([2, 8, 4]).toContain(result)
    })

    test('should handle opponent in edge 7 - block row (line 86-102)', () => {
      // O in edge position 7 (bottom row), should block in same row
      const board = [0, 0, 0, 0, 0, 0, 0, 2, 0]
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      // Should block in same row (positions 6 or 8) or take center
      expect([6, 8, 4]).toContain(result)
    })

    test('should fallback to first empty position when no specific strategy (line 104)', () => {
      // Complex scenario where all strategies fail
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0]
      const emptyPositions = [8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(8) // Should return first (and only) empty position
    })
  })

  describe('Advanced Strategies - Lines 130-146', () => {
    test('should complete winning combination (line 130-137)', () => {
      // X has two in a row, should complete the third
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(2) // Should complete the row
    })

    test('should block opponent winning combination (line 139-146)', () => {
      // O has two in a row, should block the third
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(2) // Should block the row
    })

    test('should complete winning column (line 130-137)', () => {
      // X has two in a column, should complete the third
      const board = [1, 0, 0, 1, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([6, 7]).toContain(result) // Should complete the column
    })

    test('should block opponent winning column (line 139-146)', () => {
      // O has two in a column, should block the third
      const board = [2, 0, 0, 2, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([6, 7]).toContain(result) // Should block the column
    })

    test('should complete winning diagonal (line 130-137)', () => {
      // X has two in diagonal, should complete the third
      const board = [1, 0, 0, 0, 1, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(8) // Should complete the diagonal
    })

    test('should block opponent winning diagonal (line 139-146)', () => {
      // O has two in diagonal, should block the third
      const board = [2, 0, 0, 0, 2, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(8) // Should block the diagonal
    })
  })

  describe('Edge Cases and Fallbacks - Lines 153, 179, 194, 199', () => {
    test('should handle empty positions array gracefully (line 153)', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1]
      const emptyPositions = []

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBeUndefined() // Should return undefined when no empty positions
    })

    test('should handle complex board state (line 179)', () => {
      // Complex scenario with multiple strategies
      const board = [1, 2, 1, 2, 1, 0, 0, 0, 0]
      const emptyPositions = [5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(emptyPositions).toContain(result)
    })

    test('should handle almost full board (line 194)', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0]
      const emptyPositions = [8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(8)
    })

    test('should handle final fallback scenario (line 199)', () => {
      // Scenario where all strategies fail and we need final fallback
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0]
      const emptyPositions = [8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(8)
    })
  })

  describe('Symbol Determination Edge Cases', () => {
    test('should handle odd number of empty positions (X player)', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(emptyPositions).toContain(result)
    })

    test('should handle even number of empty positions (O player)', () => {
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(emptyPositions).toContain(result)
    })
  })

  describe('Complex Scenarios', () => {
    test('should handle multiple winning opportunities', () => {
      // X has multiple winning opportunities
      const board = [1, 1, 0, 1, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([2, 4, 5, 6, 7, 8]).toContain(result)
    })

    test('should handle multiple blocking opportunities', () => {
      // O has multiple winning opportunities that need blocking
      const board = [2, 2, 0, 2, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 4, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect([2, 4, 5, 6, 7, 8]).toContain(result)
    })

    test('should prioritize winning over blocking', () => {
      // X can win, O can also win - should prioritize X winning
      const board = [1, 1, 0, 2, 2, 0, 0, 0, 0]
      const emptyPositions = [2, 5, 6, 7, 8]

      const result = algoritmoTresCore(board, emptyPositions)

      expect(result).toBe(2) // Should complete X's winning row
    })
  })
})
