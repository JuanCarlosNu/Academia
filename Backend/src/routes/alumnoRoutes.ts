import express  from "express";
import { getAlumnos,
     createAlumno, getAlumnoById, updateAlumno, deleteAlumno, updateClasesRestantes
     } from './../controllers/alumnoController';
//import {  getClasesRestantes } from "../controllers/alumnoController";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware";
import { getProximaClaseDeAlumno } from "../controllers/clasesController";
 
const router = express.Router();

router.get('/', authenticateToken, authorizeRoles(['admin', 'user', 'alumno']), getAlumnos);
router.post('/', authenticateToken, authorizeRoles(['admin']), createAlumno);
router.get('/:id', getAlumnoById);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), updateAlumno);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), deleteAlumno); 
router.patch('/:id', authenticateToken, authorizeRoles(['admin']), updateClasesRestantes);   
router.get("alumnos/:id/proxima-clase", getProximaClaseDeAlumno);
//router.get("/:id/clases-restantes", getClasesRestantes);
     

export default router;
