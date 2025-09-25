import request from 'supertest';
import express from 'express';
import algoritmo from '../app/algoritmo.js';

// Mock del servidor para testing
const createTestServer = () => {
  const app = express();
  
  app.get('/move', (req, res) => {
    let boardParam = req.query.board;
    let board; 
    try {
      board = JSON.parse(boardParam);
    } catch (e) {
      return res.status(400).json({ error: 'Parámetro board inválido. Debe ser un array JSON.' });
    }
    if (!Array.isArray(board) || board.length !== 9) {
      return res.status(400).json({ error: 'El tablero debe ser un array de 9 posiciones.' });
    }
    // Buscar posiciones vacías (asumiendo que 0 es vacío)
    const emptyPositions = board
      .map((v, i) => v === 0 ? i : null)
      .filter(i => i !== null);
    
    if (emptyPositions.length === 0) {
      return res.status(400).json({ error: 'No hay movimientos disponibles.' });
    }
    
    const move = algoritmo(board, emptyPositions);
    res.json({ movimiento: move });
  });

  return app;
};

describe('Servidor Ta-Te-Ti', () => {
  let app;

  beforeEach(() => {
    app = createTestServer();
  });

  describe('GET /move', () => {
    test('debería retornar un movimiento válido para tablero vacío', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('movimiento');
      expect(typeof response.body.movimiento).toBe('number');
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThanOrEqual(8);
    });

    test('debería retornar movimiento 4 (centro) para primer movimiento', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(200);
      expect(response.body.movimiento).toBe(4);
    });

    test('debería manejar tablero con movimientos previos', async () => {
      const board = [1, 0, 0, 0, 2, 0, 0, 0, 0];
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('movimiento');
      expect([0, 2, 6, 8]).toContain(response.body.movimiento); // Debería elegir esquina
    });

    test('debería retornar error 400 para parámetro board inválido', async () => {
      const response = await request(app)
        .get('/move')
        .query({ board: 'invalid-json' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Parámetro board inválido');
    });

    test('debería retornar error 400 para board que no es array', async () => {
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify('not-an-array') });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('El tablero debe ser un array de 9 posiciones');
    });

    test('debería retornar error 400 para board con longitud incorrecta', async () => {
      const board = [0, 0, 0, 0, 0]; // Solo 5 posiciones
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('El tablero debe ser un array de 9 posiciones');
    });

    test('debería retornar error 400 para tablero lleno', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1]; // Tablero lleno
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('No hay movimientos disponibles');
    });

    test('debería manejar tablero con diferentes símbolos', async () => {
      const board = [2, 0, 0, 0, 1, 0, 0, 0, 0];
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('movimiento');
      expect(typeof response.body.movimiento).toBe('number');
    });

    test('debería retornar movimiento válido para tablero casi lleno', async () => {
      const board = [1, 2, 1, 2, 0, 1, 2, 1, 2];
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(200);
      expect(response.body.movimiento).toBe(4); // Solo queda el centro
    });

    test('debería manejar request sin parámetro board', async () => {
      const response = await request(app)
        .get('/move');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('debería manejar request con board null', async () => {
      const response = await request(app)
        .get('/move')
        .query({ board: 'null' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Tests de integración para cobertura completa', () => {
    test('debería manejar flujo completo de juego', async () => {
      // Simular un juego completo
      const board1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const res1 = await request(app).get(`/move?board=${JSON.stringify(board1)}`);
      expect(res1.statusCode).toEqual(200);
      expect(res1.body.movimiento).toBe(4); // Centro

      const board2 = [0, 0, 0, 0, 1, 0, 0, 0, 0];
      const res2 = await request(app).get(`/move?board=${JSON.stringify(board2)}`);
      expect(res2.statusCode).toEqual(200);
      expect([0, 2, 6, 8]).toContain(res2.body.movimiento); // Esquina

      const board3 = [0, 0, 0, 0, 1, 0, 0, 0, 2];
      const res3 = await request(app).get(`/move?board=${JSON.stringify(board3)}`);
      expect(res3.statusCode).toEqual(200);
      expect(typeof res3.body.movimiento).toBe('number');
    });

    test('debería manejar escenario de empate', async () => {
      const board = [1, 2, 1, 2, 1, 2, 2, 1, 0];
      const res = await request(app).get(`/move?board=${JSON.stringify(board)}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.movimiento).toBe(8);
    });

    test('debería manejar escenario de victoria inminente', async () => {
      const board = [1, 1, 0, 2, 2, 0, 0, 0, 0];
      const res = await request(app).get(`/move?board=${JSON.stringify(board)}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.movimiento).toBe(2);
    });

    test('debería manejar escenario de bloqueo inminente', async () => {
      const board = [2, 2, 0, 1, 1, 0, 0, 0, 0];
      const res = await request(app).get(`/move?board=${JSON.stringify(board)}`);
      
      expect(res.statusCode).toEqual(200);
      expect([2, 5]).toContain(res.body.movimiento);
    });
  });

  describe('Validación de respuestas', () => {
    test('debería retornar JSON válido', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    test('debería retornar movimiento en rango válido', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) });

      expect(response.status).toBe(200);
      const move = response.body.movimiento;
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThanOrEqual(8);
      expect(Number.isInteger(move)).toBe(true);
    });
  });
});
