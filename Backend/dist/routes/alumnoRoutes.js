"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profesorController_1 = require("./../controllers/profesorController");
const router = express_1.default.Router();
router.get('/', profesorController_1.getProfesores);
router.post('/', profesorController_1.createProfesor);
exports.default = router;
