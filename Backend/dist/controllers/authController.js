"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });

const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Asegúrate de que la ruta sea correcta
const JWT_SECRET = process.env.JWT_SECRET || "secret";

class AuthController {
  static async signup(req, res) {
    const { username, password, role } = req.body;
    try {
      const existingUser = await user_1.default.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }
      const passwordHash = await bcrypt_1.default.hash(password, 10);
      const newUser = new user_1.default({
        username,
        passwordHash,
        role: role || "admin", // default to 'admin' if no role provided- be careful!!
      });
      await newUser.save();
      const token = jsonwebtoken_1.default.sign(
        { id: newUser._id, role: newUser.role },
        JWT_SECRET
      );
      res.status(201).json({
        token,
        usuario: {
          id_usuario: newUser._id,
          username: newUser.username,
          rol: newUser.role,
        },
      });
    } catch (error) {
      console.error("Error en signup:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await user_1.default.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos." });
      }
      const valid = await bcrypt_1.default.compare(password, user.passwordHash);
      if (!valid) {
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos." });
      }
      const token = jsonwebtoken_1.default.sign(
        { id: user._id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      return res.json({
        token,
        usuario: {
          id_usuario: user._id,
          username: user.username,
          rol: user.role,
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  }
}
exports.default = AuthController;
