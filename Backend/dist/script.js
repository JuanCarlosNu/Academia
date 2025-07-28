"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const profesor_1 = __importDefault(require("./models/profesor")); // suponiendo que ya lo tenés definido
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(async () => {
    const nuevoProfesor = new profesor_1.default({
        nombre: 'Luli Love',
        email: 'test@atlas.com',
        especialidad: 'Pilates'
    });
    await nuevoProfesor.save();
    console.log('✅ Profesor guardado en Atlas');
    mongoose_1.default.connection.close();
})
    .catch(err => console.error('❌ Error:', err));
