import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const API_URL =
      process.env.REACT_APP_BACKEND_URL_RENDER ||
      process.env.REACT_APP_BACKEND_URL_RAILWAY ||
      "http://localhost:3001";

    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.usuario, data.token); // ✅ usar AuthContext
        navigate("/dashboard");
      } else {
        setError(data.error || "Error al registrarse");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="signup-page">
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tenés cuenta?
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      </p>
    </div>
  );
};
export default Signup;
