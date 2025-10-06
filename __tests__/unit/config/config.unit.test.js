// Unit Tests - Configuration
// Pure unit tests with no async operations

import { BOARD_CONFIGS, SYMBOLS } from '../../../app/config.js'

describe('Unit Tests - Configuration', () => {
  describe('BOARD_CONFIGS', () => {
    test('should have correct TRES configuration', () => {
      expect(BOARD_CONFIGS.TRES).toBeDefined()
      expect(BOARD_CONFIGS.TRES.size).toBe(9)
      expect(BOARD_CONFIGS.TRES.center).toBe(4)
      expect(BOARD_CONFIGS.TRES.corners).toEqual([0, 2, 6, 8])
      expect(BOARD_CONFIGS.TRES.edges).toEqual([1, 3, 5, 7])
      expect(BOARD_CONFIGS.TRES.winningCombinations).toHaveLength(8)
    })

    test('should have correct CINCO configuration', () => {
      expect(BOARD_CONFIGS.CINCO).toBeDefined()
      expect(BOARD_CONFIGS.CINCO.size).toBe(25)
      expect(BOARD_CONFIGS.CINCO.center).toBe(12)
      expect(BOARD_CONFIGS.CINCO.corners).toEqual([0, 4, 20, 24])
      expect(BOARD_CONFIGS.CINCO.edges).toEqual([
        1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23
      ])
      expect(BOARD_CONFIGS.CINCO.winningCombinations).toHaveLength(43)
    })

    test('should have valid winning combinations for TRES', () => {
      const combinations = BOARD_CONFIGS.TRES.winningCombinations
      expect(combinations).toHaveLength(8)

      // Check rows
      expect(combinations).toContainEqual([0, 1, 2])
      expect(combinations).toContainEqual([3, 4, 5])
      expect(combinations).toContainEqual([6, 7, 8])

      // Check columns
      expect(combinations).toContainEqual([0, 3, 6])
      expect(combinations).toContainEqual([1, 4, 7])
      expect(combinations).toContainEqual([2, 5, 8])

      // Check diagonals
      expect(combinations).toContainEqual([0, 4, 8])
      expect(combinations).toContainEqual([2, 4, 6])
    })

    test('should have valid winning combinations for CINCO', () => {
      const combinations = BOARD_CONFIGS.CINCO.winningCombinations
      expect(combinations).toHaveLength(43)

      // Check some 3-in-a-row combinations (the actual config has 3-in-a-row, not 5-in-a-row)
      expect(combinations).toContainEqual([0, 1, 2])
      expect(combinations).toContainEqual([5, 6, 7])
      expect(combinations).toContainEqual([10, 11, 12])
      expect(combinations).toContainEqual([15, 16, 17])
      expect(combinations).toContainEqual([20, 21, 22])

      // Check some column combinations
      expect(combinations).toContainEqual([0, 5, 10])
      expect(combinations).toContainEqual([1, 6, 11])
      expect(combinations).toContainEqual([2, 7, 12])

      // Check some diagonal combinations
      expect(combinations).toContainEqual([0, 6, 12])
      expect(combinations).toContainEqual([4, 8, 12])
    })

    test('should have correct corner positions', () => {
      expect(BOARD_CONFIGS.TRES.corners).toEqual([0, 2, 6, 8])
      expect(BOARD_CONFIGS.CINCO.corners).toEqual([0, 4, 20, 24])
    })

    test('should have correct edge positions', () => {
      expect(BOARD_CONFIGS.TRES.edges).toEqual([1, 3, 5, 7])
      expect(BOARD_CONFIGS.CINCO.edges).toEqual([
        1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23
      ])
    })

    test('should have correct center positions', () => {
      expect(BOARD_CONFIGS.TRES.center).toBe(4)
      expect(BOARD_CONFIGS.CINCO.center).toBe(12)
    })
  })

  describe('SYMBOLS', () => {
    test('should have correct symbol values', () => {
      expect(SYMBOLS.EMPTY).toBe(0)
      expect(SYMBOLS.X).toBe(1)
      expect(SYMBOLS.O).toBe(2)
    })

    test('should have all required symbols', () => {
      expect(SYMBOLS).toHaveProperty('EMPTY')
      expect(SYMBOLS).toHaveProperty('X')
      expect(SYMBOLS).toHaveProperty('O')
    })
  })

  describe('Configuration Validation', () => {
    test('should have consistent size calculations', () => {
      // 3x3 = 9 positions
      expect(BOARD_CONFIGS.TRES.size).toBe(9)
      expect(Math.sqrt(BOARD_CONFIGS.TRES.size)).toBe(3)

      // 5x5 = 25 positions
      expect(BOARD_CONFIGS.CINCO.size).toBe(25)
      expect(Math.sqrt(BOARD_CONFIGS.CINCO.size)).toBe(5)
    })

    test('should have valid center positions', () => {
      // Center should be in the middle of the board
      const tresCenter = Math.floor(BOARD_CONFIGS.TRES.size / 2)
      const cincoCenter = Math.floor(BOARD_CONFIGS.CINCO.size / 2)

      expect(BOARD_CONFIGS.TRES.center).toBe(tresCenter)
      expect(BOARD_CONFIGS.CINCO.center).toBe(cincoCenter)
    })

    test('should have valid corner positions', () => {
      // Corners should be at the four corners of the board
      const tresCorners = [0, 2, 6, 8]
      const cincoCorners = [0, 4, 20, 24]

      expect(BOARD_CONFIGS.TRES.corners).toEqual(tresCorners)
      expect(BOARD_CONFIGS.CINCO.corners).toEqual(cincoCorners)
    })
  })
})
