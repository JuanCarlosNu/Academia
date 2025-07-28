"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClases = void 0;
const Clases_1 = __importDefault(require("../models/Clases"));
const getClases = async (req, res) => {
    try {
        const clases = await Clases_1.default.find()
            .populate('profesor')
            .populate('circuito')
            .populate('alumnos');
        res.status(200).json(clases);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las clases', error });
    }
};
exports.getClases = getClases;
