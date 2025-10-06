// Advanced Server Integration Tests - Based on Old Test Files
// Targets uncovered server lines and edge cases

import request from 'supertest';
import { app } from '../../app/server.js';

describe('Advanced Server Integration Tests', () => {
  
  describe('GET /move Endpoint - Full Coverage', () => {
    
    test('should handle 3x3 board with query parameter', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect(typeof response.body.movimiento).toBe('number');
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(9);
    });

    test('should handle 5x5 board with query parameter', async () => {
      const board = new Array(25).fill(0);
      
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect(typeof response.body.movimiento).toBe('number');
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(25);
    });

    test('should handle invalid JSON in query parameter', async () => {
      const response = await request(app)
        .get('/move')
        .query({ board: 'invalid-json' })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('JSON');
    });

    test('should handle missing board parameter', async () => {
      const response = await request(app)
        .get('/move')
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });

    test('should handle invalid board size (4x4)', async () => {
      const board = new Array(16).fill(0);
      
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('9 o 25');
    });

    test('should handle board with no empty movimientos', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1];
      
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('movimientos disponibles');
    });

    test('should handle board with some moves already made', async () => {
      const board = [1, 0, 0, 0, 2, 0, 0, 0, 0];
      
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect([1, 2, 3, 5, 6, 7, 8]).toContain(response.body.movimiento);
    });
  });

  describe('POST /move Endpoint - Full Coverage', () => {
    
    test('should handle valid 3x3 board', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect(typeof response.body.movimiento).toBe('number');
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(9);
    });

    test('should handle valid 5x5 board', async () => {
      const board = new Array(25).fill(0);
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect(typeof response.body.movimiento).toBe('number');
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(25);
    });

    test('should handle board with invalid values', async () => {
      const board = [1, 2, 3, 0, 0, 0, 0, 0, 0]; // Invalid value 3
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('invalid');
    });

    test('should handle non-array board', async () => {
      const response = await request(app)
        .post('/move')
        .send({ board: 'not an array' })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('array');
    });

    test('should handle missing board property', async () => {
      const response = await request(app)
        .post('/move')
        .send({})
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('required');
    });

    test('should handle board with no empty movimientos', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1];
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('empty');
    });
  });

  describe('Error Handling - Full Coverage', () => {
    
    test('should handle malformed JSON in POST request', async () => {
      const response = await request(app)
        .post('/move')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);
      
      // Express returns empty body for malformed JSON
      expect(response.body).toEqual({});
    });

    test('should handle unsupported content type', async () => {
      const response = await request(app)
        .post('/move')
        .set('Content-Type', 'text/plain')
        .send('some text')
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });

    test('should handle very large board', async () => {
      const board = new Array(100).fill(0);
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('9 or 25');
    });

    test('should handle empty board array', async () => {
      const board = [];
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('9 or 25');
    });
  });

  describe('Performance Tests', () => {
    
    test('should respond quickly to 3x3 requests', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const start = Date.now();
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(100); // Should respond within 100ms
      expect(response.body).toHaveProperty('movimiento');
    });

    test('should respond quickly to 5x5 requests', async () => {
      const board = new Array(25).fill(0);
      
      const start = Date.now();
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(200); // Should respond within 200ms
      expect(response.body).toHaveProperty('movimiento');
    });

    test('should handle multiple concurrent requests', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const promises = Array.from({ length: 10 }, () =>
        request(app)
          .post('/move')
          .send({ board })
          .expect(200)
      );
      
      const responses = await Promise.all(promises);
      
      responses.forEach(response => {
        expect(response.body).toHaveProperty('movimiento');
        expect(typeof response.body.movimiento).toBe('number');
      });
    });
  });

  describe('Edge Cases', () => {
    
    test('should handle board with mixed valid values', async () => {
      const board = [1, 2, 1, 2, 0, 0, 0, 0, 0];
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect([4, 5, 6, 7, 8]).toContain(response.body.movimiento);
    });

    test('should handle board with all zeros', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect(response.body.movimiento).toBe(4); // Should return center
    });

    test('should handle board with almost all movimientos filled', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0];
      
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect(response.body.movimiento).toBe(8); // Should return the only empty movimiento
    });
  });
});
