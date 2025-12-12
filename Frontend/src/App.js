import React from "react";
import NavBar from "./Components/Navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./Pages/Dashboard";
import Clases from "./Pages/Clases";
import Alumnos from "./Pages/Alumnos";
import Profesores from "./Pages/Profesores";
import Pagos from "./Pages/Pagos";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/alumos"
          element={
            <PrivateRoute roles={["admin", "user", "alumno"]}>
              <AlumnosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/DashBoard"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />

        <Route
          path="/clases"
          element={
            <PrivateRoute>
              <Clases />
            </PrivateRoute>
          }
        />
        <Route
          path="/alumnos"
          element={
            <PrivateRoute>
              <Alumnos />
            </PrivateRoute>
          }
        />
        <Route
          path="/profesores"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Profesores />
            </PrivateRoute>
          }
        />
        <Route
          path="/pagos"
          element={
            <PrivateRoute>
              <Pagos />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
