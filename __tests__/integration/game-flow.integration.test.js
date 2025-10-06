// Integration Tests - Game Flow
// Tests that simulate complete game scenarios

import request from 'supertest';
import { app } from '../../app/server.js';

describe('Integration Tests - Game Flow', () => {
  describe('Complete 3x3 Game Simulation', () => {
    test('should play a complete 3x3 game', async () => {
      let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      const moves = [];
      
      // Simulate 9 moves (full board)
      for (let i = 0; i < 9; i++) {
        const response = await request(app)
          .post('/move')
          .send({ board })
          .expect(200);
        
        const movimiento = response.body.movimiento;
        moves.push(movimiento);
        
        // Verify movimiento is valid and empty
        expect(movimiento).toBeGreaterThanOrEqual(0);
        expect(movimiento).toBeLessThan(9);
        expect(board[movimiento]).toBe(0);
        
        // Make the move (alternate between 1 and 2)
        board[movimiento] = (i % 2) + 1;
      }
      
      // Verify all movimientos were filled
      expect(board.every(cell => cell !== 0)).toBe(true);
      expect(moves).toHaveLength(9);
    });

    test('should handle 3x3 game with some moves already made', async () => {
      const board = [1, 0, 0, 0, 2, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBeGreaterThanOrEqual(0);
      expect(movimiento).toBeLessThan(9);
      expect(board[movimiento]).toBe(0);
    });
  });

  describe('Complete 5x5 Game Simulation', () => {
    test('should play a partial 5x5 game', async () => {
      let board = new Array(25).fill(0);
      const moves = [];
      
      // Simulate 10 moves (partial game)
      for (let i = 0; i < 10; i++) {
        const response = await request(app)
          .post('/move')
          .send({ board })
          .expect(200);
        
        const movimiento = response.body.movimiento;
        moves.push(movimiento);
        
        // Verify movimiento is valid and empty
        expect(movimiento).toBeGreaterThanOrEqual(0);
        expect(movimiento).toBeLessThan(25);
        expect(board[movimiento]).toBe(0);
        
        // Make the move (alternate between 1 and 2)
        board[movimiento] = (i % 2) + 1;
      }
      
      // Verify 10 movimientos were filled
      const filledPositions = board.filter(cell => cell !== 0).length;
      expect(filledPositions).toBe(10);
      expect(moves).toHaveLength(10);
    });

    test('should handle 5x5 game with some moves already made', async () => {
      const board = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBeGreaterThanOrEqual(0);
      expect(movimiento).toBeLessThan(25);
      expect(board[movimiento]).toBe(0);
    });
  });

  describe('Winning Scenarios', () => {
    test('should complete winning row in 3x3', async () => {
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(2); // Should complete the row
    });

    test('should complete winning column in 3x3', async () => {
      const board = [1, 0, 0, 1, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(6); // Should complete the column
    });

    test('should complete winning diagonal in 3x3', async () => {
      const board = [1, 0, 0, 0, 1, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(8); // Should complete the diagonal
    });
  });

  describe('Blocking Scenarios', () => {
    test('should block opponent row in 3x3', async () => {
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(2); // Should block the row
    });

    test('should block opponent column in 3x3', async () => {
      const board = [2, 0, 0, 2, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(6); // Should block the column
    });

    test('should block opponent diagonal in 3x3', async () => {
      const board = [2, 0, 0, 0, 2, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(8); // Should block the diagonal
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle multiple winning opportunities', async () => {
      const board = [1, 1, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(2); // Should prioritize winning
    });

    test('should handle multiple blocking opportunities', async () => {
      const board = [2, 2, 0, 0, 0, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(2); // Should block opponent
    });

    test('should handle mixed winning and blocking opportunities', async () => {
      const board = [1, 1, 0, 2, 2, 0, 0, 0, 0];
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200);
      
      const movimiento = response.body.movimiento;
      expect(movimiento).toBe(2); // Should prioritize winning over blocking
    });
  });

  describe('Error Recovery', () => {
    test('should recover from invalid board state', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1]; // Full board
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400);
      
      expect(response.body.error).toContain('empty');
    });

    test('should handle malformed requests gracefully', async () => {
      const response = await request(app)
        .post('/move')
        .send({ board: 'invalid' })
        .expect(400);
      
      expect(response.body.error).toContain('array');
    });
  });
});
