// controllers/AuthController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Asegúrate de que la ruta sea correcta

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

class AuthController {
  
  static async signup(req: Request, res: Response) {
    const { username, password, role } = req.body;

    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        passwordHash,
        role: role || 'admin',
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET);

      res.status(201).json({ 
        token,
        usuario: { id_usuario: newUser._id, username: newUser.username, rol: newUser.role },
        });
    }
     catch (error) {
      console.error('Error en signup:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };

  static async login(req: Request, res: Response) {

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
      }
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
      }

      const token = jwt.sign(
        { id: user._id, 
          username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.json({
        token,
        usuario: { id_usuario: user._id, username: user.username, rol: user.role },
      });
    } 
        catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
};


export default AuthController;
