// Unit Tests - Algoritmo Tres (3x3) - Original
// Pure unit tests with no async operations

import algoritmoTres from '../../../app/algoritmo.tres.di.js'
// import { BOARD_CONFIGS } from '../../../app/config.js'

describe('Unit Tests - Algoritmo Tres (3x3)', () => {
  describe('Basic Functionality', () => {
    test('should return center (4) for first move', () => {
      const board = new Array(9).fill(0)
      const emptyPositions = Array.from({ length: 9 }, (_, i) => i)
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(4)
    })

    test('should return center if available in second move', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 1]
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(4)
    })

    test('should return corner when center is occupied', () => {
      const board = [0, 0, 0, 0, 2, 0, 0, 0, 0]
      const emptyPositions = [0, 1, 2, 3, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect([0, 2, 6, 8]).toContain(result)
    })
  })

  describe('Winning Strategy', () => {
    test('should complete winning row', () => {
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(2)
    })

    test('should complete winning column', () => {
      const board = [1, 0, 0, 1, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 4, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(6)
    })

    test('should complete winning diagonal', () => {
      const board = [1, 0, 0, 0, 1, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(8)
    })
  })

  describe('Blocking Strategy', () => {
    test('should block opponent row', () => {
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(2)
    })

    test('should block opponent column', () => {
      const board = [2, 0, 0, 2, 0, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 4, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(6)
    })

    test('should block opponent diagonal', () => {
      const board = [2, 0, 0, 0, 2, 0, 0, 0, 0]
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(8)
    })
  })

  describe('Edge Cases', () => {
    test('should handle almost full board', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0]
      const emptyPositions = [8]
      const result = algoritmoTres(board, emptyPositions)
      expect(result).toBe(8)
    })

    test('should return valid position for any valid input', () => {
      const board = [1, 2, 1, 2, 0, 0, 0, 0, 0]
      const emptyPositions = [4, 5, 6, 7, 8]
      const result = algoritmoTres(board, emptyPositions)
      expect(emptyPositions).toContain(result)
    })
  })
})
