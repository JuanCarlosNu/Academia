import express from 'express';
import authRoutes from './routes/authRoutes';
import { authenticateToken, authorizeRoles } from './middleware/authMiddleware';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

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