import {
  buscarMovimientoGanador,
  buscarMovimientoCompletar,
  estrategiaPosicional,
  verificarGanador
} from '../app/algoritmo.js';

/**
 * Pruebas unitarias directas para funciones internas del algoritmo
 * Estas pruebas validan el comportamiento específico de cada función
 */

describe('verificarGanador - Pruebas Unitarias Directas', () => {
  test('debería detectar ganador en fila superior', () => {
    const board = [1, 1, 1, 0, 0, 0, 0, 0, 0];
    expect(verificarGanador(board, 1)).toBe(true);
  });

  test('debería detectar ganador en fila media', () => {
    const board = [0, 0, 0, 2, 2, 2, 0, 0, 0];
    expect(verificarGanador(board, 2)).toBe(true);
  });

  test('debería detectar ganador en fila inferior', () => {
    const board = [0, 0, 0, 0, 0, 0, 1, 1, 1];
    expect(verificarGanador(board, 1)).toBe(true);
  });

  test('debería detectar ganador en columna izquierda', () => {
    const board = [2, 0, 0, 2, 0, 0, 2, 0, 0];
    expect(verificarGanador(board, 2)).toBe(true);
  });

  test('debería detectar ganador en columna central', () => {
    const board = [0, 1, 0, 0, 1, 0, 0, 1, 0];
    expect(verificarGanador(board, 1)).toBe(true);
  });

  test('debería detectar ganador en columna derecha', () => {
    const board = [0, 0, 2, 0, 0, 2, 0, 0, 2];
    expect(verificarGanador(board, 2)).toBe(true);
  });

  test('debería detectar ganador en diagonal principal', () => {
    const board = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    expect(verificarGanador(board, 1)).toBe(true);
  });

  test('debería detectar ganador en diagonal secundaria', () => {
    const board = [0, 0, 2, 0, 2, 0, 2, 0, 0];
    expect(verificarGanador(board, 2)).toBe(true);
  });

  test('debería retornar false cuando no hay ganador', () => {
    const board = [1, 2, 1, 2, 1, 2, 2, 1, 2];
    expect(verificarGanador(board, 1)).toBe(false);
  });

  test('debería retornar false para tablero vacío', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(verificarGanador(board, 1)).toBe(false);
  });

  test('debería retornar false para símbolo incorrecto', () => {
    const board = [1, 1, 1, 0, 0, 0, 0, 0, 0];
    expect(verificarGanador(board, 2)).toBe(false);
  });
});

describe('buscarMovimientoGanador - Pruebas Unitarias Directas', () => {
  test('debería encontrar movimiento ganador en fila', () => {
    const board = [1, 1, 0, 0, 0, 0, 0, 0, 0];
    const emptyPositions = [2, 3, 4, 5, 6, 7, 8];
    
    const result = buscarMovimientoGanador(board, emptyPositions, 1);
    
    expect(result).toBe(2);
  });

  test('debería encontrar movimiento ganador en columna', () => {
    const board = [1, 0, 0, 1, 0, 0, 0, 0, 0];
    const emptyPositions = [1, 2, 4, 5, 6, 7, 8];
    
    const result = buscarMovimientoGanador(board, emptyPositions, 1);
    
    expect(result).toBe(6);
  });

  test('debería encontrar movimiento ganador en diagonal principal', () => {
    const board = [1, 0, 0, 0, 1, 0, 0, 0, 0];
    const emptyPositions = [1, 2, 3, 5, 6, 7, 8];
    
    const result = buscarMovimientoGanador(board, emptyPositions, 1);
    
    expect(result).toBe(8);
  });

  test('debería encontrar movimiento ganador en diagonal secundaria', () => {
    const board = [0, 0, 1, 0, 1, 0, 0, 0, 0];
    const emptyPositions = [0, 1, 3, 5, 6, 7, 8];
    
    const result = buscarMovimientoGanador(board, emptyPositions, 1);
    
    expect(result).toBe(6);
  });

  test('debería retornar null cuando no puede ganar', () => {
    const board = [1, 2, 1, 2, 0, 0, 0, 0, 0];
    const emptyPositions = [4, 5, 6, 7, 8];
    
    const result = buscarMovimientoGanador(board, emptyPositions, 1);
    
    expect(result).toBe(null);
  });

  test('debería retornar null para tablero vacío', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    const result = buscarMovimientoGanador(board, emptyPositions, 1);
    
    expect(result).toBe(null);
  });
});

