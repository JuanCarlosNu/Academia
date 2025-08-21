import { editarClase } from './../controllers/clasesController';
import express from 'express';
import { getClases, crearClase, getClasesPorSemana} from '../controllers/clasesController';
import { authenticateToken } from '../middleware/authMiddleware';


const router = express.Router();

// Listar clases
router.get('/', authenticateToken, getClases);
router.post('/', crearClase);
router.get('/semana', getClasesPorSemana);
router.put('/:id', editarClase);


export default router;
