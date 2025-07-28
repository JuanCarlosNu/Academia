import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        "https://academia-production-53e3.up.railway.app/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      console.log("Usuario registrado:", data);
      if (response.ok) {
        console.log("Registro exitoso:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
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
