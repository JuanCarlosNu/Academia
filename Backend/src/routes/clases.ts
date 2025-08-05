import express from 'express';
import { getClases } from '../controllers/clasesController';
import { authenticateToken } from '../middleware/authMiddleware';
import { crearClase } from '../controllers/clasesController';
const router = express.Router();

// Listar clases
router.get('/', authenticateToken, getClases);
router.post('/', crearClase);

export default router;
