// hooks/useHorarios.js
// src/hooks/useHorarios.js
import { useMemo } from "react";

export function useHorarios(classesOfDay, activeRange, HORARIOS_DEL_DIA) {
  return useMemo(() => {
    const horariosOcupados = classesOfDay
      .filter((bloque) => bloque.clase !== null)
      .map((bloque) => bloque.time);

    const horariosDisponibles =
      activeRange === "día"
        ? HORARIOS_DEL_DIA.filter((hora) => !horariosOcupados.includes(hora))
        : HORARIOS_DEL_DIA;

    const cantidadOcupadas = horariosOcupados.length;
    const cantidadDisponibles = horariosDisponibles.length;

    return {
      horariosOcupados,
      horariosDisponibles,
      cantidadOcupadas,
      cantidadDisponibles,
    };
  }, [classesOfDay, activeRange, HORARIOS_DEL_DIA]);
}
