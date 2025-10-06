// Unit Tests for 3x3 Tic-Tac-Toe Strategy Functions
// Testing extracted strategy logic from algoritmo.tres.core.js

import {
  handleOpponentInCorner,
  handleOpponentInCenter,
  handleOpponentInEdge,
  getStrategicMove
} from '../../../app/strategies/tres-strategies.js'
// import { BOARD_CONFIGS } from '../../../app/config.js'

describe('3x3 Strategy Functions', () => {
  describe('handleOpponentInCorner', () => {
    test('should block opposite corner when opponent in top-left', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInCorner(0, emptyPositions)
      expect(result).toBe(8)
    })

    test('should block opposite corner when opponent in top-right', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInCorner(2, emptyPositions)
      expect(result).toBe(6)
    })

    test('should block opposite corner when opponent in bottom-left', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInCorner(6, emptyPositions)
      expect(result).toBe(2)
    })

    test('should block opposite corner when opponent in bottom-right', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInCorner(8, emptyPositions)
      expect(result).toBe(0)
    })

    test('should return null when opposite corner not available', () => {
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7] // 0 and 8 not available
      const result = handleOpponentInCorner(0, emptyPositions)
      expect(result).toBe(null)
    })

    test('should return null when opponent not in corner', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInCorner(1, emptyPositions) // Edge position
      expect(result).toBe(null)
    })
  })

  describe('handleOpponentInCenter', () => {
    test('should take first available corner', () => {
      const emptyPositions = [0, 1, 2, 3, 5, 6, 7, 8]
      const result = handleOpponentInCenter(emptyPositions)
      expect([0, 2, 6, 8]).toContain(result)
    })

    test('should take any available corner', () => {
      const emptyPositions = [2, 6, 8] // Only some corners available
      const result = handleOpponentInCenter(emptyPositions)
      expect([2, 6, 8]).toContain(result)
    })

    test('should return null when no corners available', () => {
      const emptyPositions = [1, 3, 5, 7] // Only edges available
      const result = handleOpponentInCenter(emptyPositions)
      expect(result).toBe(null)
    })
  })

  describe('handleOpponentInEdge', () => {
    test('should block row when opponent in top edge', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInEdge(1, emptyPositions, 3)
      expect([0, 2]).toContain(result)
    })

    test('should block column when opponent in left edge', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInEdge(3, emptyPositions, 3)
      expect([4, 5, 0, 6]).toContain(result) // Positions in same row (4,5) or column (0,6) as 3
    })

    test('should block row when opponent in right edge', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInEdge(5, emptyPositions, 3)
      expect([3, 4, 2, 8]).toContain(result) // Positions in same row (3,4) or column (2,8) as 5
    })

    test('should block column when opponent in bottom edge', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInEdge(7, emptyPositions, 3)
      expect([6, 8, 1, 4]).toContain(result) // Positions in same row (6,8) or column (1,4) as 7
    })

    test('should return null when no blocking positions available', () => {
      const emptyPositions = [8] // Only position 8 available (not in same row or column as 1)
      const result = handleOpponentInEdge(1, emptyPositions, 3)
      // Position 1 is in row 0, column 1. Position 8 is in row 2, column 2, so it's not in same row or column
      expect(result).toBe(null)
    })

    test('should return null when opponent not in edge', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = handleOpponentInEdge(0, emptyPositions, 3) // Corner position
      expect(result).toBe(null)
    })
  })

  describe('getStrategicMove', () => {
    test('should use corner strategy when opponent in corner', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = getStrategicMove(0, emptyPositions)
      expect(result).toBe(8)
    })

    test('should use center strategy when opponent in center', () => {
      const emptyPositions = [0, 1, 2, 3, 5, 6, 7, 8]
      const result = getStrategicMove(4, emptyPositions)
      expect([0, 2, 6, 8]).toContain(result)
    })

    test('should use edge strategy when opponent in edge', () => {
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const result = getStrategicMove(1, emptyPositions)
      expect([0, 2]).toContain(result)
    })

    test('should return null when no strategy applies', () => {
      const emptyPositions = [8] // Only position 8 available (not in same row or column as 1)
      const result = getStrategicMove(1, emptyPositions)
      expect(result).toBe(null)
    })
  })
})
