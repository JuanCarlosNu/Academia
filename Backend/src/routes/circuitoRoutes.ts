import express from "express";
import { getCircuitos, createCircuito } from '../controllers/circuitoController';

const router = express.Router();

router.get('/', getCircuitos);
router.post('/', createCircuito);

export default router;