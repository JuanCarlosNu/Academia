import express  from "express";
import { getAlumnos, createAlumno, getAlumnoById, updateAlumno, deleteAlumno, updateClasesRestantes } from './../controllers/alumnoController';
 
const router = express.Router();

router.get('/', getAlumnos);
router.post('/', createAlumno);
router.get('/:id', getAlumnoById);
router.put('/:id', updateAlumno);
router.delete('/:id', deleteAlumno); 
router.patch('/:id', updateClasesRestantes);   

export default router;
