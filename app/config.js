// Configuración centralizada para algoritmos de Ta-Te-Ti

export const BOARD_CONFIGS = {
  TRES: {
    size: 9,
    center: 4,
    corners: [0, 2, 6, 8],
    edges: [1, 3, 5, 7],
    winningCombinations: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
      [0, 4, 8], [2, 4, 6] // Diagonales
    ],
    diagonalOpposites: {
      0: 8, 2: 6, 6: 2, 8: 0
    }
  },
  CINCO: {
    size: 25,
    center: 12,
    corners: [0, 4, 20, 24],
    edges: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23],
    winningCombinations: [
      // Filas horizontales (3 combinaciones por fila)
      [0, 1, 2], [1, 2, 3], [2, 3, 4], // Fila 0
      [5, 6, 7], [6, 7, 8], [7, 8, 9], // Fila 1
      [10, 11, 12], [11, 12, 13], [12, 13, 14], // Fila 2
      [15, 16, 17], [16, 17, 18], [17, 18, 19], // Fila 3
      [20, 21, 22], [21, 22, 23], [22, 23, 24], // Fila 4
      
      // Columnas verticales (3 combinaciones por columna)
      [0, 5, 10], [5, 10, 15], [10, 15, 20], // Columna 0
      [1, 6, 11], [6, 11, 16], [11, 16, 21], // Columna 1
      [2, 7, 12], [7, 12, 17], [12, 17, 22], // Columna 2
      [3, 8, 13], [8, 13, 18], [13, 18, 23], // Columna 3
      [4, 9, 14], [9, 14, 19], [14, 19, 24], // Columna 4
      
      // Diagonales principales (3 combinaciones)
      [0, 6, 12], [6, 12, 18], [12, 18, 24], // Diagonal principal
      [4, 8, 12], [8, 12, 16], [12, 16, 20], // Diagonal secundaria
      
      // Diagonales menores (6 combinaciones adicionales)
      [2, 8, 14], [1, 7, 13], [7, 13, 19], // Diagonales menores
      [3, 7, 11], [7, 11, 15], [5, 11, 17], [11, 17, 23] // Más diagonales menores
    ],
    diagonalOpposites: {
      0: 24, 4: 20, 20: 4, 24: 0
    }
  }
};

export const SYMBOLS = {
  EMPTY: 0,
  X: 1,
  O: 2
};
