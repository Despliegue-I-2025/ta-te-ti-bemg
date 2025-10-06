import express from 'express';
import dotenv from 'dotenv';
import algoritmoTres from './algoritmo.tres.di.js';
import algoritmoCinco from './algoritmo.cinco.di.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
export { app };

// Configuración desde variables de entorno con valores por defecto
const PORT = process.env.PORT || 3009;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_VERSION = process.env.API_VERSION || 'v1';

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString()
    });
});

// POST /move endpoint for integration tests
app.post('/move', (req, res) => {
    const { board } = req.body;
    
    if (!board) {
        return res.status(400).json({ error: 'Board parameter is required' });
    }
    
    if (!Array.isArray(board)) {
        return res.status(400).json({ error: 'Board must be an array' });
    }
    
    if (board.length !== 9 && board.length !== 25) {
        return res.status(400).json({ error: 'Board must be 9 or 25 positions' });
    }
    
    // Validate board values
    const validValues = [0, 1, 2];
    for (let i = 0; i < board.length; i++) {
        if (!validValues.includes(board[i])) {
            return res.status(400).json({ error: 'Board contains invalid values' });
        }
    }
    
    // Find empty positions
    const emptyPositions = board
        .map((v, i) => v === 0 ? i : null)
        .filter(i => i !== null);
    
    if (emptyPositions.length === 0) {
        return res.status(400).json({ error: 'No empty positions available' });
    }

    let move;
    if (board.length === 9) {
        move = algoritmoTres(board, emptyPositions);
    } else if (board.length === 25) {
        move = algoritmoCinco(board, emptyPositions);
    }
    
    res.json({ movimiento: move });
});

// GET Tres /move?board=[0,1,0,2,0,0,0,0,0]
// GET Cinco /move?board=[0,1,0,2,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,1,0,2,0,0,0]

app.get('/move', (req, res) => {
    let boardParam = req.query.board;
    let board; 
    try {
        board = JSON.parse(boardParam);
    } catch (e) {
        return res.status(400).json({ error: 'Parámetro board inválido. Debe ser un array JSON.' });
    }
    if (!Array.isArray(board) || (board.length !== 9 && board.length !== 25)) {
        return res.status(400).json({ error: 'El tablero debe ser un array de 9 o 25 posiciones.' });
    }
    // Buscar posiciones vacías (asumiendo que 0 es vacío)
    const emptyPositions = board
        .map((v, i) => v === 0 ? i : null)
        .filter(i => i !== null);
    
    if (emptyPositions.length === 0) {
        return res.status(400).json({ error: 'No hay movimientos disponibles.' });
    }

    if (board.length === 9) {
      const move = algoritmoTres(board, emptyPositions);
      res.json({ movimiento: move });
    } else if (board.length === 25) {
      const move = algoritmoCinco(board, emptyPositions);
      res.json({ movimiento: move });
    } else {
      return res.status(400).json({ error: 'El tablero debe ser un array de 9 o 25 posiciones.' });
    }
});

// Solo iniciar el servidor si no estamos en modo de prueba
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor de tateti escuchando en el puerto ${PORT}`);
    });
}

export default app;
