import express from "express";
import { createPago, deletePago, getPagosByAlumno, updatePago, getAllPagos, getPagos, getTotales } from "../controllers/pagoController";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

//Crear un nuevo pago

router.post('/', authenticateToken, authorizeRoles(['admin']), createPago);
// Nuevo: totales
router.get("/totales", getTotales);
// Nuevo: paginación y filtros
router.get("/", getPagos);
router.get("/", authenticateToken, authorizeRoles(["admin"]), getAllPagos);


router.get('/:idAlumno', authenticateToken, authorizeRoles(['admin']), getPagosByAlumno);
router.delete('/:idPago', authenticateToken, authorizeRoles(['admin']), deletePago);
router.put('/:idPago', authenticateToken, authorizeRoles(['admin']), updatePago);






export default router;