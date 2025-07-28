"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfesor = exports.getProfesores = void 0;
const profesor_1 = __importDefault(require("../models/profesor"));
const getProfesores = async (req, res) => {
    try {
        const profesores = await profesor_1.default.find();
        res.status(200).json(profesores);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los profesores", error });
    }
};
exports.getProfesores = getProfesores;
const createProfesor = async (req, res) => {
    try {
        const { nombre, email, teléfono } = req.body;
        const nuevoProfesor = new profesor_1.default({ nombre, email, teléfono });
        await nuevoProfesor.save();
        res.status(201).json(nuevoProfesor);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el profesor", error });
    }
};
exports.createProfesor = createProfesor;
