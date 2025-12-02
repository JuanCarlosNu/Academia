/*export function getWeekRange(date) {
  const start = new Date(date); // date es la fecha de referencia, fecha actual
  const s = start;
  const s1 = start.getDate();
  const s2 = start.getDay();
  //console.log("comienzo", s, ": día del mes:", s1, "día de la semana:", s2);
  start.setDate(start.getDate() - start.getDay()); // domingo
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // sábado
  return { start, end };
}*/
export function getWeekRange(date) {
  const start = new Date(date);
  const day = start.getDay(1); // 0=domingo, 1=lunes, ..., 6=sábado

  // Calcular offset para retroceder hasta lunes
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // domingo

  return { start, end };
}

// Devuelve inicio y fin del mes de la fecha dada
export function getMonthRange(date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11

  const start = new Date(year, month, 1);
  // día 0 del mes siguiente = último día del mes actual
  const end = new Date(year, month + 1, 0);

  return { start, end };
}

export function getDaysInMonth(year, month) {
  // Último día del mes es "0" del siguiente
  return new Date(year, month + 1, 0).getDate();
}

export function formatShort(d) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("es-ES", options);
}

export function normalizeDateLocal(dateStr) {
  const [year, month, day] = dateStr.split("T")[0].split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}
