// Unit Tests - Server (mocked, isolated)
// Consolidated from multiple coverage test files

import request from 'supertest'
import { app } from '../../../app/server.js'

describe('Unit Tests - Server', () => {
  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('status', 'OK')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('GET /move', () => {
    test('should handle 3x3 board with query parameter', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('movimiento')
      expect(typeof response.body.movimiento).toBe('number')
    })

    test('should handle 5x5 board with query parameter', async () => {
      const board = new Array(25).fill(0)
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('movimiento')
      expect(typeof response.body.movimiento).toBe('number')
    })

    test('should handle invalid JSON in query parameter', async () => {
      const response = await request(app)
        .get('/move')
        .query({ board: 'invalid-json' })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('Parámetro board inválido')
    })

    test('should handle missing board parameter', async () => {
      const response = await request(app)
        .get('/move')

      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
    })

    test('should handle invalid board size', async () => {
      const board = [0, 0, 0, 0] // 4x4 board
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('9 o 25 posiciones')
    })

    test('should handle board with no empty movimientos', async () => {
      const board = new Array(9).fill(1) // All movimientos filled
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('No hay movimientos disponibles')
    })

    test('should handle board with some moves already made', async () => {
      const board = [1, 0, 2, 0, 1, 0, 0, 0, 0]
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('movimiento')
    })

    test('should handle edge cases with malformed parameters', async () => {
      // Test with null board
      const response1 = await request(app)
        .get('/move')
        .query({ board: null })
      expect(response1.status).toBe(400)

      // Test with empty string board parameter
      const response2 = await request(app)
        .get('/move')
        .query({ board: '' })
      expect(response2.status).toBe(400)

      // Test with board parameter that is not a string
      const response3 = await request(app)
        .get('/move')
        .query({ board: 123 })
      expect(response3.status).toBe(400)
    })
  })

  describe('POST /move', () => {
    test('should handle valid 3x3 board', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      const response = await request(app)
        .post('/move')
        .send({ board })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('movimiento')
      expect(typeof response.body.movimiento).toBe('number')
    })

    test('should handle valid 5x5 board', async () => {
      const board = new Array(25).fill(0)
      const response = await request(app)
        .post('/move')
        .send({ board })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('movimiento')
      expect(typeof response.body.movimiento).toBe('number')
    })

    test('should handle board with invalid values', async () => {
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 3] // Invalid value 3
      const response = await request(app)
        .post('/move')
        .send({ board })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('invalid values')
    })

    test('should handle non-array board', async () => {
      const response = await request(app)
        .post('/move')
        .send({ board: 'not-an-array' })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('must be an array')
    })

    test('should handle missing board property', async () => {
      const response = await request(app)
        .post('/move')
        .send({})

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('Board parameter is required')
    })

    test('should handle board with no empty movimientos', async () => {
      const board = new Array(9).fill(1)
      const response = await request(app)
        .post('/move')
        .send({ board })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('No empty positions available')
    })

    test('should handle malformed JSON in POST request', async () => {
      const response = await request(app)
        .post('/move')
        .set('Content-Type', 'application/json')
        .send('invalid json')

      expect(response.status).toBe(400)
    })

    test('should handle unsupported content type', async () => {
      const response = await request(app)
        .post('/move')
        .set('Content-Type', 'text/plain')
        .send('some text')

      expect(response.status).toBe(400)
    })

    test('should handle very large board', async () => {
      const board = new Array(100).fill(0)
      const response = await request(app)
        .post('/move')
        .send({ board })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('9 or 25 positions')
    })

    test('should handle empty board array', async () => {
      const response = await request(app)
        .post('/move')
        .send({ board: [] })

      expect(response.status).toBe(400)
      expect(response.body.error).toContain('9 or 25 positions')
    })
  })

  describe('Error Handling', () => {
    test('should handle malformed JSON gracefully', async () => {
      const response = await request(app)
        .get('/move')
        .query({ board: '{"invalid": json}' })

      expect(response.status).toBe(400)
      expect(response.body.error).toBeDefined()
    })

    test('should respond within reasonable time', async () => {
      const start = Date.now()
      const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      const response = await request(app)
        .get('/move')
        .query({ board: JSON.stringify(board) })
      const duration = Date.now() - start

      expect(response.status).toBe(200)
      expect(duration).toBeLessThan(1000) // Should respond within 1 second
    })
  })
})