describe('buscarMovimientoCompletar - Pruebas Unitarias Directas', () => {
  test('debería completar combinación en fila', () => {
    const board = [1, 0, 1, 0, 0, 0, 0, 0, 0];
    const emptyPositions = [1, 3, 4, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    expect(result).toBe(1);
  });

  test('debería completar combinación en columna', () => {
    const board = [1, 0, 0, 1, 0, 0, 0, 0, 0];
    const emptyPositions = [1, 2, 4, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    expect(result).toBe(6);
  });

  test('debería completar combinación en diagonal principal', () => {
    const board = [1, 0, 0, 0, 1, 0, 0, 0, 0];
    const emptyPositions = [1, 2, 3, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    expect(result).toBe(8);
  });

  test('debería completar combinación en diagonal secundaria', () => {
    const board = [0, 0, 1, 0, 1, 0, 0, 0, 0];
    const emptyPositions = [0, 1, 3, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    expect(result).toBe(6);
  });

  test('debería retornar null cuando no hay combinación de 2', () => {
    const board = [1, 2, 1, 2, 0, 0, 0, 0, 0];
    const emptyPositions = [4, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    expect(result).toBe(null);
  });

  test('debería retornar null cuando posición faltante no está vacía', () => {
    const board = [1, 2, 1, 0, 0, 0, 0, 0, 0];
    const emptyPositions = [3, 4, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    expect(result).toBe(null);
  });

  test('debería retornar null para tablero vacío', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    expect(result).toBe(null);
  });
});

describe('estrategiaPosicional - Pruebas Unitarias Directas', () => {
  test('debería elegir centro cuando está disponible', () => {
    const emptyPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    const result = estrategiaPosicional(emptyPositions);
    
    expect(result).toBe(4);
  });

  test('debería elegir esquina cuando centro no está disponible', () => {
    const emptyPositions = [0, 1, 2, 3, 5, 6, 7, 8];
    
    const result = estrategiaPosicional(emptyPositions);
    
    expect(result).toBe(0);
  });

  test('debería elegir borde cuando centro y esquinas no están disponibles', () => {
    const emptyPositions = [1, 3, 5, 7];
    
    const result = estrategiaPosicional(emptyPositions);
    
    expect(result).toBe(1);
  });

  test('debería elegir cualquier posición cuando solo queda una', () => {
    const emptyPositions = [8];
    
    const result = estrategiaPosicional(emptyPositions);
    
    expect(result).toBe(8);
  });

  test('debería elegir primera esquina disponible', () => {
    const emptyPositions = [2, 6, 8];
    
    const result = estrategiaPosicional(emptyPositions);
    
    expect(result).toBe(2);
  });

  test('debería elegir primer borde disponible', () => {
    const emptyPositions = [3, 5, 7];
    
    const result = estrategiaPosicional(emptyPositions);
    
    expect(result).toBe(3);
  });

  test('debería manejar array vacío', () => {
    const emptyPositions = [];
    
    const result = estrategiaPosicional(emptyPositions);
    
    expect(result).toBe(undefined);
  });
});

  describe('Tests adicionales para cobertura específica', () => {
    test('buscarMovimientoGanador con múltiples opciones de ganar', () => {
      const board = [1, 1, 0, 0, 1, 0, 0, 0, 0];
      const emptyPositions = [2, 3, 5, 6, 7, 8];
      
      const result = buscarMovimientoGanador(board, emptyPositions, 1);
      
      // Debería encontrar la primera opción de ganar
      expect([2, 6]).toContain(result);
    });

    test('buscarMovimientoCompletar con múltiples combinaciones de 2', () => {
      const board = [1, 0, 1, 0, 1, 0, 0, 0, 0];
      const emptyPositions = [1, 3, 5, 6, 7, 8];
      
      const result = buscarMovimientoCompletar(board, emptyPositions, 1);
      
      // Debería completar la primera combinación encontrada
      expect([1, 6]).toContain(result);
    });

    test('estrategiaPosicional con múltiples esquinas', () => {
      const emptyPositions = [2, 6, 8];
      
      const result = estrategiaPosicional(emptyPositions);
      
      // Debería elegir la primera esquina en orden [0, 2, 6, 8]
      expect(result).toBe(2);
    });

    test('estrategiaPosicional con múltiples bordes', () => {
      const emptyPositions = [3, 5, 7];
      
      const result = estrategiaPosicional(emptyPositions);
      
      // Debería elegir el primer borde en orden [1, 3, 5, 7]
      expect(result).toBe(3);
    });
  });

  describe('Casos Edge para Funciones Internas', () => {
  test('verificarGanador con tablero parcialmente lleno', () => {
    const board = [1, 0, 1, 0, 0, 0, 0, 0, 0];
    expect(verificarGanador(board, 1)).toBe(false);
  });

  test('buscarMovimientoGanador con múltiples opciones', () => {
    const board = [1, 1, 0, 0, 1, 0, 0, 0, 0];
    const emptyPositions = [2, 3, 5, 6, 7, 8];
    
    const result = buscarMovimientoGanador(board, emptyPositions, 1);
    
    // Debería encontrar la primera opción de ganar
    expect([2, 6]).toContain(result);
  });

  test('buscarMovimientoCompletar con múltiples combinaciones', () => {
    const board = [1, 0, 1, 0, 1, 0, 0, 0, 0];
    const emptyPositions = [1, 3, 5, 6, 7, 8];
    
    const result = buscarMovimientoCompletar(board, emptyPositions, 1);
    
    // Debería completar la primera combinación encontrada
    expect([1, 6]).toContain(result);
  });

  test('estrategiaPosicional con orden específico', () => {
    const emptyPositions = [8, 6, 2, 0]; // Orden no estándar
    
    const result = estrategiaPosicional(emptyPositions);
    
    // Debería elegir la primera esquina en el orden estándar [0, 2, 6, 8]
    expect(result).toBe(0);
  });
});
