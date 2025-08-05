import { getAlumnos, createAlumno } from './../controllers/alumnoController';
import express  from "express";
 
const router = express.Router();

router.get('/', getAlumnos);
router.post('/', createAlumno);


export default router;
