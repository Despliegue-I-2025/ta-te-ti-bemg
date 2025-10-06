// Integration Tests - Server
// Tests that involve async operations and external dependencies

import request from 'supertest'
import { app } from '../../app/server.js'

describe('Integration Tests - Server', () => {
  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health').expect(200)

      expect(response.body).toHaveProperty('status', 'OK')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('POST /move', () => {
    test('should handle 3x3 board move', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200)

      expect(response.body).toHaveProperty('movimiento')
      expect(typeof response.body.movimiento).toBe('number')
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0)
      expect(response.body.movimiento).toBeLessThan(9)
    })

    test('should handle 5x5 board move', async () => {
      const board = new Array(25).fill(0)
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(200)

      expect(response.body).toHaveProperty('movimiento')
      expect(typeof response.body.movimiento).toBe('number')
      expect(response.body.movimiento).toBeGreaterThanOrEqual(0)
      expect(response.body.movimiento).toBeLessThan(25)
    })

    test('should return 400 for invalid board size', async () => {
      const board = [0, 0, 0] // Invalid size
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400)

      expect(response.body).toHaveProperty('error')
    })

    test('should return 400 for missing board', async () => {
      const response = await request(app).post('/move').send({}).expect(400)

      expect(response.body).toHaveProperty('error')
    })

    test('should handle board with no empty movimientos', async () => {
      const board = [1, 2, 1, 2, 1, 2, 1, 2, 1]
      const response = await request(app)
        .post('/move')
        .send({ board })
        .expect(400)

      expect(response.body).toHaveProperty('error')
    })
  })

  describe('Error Handling', () => {
    test('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/move')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400)

      // Express returns empty body for malformed JSON, which is expected behavior
      expect(response.body).toEqual({})
    })

    test('should handle non-array board', async () => {
      const response = await request(app)
        .post('/move')
        .send({ board: 'not an array' })
        .expect(400)

      expect(response.body).toHaveProperty('error')
    })
  })

  describe('Performance', () => {
    test('should respond within reasonable time', async () => {
      const board = new Array(25).fill(0)
      const start = Date.now()

      await request(app).post('/move').send({ board }).expect(200)

      const duration = Date.now() - start
      expect(duration).toBeLessThan(1000) // Should respond within 1 second
    })
  })
})
