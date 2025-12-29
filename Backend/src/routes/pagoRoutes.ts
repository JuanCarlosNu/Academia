import express from "express";
import { createPago, deletePago, getPagosByAlumno, updatePago } from "../controllers/pagoController";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

//Crear un nuevo pago

router.post('/', authenticateToken, authorizeRoles(['admin']), createPago);
router.get('/:idAlumno', authenticateToken, authorizeRoles(['admin']), getPagosByAlumno);
router.delete('/:idPago', authenticateToken, authorizeRoles(['admin']), deletePago);
router.put('/:idPago', authenticateToken, authorizeRoles(['admin']), updatePago);

export default router;