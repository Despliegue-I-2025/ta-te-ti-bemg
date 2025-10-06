// Edge Case Tests for algoritmo-base.js Utility Functions
// Targeting uncovered lines: 85, 117, 131-179

import {
  determinePlayerSymbols,
  evaluateWinningMove,
  findImmediateWin,
  findImmediateBlock,
  findStrategicCompletion,
  selectPositionalMove,
  getOpponentPositions,
  verifyWinner,
  getBoardSize,
  getRowColumn,
  getPosition
} from '../../app/algoritmo-base.js'
import { BOARD_CONFIGS, SYMBOLS } from '../../app/config.js'

describe('Algorithm Base Edge Cases', () => {
  describe('findStrategicCompletion - Line 85', () => {
    test('should return position when completing combination with exact match', () => {
      const board = [1, 0, 1, 0, 0, 0, 0, 0, 0] // Two X's in row 0
      const emptyPositions = [1, 3, 4, 5, 6, 7, 8]
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = findStrategicCompletion(
        board,
        emptyPositions,
        symbol,
        winningCombinations
      )
      expect(result).toBe(1) // Position 1 completes the row [0,1,2]
    })

    test('should return position when completing diagonal combination', () => {
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 1] // Two X's in diagonal
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7]
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = findStrategicCompletion(
        board,
        emptyPositions,
        symbol,
        winningCombinations
      )
      expect(result).toBe(4) // Position 4 completes the diagonal [0,4,8]
    })
  })

  describe('selectPositionalMove - Line 117', () => {
    test('should return edge position when center and corners are occupied', () => {
      const emptyPositions = [1, 3, 5, 7] // Only edges available
      const config = BOARD_CONFIGS.TRES

      const result = selectPositionalMove(emptyPositions, config)
      expect([1, 3, 5, 7]).toContain(result)
    })

    test('should return first edge when multiple edges available', () => {
      const emptyPositions = [1, 2, 3, 5, 7] // Multiple edges available
      const config = BOARD_CONFIGS.TRES

      const result = selectPositionalMove(emptyPositions, config)
      expect([1, 2, 3, 5, 7]).toContain(result) // Should return one of the available edges
    })
  })

  describe('getOpponentPositions - Lines 131-134', () => {
    test('should return all opponent positions from mixed board', () => {
      const board = [1, 2, 0, 1, 2, 0, 1, 0, 2]
      const opponentSymbol = SYMBOLS.O

      const result = getOpponentPositions(board, opponentSymbol)
      expect(result).toEqual([1, 4, 8])
    })

    test('should return empty array when no opponent positions', () => {
      const board = [1, 1, 0, 1, 1, 0, 1, 0, 1]
      const opponentSymbol = SYMBOLS.O

      const result = getOpponentPositions(board, opponentSymbol)
      expect(result).toEqual([])
    })

    test('should handle board with all opponent symbols', () => {
      const board = [2, 2, 2, 2, 2, 2, 2, 2, 2]
      const opponentSymbol = SYMBOLS.O

      const result = getOpponentPositions(board, opponentSymbol)
      expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    })
  })

  describe('verifyWinner - Lines 143-147', () => {
    test('should detect winner in first row', () => {
      const board = [1, 1, 1, 0, 0, 0, 0, 0, 0]
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = verifyWinner(board, symbol, winningCombinations)
      expect(result).toBe(true)
    })

    test('should detect winner in diagonal', () => {
      const board = [2, 0, 0, 0, 2, 0, 0, 0, 2]
      const symbol = SYMBOLS.O
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = verifyWinner(board, symbol, winningCombinations)
      expect(result).toBe(true)
    })

    test('should return false when no winner', () => {
      const board = [1, 2, 1, 2, 1, 2, 2, 1, 2]
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = verifyWinner(board, symbol, winningCombinations)
      expect(result).toBe(false)
    })
  })

  describe('getBoardSize - Lines 154-156', () => {
    test('should return 3 for 9-position board', () => {
      const result = getBoardSize(9)
      expect(result).toBe(3)
    })

    test('should return 5 for 25-position board', () => {
      const result = getBoardSize(25)
      expect(result).toBe(5)
    })

    test('should handle edge case with 1-position board', () => {
      const result = getBoardSize(1)
      expect(result).toBe(1)
    })
  })

  describe('getRowColumn - Lines 164-169', () => {
    test('should return correct row and column for 3x3 board', () => {
      const result = getRowColumn(5, 3)
      expect(result).toEqual({ row: 1, column: 2 })
    })

    test('should return correct row and column for 5x5 board', () => {
      const result = getRowColumn(12, 5)
      expect(result).toEqual({ row: 2, column: 2 })
    })

    test('should handle edge positions', () => {
      const result = getRowColumn(0, 3)
      expect(result).toEqual({ row: 0, column: 0 })
    })
  })

  describe('getPosition - Lines 178-180', () => {
    test('should return correct position for 3x3 board', () => {
      const result = getPosition(1, 2, 3)
      expect(result).toBe(5)
    })

    test('should return correct position for 5x5 board', () => {
      const result = getPosition(2, 2, 5)
      expect(result).toBe(12)
    })

    test('should handle edge positions', () => {
      const result = getPosition(0, 0, 3)
      expect(result).toBe(0)
    })
  })

  describe('evaluateWinningMove - Lines 27-35', () => {
    test('should return true when move creates winning row', () => {
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0]
      const position = 2
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = evaluateWinningMove(
        board,
        position,
        symbol,
        winningCombinations
      )
      expect(result).toBe(true)
    })

    test('should return false when move does not create win', () => {
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 0]
      const position = 1
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = evaluateWinningMove(
        board,
        position,
        symbol,
        winningCombinations
      )
      expect(result).toBe(false)
    })
  })

  describe('findImmediateWin - Lines 40-50', () => {
    test('should find winning move in row', () => {
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8]
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = findImmediateWin(
        board,
        emptyPositions,
        symbol,
        winningCombinations
      )
      expect(result).toBe(2)
    })

    test('should return null when no winning move available', () => {
      const board = [1, 2, 1, 2, 1, 2, 2, 1, 2]
      const emptyPositions = []
      const symbol = SYMBOLS.X
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = findImmediateWin(
        board,
        emptyPositions,
        symbol,
        winningCombinations
      )
      expect(result).toBe(null)
    })
  })

  describe('findImmediateBlock - Lines 55-65', () => {
    test('should find blocking move for opponent', () => {
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0]
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8]
      const opponentSymbol = SYMBOLS.O
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = findImmediateBlock(
        board,
        emptyPositions,
        opponentSymbol,
        winningCombinations
      )
      expect(result).toBe(2)
    })

    test('should return null when no blocking move needed', () => {
      const board = [1, 2, 1, 2, 1, 2, 2, 1, 2]
      const emptyPositions = []
      const opponentSymbol = SYMBOLS.O
      const winningCombinations = BOARD_CONFIGS.TRES.winningCombinations

      const result = findImmediateBlock(
        board,
        emptyPositions,
        opponentSymbol,
        winningCombinations
      )
      expect(result).toBe(null)
    })
  })

  describe('determinePlayerSymbols - Lines 11-17', () => {
    test('should assign X for odd number of empty positions', () => {
      const result = determinePlayerSymbols(9)
      expect(result).toEqual({
        miSimbolo: SYMBOLS.X,
        simboloOponente: SYMBOLS.O
      })
    })

    test('should assign O for even number of empty positions', () => {
      const result = determinePlayerSymbols(8)
      expect(result).toEqual({
        miSimbolo: SYMBOLS.O,
        simboloOponente: SYMBOLS.X
      })
    })

    test('should handle edge case with 0 empty positions', () => {
      const result = determinePlayerSymbols(0)
      expect(result).toEqual({
        miSimbolo: SYMBOLS.O,
        simboloOponente: SYMBOLS.X
      })
    })
  })
})
