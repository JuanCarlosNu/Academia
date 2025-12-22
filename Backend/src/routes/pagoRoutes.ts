import express from "express";
import { createPago } from "../controllers/pagoController";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

//Crear un nuevo pago

router.post('/', authenticateToken, authorizeRoles(['admin']), createPago);


export default router;