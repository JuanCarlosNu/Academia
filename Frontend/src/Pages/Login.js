import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // La variable para product fue incorporada como REACT_APP_BACKEND_URL
    // en Vercel (settings > Environment Variables).
    const API_URL =
      process.env.REACT_APP_BACKEND_URL_RENDER ||
      process.env.REACT_APP_BACKEND_URL_RAILWAY ||
      "http://localhost:3001";
    try {
      console.log(API_URL);
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        // Redirige al dashboard o página principal
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
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
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta?        {" "}
        <button onClick={() => navigate("/signup")}>Registrarse</button>     {" "}
      </p>
    </div>
  );
};

export default Login;
