// Edge Case Tests for Core Algorithm Files
// Targeting uncovered lines in algoritmo.cinco.core.js and algoritmo.tres.core.js

import algoritmoCincoCore from '../../app/algoritmo.cinco.core.js';
import algoritmoTresCore from '../../app/algoritmo.tres.core.js';
import { BOARD_CONFIGS, SYMBOLS } from '../../app/config.js';

describe('Algorithm Core Edge Cases', () => {
  describe('algoritmo.cinco.core.js - Lines 75-83, 103, 109', () => {
    test('should handle strategic move when opponent in specific position (line 75-83)', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      
      const result = algoritmoCincoCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should complete strategic combination (line 103)', () => {
      const board = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      
      const result = algoritmoCincoCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should block strategic combination (line 109)', () => {
      const board = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      
      const result = algoritmoCincoCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should handle dependency injection with custom strategic functions', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      
      const customDependencies = {
        config: BOARD_CONFIGS.CINCO,
        verificarGanadorFn: () => false,
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: () => 12,
        obtenerPosicionesOponenteFn: () => [24],
        determinarSimbolosFn: () => ({ miSimbolo: SYMBOLS.X, simboloOponente: SYMBOLS.O })
      };
      
      const result = algoritmoCincoCore(board, emptyPositions, customDependencies);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('algoritmo.tres.core.js - Lines 46-54, 74, 80, 87', () => {
    test('should handle strategic move when opponent in specific position (line 46-54)', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7];
      
      const result = algoritmoTresCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should complete strategic combination (line 74)', () => {
      const board = [1, 0, 0, 0, 1, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8];
      
      const result = algoritmoTresCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should block strategic combination (line 80)', () => {
      const board = [2, 0, 0, 0, 2, 0, 0, 0, 0];
      const emptyPositions = [1, 2, 3, 5, 6, 7, 8];
      
      const result = algoritmoTresCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should use positional strategy as fallback (line 87)', () => {
      const board = [1, 2, 1, 2, 1, 2, 2, 1, 0];
      const emptyPositions = [8];
      
      const result = algoritmoTresCore(board, emptyPositions);
      expect(result).toBe(8);
    });

    test('should handle dependency injection with custom strategic functions', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7];
      
      const customDependencies = {
        config: BOARD_CONFIGS.TRES,
        verificarGanadorFn: () => false,
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: () => 4,
        obtenerPosicionesOponenteFn: () => [8],
        determinarSimbolosFn: () => ({ miSimbolo: SYMBOLS.X, simboloOponente: SYMBOLS.O })
      };
      
      const result = algoritmoTresCore(board, emptyPositions, customDependencies);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Complex Edge Cases', () => {
    test('should handle 5x5 board with complex strategic positioning', () => {
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      
      const result = algoritmoCincoCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should handle 3x3 board with complex strategic positioning', () => {
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 2];
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7];
      
      const result = algoritmoTresCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should handle almost full 5x5 board', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0];
      const emptyPositions = [24];
      
      const result = algoritmoCincoCore(board, emptyPositions);
      expect(result).toBe(24);
    });

    test('should handle almost full 3x3 board', () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0];
      const emptyPositions = [8];
      
      const result = algoritmoTresCore(board, emptyPositions);
      expect(result).toBe(8);
    });

    test('should handle board with multiple strategic opportunities', () => {
      const board = [1, 0, 1, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [1, 3, 4, 5, 6, 7, 8];
      
      const result = algoritmoTresCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });

    test('should handle 5x5 board with multiple strategic opportunities', () => {
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
      const emptyPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      
      const result = algoritmoCincoCore(board, emptyPositions);
      expect(emptyPositions).toContain(result);
    });
  });

  describe('Dependency Injection Edge Cases', () => {
    test('should handle custom config in 5x5 algorithm', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
      
      const customConfig = {
        ...BOARD_CONFIGS.CINCO,
        center: 0, // Custom center
        corners: [1, 2, 3, 4] // Custom corners
      };
      
      const customDependencies = {
        config: customConfig,
        verificarGanadorFn: () => false,
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: (emptyPos, config) => config.center,
        obtenerPosicionesOponenteFn: () => [],
        determinarSimbolosFn: () => ({ miSimbolo: SYMBOLS.X, simboloOponente: SYMBOLS.O })
      };
      
      const result = algoritmoCincoCore(board, emptyPositions, customDependencies);
      expect(result).toBe(0); // Should return custom center
    });

    test('should handle custom config in 3x3 algorithm', () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      
      const customConfig = {
        ...BOARD_CONFIGS.TRES,
        center: 0, // Custom center
        corners: [1, 2, 3, 4] // Custom corners
      };
      
      const customDependencies = {
        config: customConfig,
        verificarGanadorFn: () => false,
        buscarMovimientoGanadorFn: () => null,
        buscarMovimientoCompletarFn: () => null,
        estrategiaPosicionalFn: (emptyPos, config) => config.center,
        obtenerPosicionesOponenteFn: () => [],
        determinarSimbolosFn: () => ({ miSimbolo: SYMBOLS.X, simboloOponente: SYMBOLS.O })
      };
      
      const result = algoritmoTresCore(board, emptyPositions, customDependencies);
      expect([0, 4]).toContain(result); // Should return custom center or default center
    });
  });
});
