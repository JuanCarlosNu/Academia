"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCircuito = exports.getCircuitos = void 0;
const circuito_1 = __importDefault(require("../models/circuito"));
const getCircuitos = async (req, res) => {
    try {
        const circuitos = await circuito_1.default.find();
        res.status(200).json(circuitos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los circuitos", error });
    }
};
exports.getCircuitos = getCircuitos;
const createCircuito = async (req, res) => {
    try {
        const { nombre, ubicacion } = req.body;
        const nuevoCircuito = new circuito_1.default({ nombre, ubicacion });
        await nuevoCircuito.save();
        res.status(201).json(nuevoCircuito);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el circuito", error });
    }
};
exports.createCircuito = createCircuito;
