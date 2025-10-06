// Unit Tests - Algoritmo Tres Refactored (3x3) - With Dependency Injection
// Pure unit tests with no async operations

import algoritmoTresRefactored from '../../../app/algoritmo.tres.di.js';
import { BOARD_CONFIGS } from '../../../app/config.js';

describe('Unit Tests - Algoritmo Tres Refactored (3x3)', () => {
  describe('Basic Functionality', () => {
    test('should return center (4) for first move', () => {
      const board = new Array(9).fill(0);
      const emptyPositions = Array.from({length: 9}, (_, i) => i);
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(4);
    });

    test('should return center if available in second move', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(4);
    });

    test('should return corner when center is occupied', () => {
      const board = [0, 0, 0, 0, 2, 0, 0, 0, 0];
      const emptyPositions = [0, 1, 2, 3, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect([0, 2, 6, 8]).toContain(result);
    });
  });

  describe('Dependency Injection', () => {
    test('should use custom configuration when provided', () => {
      const customConfig = {
        ...BOARD_CONFIGS.TRES,
        center: 5
      };
      
      const board = new Array(9).fill(0);
      const emptyPositions = Array.from({length: 9}, (_, i) => i);
      const result = algoritmoTresRefactored(board, emptyPositions, {
        config: customConfig
      });
      expect(result).toBe(5);
    });

    test('should use custom winning function when provided', () => {
      const mockVerificarGanador = () => true;
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8];
      
      const result = algoritmoTresRefactored(board, emptyPositions, {
        verificarGanadorFn: mockVerificarGanador
      });
      
      expect(emptyPositions).toContain(result);
    });

    test('should use custom blocking function when provided', () => {
      const mockBuscarMovimientoGanador = () => 2;
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8];
      
      const result = algoritmoTresRefactored(board, emptyPositions, {
        buscarMovimientoGanadorFn: mockBuscarMovimientoGanador
      });
      
      expect(result).toBe(2);
    });

    test('should use custom positional strategy when provided', () => {
      const mockEstrategiaPosicional = () => 6;
      const board = [0, 0, 0, 0, 1, 0, 0, 0, 0];
      const emptyPositions = [0, 1, 2, 3, 5, 6, 7, 8];
      
      const result = algoritmoTresRefactored(board, emptyPositions, {
        estrategiaPosicionalFn: mockEstrategiaPosicional
      });
      
      expect(result).toBe(6);
    });
  });

  describe('Winning Strategy', () => {
    test('should complete winning row', () => {
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(2);
    });

    test('should complete winning column', () => {
      const board = [1, 0, 0, 1, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 4, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(6);
    });

    test('should complete winning diagonal', () => {
      const board = [1, 0, 0, 0, 1, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(8);
    });
  });

  describe('Blocking Strategy', () => {
    test('should block opponent row', () => {
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(2);
    });

    test('should block opponent column', () => {
      const board = [2, 0, 0, 2, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 4, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(6);
    });

    test('should block opponent diagonal', () => {
      const board = [2, 0, 0, 0, 2, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(8);
    });
  });

  describe('Edge Cases', () => {
    test('should handle almost full board', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0];
      const emptyPositions = [8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(8);
    });

    test('should return valid position for any valid input', () => {
      const board = [1, 2, 1, 2, 0, 0, 0, 0, 0];
      const emptyPositions = [4, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Advanced Strategies', () => {
    test('should handle complex blocking scenarios', () => {
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(2);
    });

    test('should handle multiple winning opportunities', () => {
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [2, 3, 4, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(2);
    });

    test('should prioritize winning over blocking', () => {
      const board = [1, 1, 0, 2, 2, 0, 0, 0, 0];
      const emptyPositions = [2, 5, 6, 7, 8];
      const result = algoritmoTresRefactored(board, emptyPositions);
      expect(result).toBe(2); // Should complete winning row, not block opponent
    });
  });
});
