import express from 'express';
import { getClases } from '../controllers/clasesController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

// Listar clases
router.get('/', authenticateToken, getClases);

export default router;
