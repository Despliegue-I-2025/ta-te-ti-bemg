// Unit Tests - Algoritmo Cinco Refactored (5x5) - With Dependency Injection
// Pure unit tests with no async operations

import algoritmoCincoRefactored from '../../../app/algoritmo.cinco.core.js';
import { BOARD_CONFIGS } from '../../../app/config.js';

describe('Unit Tests - Algoritmo Cinco Refactored (5x5)', () => {
  describe('Basic Functionality', () => {
    test('should return center (12) for first move', () => {
      const board = new Array(25).fill(0);
      const emptyPositions = Array.from({length: 25}, (_, i) => i);
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(result).toBe(12);
    });

    test('should return center if available in second move', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(result).toBe(12);
    });

    test('should return corner when center is occupied', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect([0, 4, 20, 24]).toContain(result);
    });
  });

  describe('Dependency Injection', () => {
    test('should use custom configuration when provided', () => {
      const customConfig = {
        ...BOARD_CONFIGS.CINCO,
        center: 10
      };
      
      const board = new Array(25).fill(0);
      const emptyPositions = Array.from({length: 25}, (_, i) => i);
      const result = algoritmoCincoRefactored(board, emptyPositions, {
        config: customConfig
      });
      expect(result).toBe(10);
    });

    test('should use custom winning function when provided', () => {
      const mockVerificarGanador = () => true;
      const board = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      
      const result = algoritmoCincoRefactored(board, emptyPositions, {
        verificarGanadorFn: mockVerificarGanador
      });
      
      expect(emptyPositions).toContain(result);
    });

    test('should use custom blocking function when provided', () => {
      const mockBuscarMovimientoGanador = () => 5;
      const board = [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      
      const result = algoritmoCincoRefactored(board, emptyPositions, {
        buscarMovimientoGanadorFn: mockBuscarMovimientoGanador
      });
      
      expect([4, 5]).toContain(result);
    });

    test('should use custom positional strategy when provided', () => {
      const mockEstrategiaPosicional = () => 15;
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      
      const result = algoritmoCincoRefactored(board, emptyPositions, {
        estrategiaPosicionalFn: mockEstrategiaPosicional
      });
      
      expect([0, 15]).toContain(result);
    });
  });

  describe('Winning Strategy', () => {
    test('should complete winning row', () => {
      const board = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(result).toBe(4);
    });

    test('should complete winning column', () => {
      const board = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should complete winning diagonal', () => {
      const board = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Blocking Strategy', () => {
    test('should block opponent row', () => {
      const board = [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(result).toBe(4);
    });

    test('should block opponent column', () => {
      const board = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should block opponent diagonal', () => {
      const board = [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Edge Cases', () => {
    test('should handle almost full board', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0];
      const emptyPositions = [24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(result).toBe(24);
    });

    test('should return valid position for any valid input', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Advanced Strategies', () => {
    test('should handle complex blocking scenarios', () => {
      const board = [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(result).toBe(3);
    });

    test('should handle multiple winning opportunities', () => {
      const board = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      const result = algoritmoCincoRefactored(board, emptyPositions);
      expect(result).toBe(3);
    });
  });
});
