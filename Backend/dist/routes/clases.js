"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clasesController_1 = require("../controllers/clasesController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Listar clases
router.get('/', authMiddleware_1.authenticateToken, clasesController_1.getClases);
exports.default = router;
