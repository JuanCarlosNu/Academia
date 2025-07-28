import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profesor from './models/profesor'; // suponiendo que ya lo tenés definido

dotenv.config();
mongoose.connect(process.env.MONGO_URI!)
  .then(async () => {
    const nuevoProfesor = new Profesor({
      nombre: 'Luli Love',
      email: 'test@atlas.com',
      especialidad: 'Pilates'
    });
    await nuevoProfesor.save();
    console.log('✅ Profesor guardado en Atlas');
    mongoose.connection.close();
  })
  .catch(err => console.error('❌ Error:', err));
