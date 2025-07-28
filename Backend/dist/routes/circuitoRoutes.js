"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const circuitoController_1 = require("../controllers/circuitoController");
const router = express_1.default.Router();
router.get('/', circuitoController_1.getCircuitos);
router.post('/', circuitoController_1.createCircuito);
exports.default = router;
