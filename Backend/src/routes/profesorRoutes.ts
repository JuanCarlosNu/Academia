import express from "express";
import { getProfesores, createProfesor, updateProfesor, deleteProfesor } from './../controllers/profesorController';

const router = express.Router();

router.get('/', getProfesores);
router.post('/', createProfesor);
router.put("/:id", updateProfesor);

router.delete("/:id", deleteProfesor);

export default router;
