import express  from "express";
import { getAlumnos,
     createAlumno, getAlumnoById, updateAlumno, deleteAlumno, 
     updateClasesRestantes } from './../controllers/alumnoController';
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware";
 
const router = express.Router();

router.get('/', authenticateToken, authorizeRoles(['admin', 'user', 'alumno']), getAlumnos);
router.post('/', authenticateToken, authorizeRoles(['admin']), createAlumno);
router.get('/:id', getAlumnoById);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), updateAlumno);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteAlumno); 
router.patch('/:id', authenticateToken, authorizeRoles(['admin']), updateClasesRestantes);   
export default router;
