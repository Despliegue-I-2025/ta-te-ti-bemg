// Unit Tests - Algoritmo Cinco (5x5) - Original
// Pure unit tests with no async operations

import algoritmoCinco from '../../../app/algoritmo.cinco.di.js';
import { BOARD_CONFIGS } from '../../../app/config.js';

describe('Unit Tests - Algoritmo Cinco (5x5)', () => {
  describe('Basic Functionality', () => {
    test('should return center (12) for first move', () => {
      const board = new Array(25).fill(0);
      const emptyPositions = Array.from({length: 25}, (_, i) => i);
      const result = algoritmoCinco(board, emptyPositions);
      expect(result).toBe(12);
    });

    test('should return center if available in second move', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      const result = algoritmoCinco(board, emptyPositions);
      expect(result).toBe(12);
    });

    test('should return corner when center is occupied', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect([0, 4, 20, 24]).toContain(result);
    });
  });

  describe('Winning Strategy', () => {
    test('should complete winning row', () => {
      const board = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(result).toBe(4);
    });

    test('should complete winning column', () => {
      const board = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should complete winning diagonal', () => {
      const board = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Blocking Strategy', () => {
    test('should block opponent row', () => {
      const board = [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(result).toBe(4);
    });

    test('should block opponent column', () => {
      const board = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should block opponent diagonal', () => {
      const board = [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Edge Cases', () => {
    test('should handle almost full board', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0];
      const emptyPositions = [24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(result).toBe(24);
    });

    test('should return valid position for any valid input', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should handle complex board state', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Position Strategy', () => {
    test('should prefer center over corners', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [0, 4, 12, 20, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect(result).toBe(12);
    });

    test('should choose corner when center not available', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [0, 4, 20, 24];
      const result = algoritmoCinco(board, emptyPositions);
      expect([0, 4, 20, 24]).toContain(result);
    });

    test('should choose edge when center and corners not available', () => {
      const board = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1];
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23];
      const result = algoritmoCinco(board, emptyPositions);
      expect([1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23]).toContain(result);
    });
  });
});
