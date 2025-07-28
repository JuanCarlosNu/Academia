"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const clases_1 = __importDefault(require("./routes/clases"));
const profesorRoutes_1 = __importDefault(require("./routes/profesorRoutes"));
const alumnoRoutes_1 = __importDefault(require("./routes/alumnoRoutes"));
const circuitoRoutes_1 = __importDefault(require("./routes/circuitoRoutes"));
dotenv_1.default.config();
// Inicializar la aplicación Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = 'https://academia-olive-beta.vercel.app/' || 'http://localhost:3000';
// URI de MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));
app.use((0, cors_1.default)());
app.use(express_1.default.json({
    origin: FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
// Rutas de autenticación
app.use('/api', authRoutes_1.default);
// Rutas de la API 
app.use('/api/clases', clases_1.default);
app.use('/api/profesores', profesorRoutes_1.default);
app.use('/api/alumnos', alumnoRoutes_1.default);
app.use('/api/circuitos', circuitoRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API de Academia funcionando');
});
// Ruta protegida solo para admin
app.get('/api/admin/dashboard', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['admin']), (req, res) => {
    res.json({ message: 'Bienvenido al dashboard de administrador.' });
});
// Ruta protegida solo para profesor
app.get('/api/profesor/clases', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['profesor']), (req, res) => {
    res.json({ message: 'Tus clases asignadas.' });
});
// Ruta protegida solo para alumno (para futuro)
app.get('/api/alumno/reservar', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRoles)(['alumno']), (req, res) => {
    res.json({ message: 'Reserva tu clase aquí.' });
});
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
