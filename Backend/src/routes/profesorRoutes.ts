import express from "express";
import { getProfesores, createProfesor } from './../controllers/profesorController';

const router = express.Router();

router.get('/', getProfesores);
router.post('/', createProfesor);

export default router;
