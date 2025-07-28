"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClaseSchema = new mongoose_1.default.Schema({
    alumno: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Alumno',
        }],
    profesor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Profesor',
        required: true,
    },
    circuito: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Circuito',
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    duracionMinutos: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Clase', ClaseSchema);
