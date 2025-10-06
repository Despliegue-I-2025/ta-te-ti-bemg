// Unit Tests for 5x5 Tic-Tac-Toe Strategy Functions
// Testing extracted strategy logic from algoritm.cinco.core.js

import {
  handleOpponentInCorner5x5,
  handleOpponentInCenter5x5,
  handleOpponentInEdge5x5,
  getStrategicMove5x5
} from '../../../app/strategies/cinco-strategies.js'
// import { BOARD_CONFIGS } from '../../../app/config.js'

describe('5x5 Strategy Functions', () => {
  describe('handleOpponentInCorner5x5', () => {
    test('should block opposite corner when opponent in top-left', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInCorner5x5(0, emptyPositions)
      expect(result).toBe(24)
    })

    test('should block opposite corner when opponent in top-right', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInCorner5x5(4, emptyPositions)
      expect(result).toBe(20)
    })

    test('should block opposite corner when opponent in bottom-left', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInCorner5x5(20, emptyPositions)
      expect(result).toBe(4)
    })

    test('should block opposite corner when opponent in bottom-right', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInCorner5x5(24, emptyPositions)
      expect(result).toBe(0)
    })

    test('should return null when opposite corner not available', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i).filter(
        i => i !== 0 && i !== 24
      )
      const result = handleOpponentInCorner5x5(0, emptyPositions)
      expect(result).toBe(null)
    })

    test('should return null when opponent not in corner', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInCorner5x5(1, emptyPositions) // Edge position
      expect(result).toBe(null)
    })
  })

  describe('handleOpponentInCenter5x5', () => {
    test('should take first available corner', () => {
      const emptyPositions = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24
      ]
      const result = handleOpponentInCenter5x5(emptyPositions)
      expect([0, 4, 20, 24]).toContain(result)
    })

    test('should take any available corner', () => {
      const emptyPositions = [4, 20, 24] // Only some corners available
      const result = handleOpponentInCenter5x5(emptyPositions)
      expect([4, 20, 24]).toContain(result)
    })

    test('should return null when no corners available', () => {
      const emptyPositions = [
        1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23
      ] // Only edges available
      const result = handleOpponentInCenter5x5(emptyPositions)
      expect(result).toBe(null)
    })
  })

  describe('handleOpponentInEdge5x5', () => {
    test('should block row when opponent in top edge', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInEdge5x5(1, emptyPositions, 5)
      expect([0, 2, 3, 4]).toContain(result)
    })

    test('should block column when opponent in left edge', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInEdge5x5(5, emptyPositions, 5)
      expect([6, 7, 8, 9, 0, 10, 15, 20]).toContain(result) // Positions in same row (6,7,8,9) or column (0,10,15,20) as 5
    })

    test('should block row when opponent in right edge', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInEdge5x5(9, emptyPositions, 5)
      expect([5, 6, 7, 8, 4, 14, 19, 24]).toContain(result) // Positions in same row (5,6,7,8) or column (4,14,19,24) as 9
    })

    test('should block column when opponent in bottom edge', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInEdge5x5(21, emptyPositions, 5)
      expect([20, 22, 23, 24, 1, 6, 11, 16]).toContain(result) // Positions in same row (20,22,23,24) or column (1,6,11,16) as 21
    })

    test('should return null when no blocking positions available', () => {
      const emptyPositions = [12] // Only center available
      const result = handleOpponentInEdge5x5(1, emptyPositions, 5)
      expect(result).toBe(null)
    })

    test('should return null when opponent not in edge', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = handleOpponentInEdge5x5(0, emptyPositions, 5) // Corner position
      expect(result).toBe(null)
    })
  })

  describe('getStrategicMove5x5', () => {
    test('should use corner strategy when opponent in corner', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = getStrategicMove5x5(0, emptyPositions)
      expect(result).toBe(24)
    })

    test('should use center strategy when opponent in center', () => {
      const emptyPositions = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24
      ]
      const result = getStrategicMove5x5(12, emptyPositions)
      expect([0, 4, 20, 24]).toContain(result)
    })

    test('should use edge strategy when opponent in edge', () => {
      const emptyPositions = Array.from({ length: 25 }, (_, i) => i)
      const result = getStrategicMove5x5(1, emptyPositions)
      expect([0, 2, 3, 4]).toContain(result)
    })

    test('should return null when no strategy applies', () => {
      const emptyPositions = [12] // Only center available
      const result = getStrategicMove5x5(1, emptyPositions)
      expect(result).toBe(null)
    })
  })
})
