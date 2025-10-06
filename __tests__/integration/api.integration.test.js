// Integration Tests - API Endpoints
// Tests that involve API interactions and external dependencies

import request from 'supertest';
import { app } from '../../app/server.js';

describe('Integration Tests - API Endpoints', () => {
  describe('API Response Format', () => {
    test('should return consistent response format for valid requests', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
      expect(typeof response.body.movimiento).toBe('number');
      expect(Number.isInteger(response.body.movimiento)).toBe(true);
    });

    test('should return consistent error format for invalid requests', async () => {
      const response = await request(app)
        .post('/move')
        .send({ board: 'invalid' })
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(typeof response.body.error).toBe('string');
      expect(response.body.error.length).toBeGreaterThan(0);
    });
  });

  describe('Board Size Validation', () => {
    test('should accept 3x3 board (9 movimientos)', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(9);
    });

    test('should accept 5x5 board (25 movimientos)', async () => {
      const board = new Array(25).fill(0);
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(25);
    });

    test('should reject 4x4 board (16 movimientos)', async () => {
      const board = new Array(16).fill(0);
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body.error).toContain('positions');
    });

    test('should reject 2x2 board (4 movimientos)', async () => {
      const board = new Array(4).fill(0);
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body.error).toContain('positions');
    });
  });

  describe('Board State Validation', () => {
    test('should handle board with mixed values', async () => {
      const board = [1, 2, 1, 2, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(9);
    });

    test('should handle board with all zeros', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0);
      expect(response.body.movimiento).toBeLessThan(9);
    });

    test('should reject board with invalid values', async () => {
      const board = [1, 2, 3, 0, 0, 0, 0, 0, 0]; // 3 is invalid
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body.error).toContain('invalid');
    });
  });

  describe('Edge Cases', () => {
    test('should handle almost full 3x3 board', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body.movimiento).toBe(8);
    });

    test('should handle almost full 5x5 board', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body.movimiento).toBe(24);
    });

    test('should handle board with no empty movimientos', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body.error).toContain('empty');
    });
  });

  describe('Content Type Handling', () => {
    test('should handle application/json content type', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .set('Content-Type', 'application/json')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
    });

    test('should handle missing content type', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      expect(response.body).toHaveProperty('movimiento');
    });
  });
});
