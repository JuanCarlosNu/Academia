import { User } from '../models/user';
import bcrypt from 'bcrypt';

// Contraseñas hasheadas para ejemplo

const adminPassword = bcrypt.hashSync('admin123', 10);
const profesorPassword = bcrypt.hashSync('profesor123', 10);

export const users: User[] = [
  { id: '1', username: 'admin', passwordHash: adminPassword, role: 'admin' },
  { id: '2', username: 'profesor', passwordHash: profesorPassword, role: 'profesor' }
];