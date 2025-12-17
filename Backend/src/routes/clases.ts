import express from 'express';
import { editarClase, getClases, crearClase, getClasesPorSemana, eliminarClase} from '../controllers/clasesController';
import { authenticateToken } from '../middleware/authMiddleware';


const router = express.Router();

// Listar clases
router.get('/', authenticateToken, getClases);
router.post('/', crearClase);
router.get('/semana', getClasesPorSemana);
router.put('/:id', editarClase);
router.delete('/:id', eliminarClase);



export default router;
