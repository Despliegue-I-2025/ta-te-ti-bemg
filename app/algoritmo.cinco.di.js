// Combinaciones Ganador para tablero 5x5 (Cg) - 3 en línea
const COMBINACIONES_GANADOR = [
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
]

function algoritmoCinco (board, emptyPositions) {
  const vacias = emptyPositions.length
  const somosX = vacias % 2 === 1
  const miSimbolo = somosX ? 1 : 2
  const simboloOponente = somosX ? 2 : 1
  const posicionesVacias = emptyPositions

  // Movimiento 1: Centro
  if (vacias === 25) {
    return 12 // Centro del tablero 5x5
  }

  // Movimiento 2: Centro o esquina
  if (vacias === 24) {
    if (posicionesVacias.includes(12)) {
      return 12
    }
    const esquinas = [0, 4, 20, 24]
    for (const esquina of esquinas) {
      if (posicionesVacias.includes(esquina)) {
        return esquina
      }
    }
  }

  // Movimiento 3: Estrategia específica
  if (vacias === 23) {
    // Intentar ganar
    for (const pos of posicionesVacias) {
      const testBoard = [...board]
      testBoard[pos] = miSimbolo
      if (verificarGanador(testBoard, miSimbolo)) {
        return pos
      }
    }

    // Bloquear oponente
    for (const pos of posicionesVacias) {
      const testBoard = [...board]
      testBoard[pos] = simboloOponente
      if (verificarGanador(testBoard, simboloOponente)) {
        return pos
      }
    }

    // Estrategia posicional
    const posicionesO = board
      .map((cell, index) => (cell === simboloOponente ? index : null))
      .filter((i) => i !== null)
    const posicionO = posicionesO[0]

    if ([0, 4, 20, 24].includes(posicionO)) {
      // O en esquina - bloquear diagonal opuesta
      const diagonalOpuesta = {
        0: 24,
        4: 20,
        20: 4,
        24: 0
      }
      const posicionBloqueo = diagonalOpuesta[posicionO]
      if (posicionesVacias.includes(posicionBloqueo)) {
        return posicionBloqueo
      }
    }

    if (posicionO === 12) {
      // O en centro - tomar esquina
      const esquinas = [0, 4, 20, 24].filter((pos) =>
        posicionesVacias.includes(pos)
      )
      if (esquinas.length > 0) return esquinas[0]
    }

    if ([1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23].includes(posicionO)) {
      // O en borde - bloquear fila/columna
      const fila = Math.floor(posicionO / 5)
      const columna = posicionO % 5

      for (let i = 0; i < 5; i++) {
        const posFila = fila * 5 + i
        const posColumna = i * 5 + columna

        if (posicionesVacias.includes(posFila) && posFila !== posicionO) {
          return posFila
        }
        if (posicionesVacias.includes(posColumna) && posColumna !== posicionO) {
          return posColumna
        }
      }
    }

    return posicionesVacias[0]
  }

  // Movimientos 4+: Estrategia avanzada
  if (vacias <= 22) {
    // Intentar ganar
    const movimientoGanador = buscarMovimientoGanador(
      board,
      posicionesVacias,
      miSimbolo
    )
    if (movimientoGanador !== null) {
      return movimientoGanador
    }

    // Bloquear oponente
    const movimientoBloqueo = buscarMovimientoGanador(
      board,
      posicionesVacias,
      simboloOponente
    )
    if (movimientoBloqueo !== null) {
      return movimientoBloqueo
    }

    // Completar combinación propia
    const movimientoCompletar = buscarMovimientoCompletar(
      board,
      posicionesVacias,
      miSimbolo
    )
    if (movimientoCompletar !== null) {
      return movimientoCompletar
    }

    // Bloquear combinación oponente
    const movimientoBloquearCombinacion = buscarMovimientoCompletar(
      board,
      posicionesVacias,
      simboloOponente
    )
    if (movimientoBloquearCombinacion !== null) {
      return movimientoBloquearCombinacion
    }

    // Estrategia posicional
    return estrategiaPosicional(posicionesVacias)
  }

  return posicionesVacias[0]
}

function buscarMovimientoGanador (board, posicionesVacias, simbolo) {
  for (const posicion of posicionesVacias) {
    const tableroPrueba = [...board]
    tableroPrueba[posicion] = simbolo
    if (verificarGanador(tableroPrueba, simbolo)) {
      return posicion
    }
  }
  return null
}

function buscarMovimientoCompletar (board, posicionesVacias, simbolo) {
  for (const combinacion of COMBINACIONES_GANADOR) {
    const posicionesCombinacion = combinacion.filter(
      (pos) => board[pos] === simbolo
    )

    if (posicionesCombinacion.length === 2) {
      const posicionFaltante = combinacion.find((pos) => board[pos] === 0)
      if (
        posicionFaltante !== undefined &&
        posicionesVacias.includes(posicionFaltante)
      ) {
        return posicionFaltante
      }
    }
  }
  return null
}

function estrategiaPosicional (posicionesVacias) {
  const centro = 12
  if (posicionesVacias.includes(centro)) {
    return centro
  }

  const esquinas = [0, 4, 20, 24].filter((pos) => posicionesVacias.includes(pos))
  if (esquinas.length > 0) {
    return esquinas[0]
  }

  const bordes = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23].filter((pos) => posicionesVacias.includes(pos))
  if (bordes.length > 0) {
    return bordes[0]
  }

  return posicionesVacias[0]
}

function verificarGanador (board, simbolo) {
  return COMBINACIONES_GANADOR.some((combinacion) =>
    combinacion.every((posicion) => board[posicion] === simbolo)
  )
}

// Exportar funciones internas para testing
export {
  buscarMovimientoGanador,
  buscarMovimientoCompletar,
  estrategiaPosicional,
  verificarGanador
}

export default algoritmoCinco
