import React from "react";
import NavBar from "./Components/Navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./Pages/Dashboard";
import Clases from "./Pages/Clases";
import Alumnos from "./Pages/Alumnos";
import Profesores from "./Pages/Profesores";
import Pagos from "./Pages/Pagos";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/profesores" element={<Profesores />} />
        <Route path="/pagos" element={<Pagos />} />
      </Routes>
    </Router>
  );
}

export default App;
