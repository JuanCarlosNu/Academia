import express from 'express';
import authRoutes from './routes/authRoutes';
import { authenticateToken, authorizeRoles } from './middleware/authMiddleware';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3001;

// Reemplaza con tu URI de MongoDB (local o Atlas)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/academia';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(cors());
app.use(express.json());

// Rutas de autenticación

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('API de Academia funcionando');
});

// Ruta protegida solo para admin
app.get('/api/admin/dashboard', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  res.json({ message: 'Bienvenido al dashboard de administrador.' });
});

// Ruta protegida solo para profesor
app.get('/api/profesor/clases', authenticateToken, authorizeRoles(['profesor']), (req, res) => {
  res.json({ message: 'Tus clases asignadas.' });
});

// Ruta protegida solo para alumno (para futuro)
app.get('/api/alumno/reservar', authenticateToken, authorizeRoles(['alumno']), (req, res) => {
  res.json({ message: 'Reserva tu clase aquí.' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});