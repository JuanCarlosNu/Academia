export function getWeekRange(date) {
  const start = new Date(date); // date es la fecha de referencia, fecha actual
  const s = start;
  const s1 = start.getDate();
  const s2 = start.getDay();
  console.log("comienzo", s, ": día del mes:", s1, "día de la semana:", s2);
  start.setDate(start.getDate() - start.getDay()); // domingo
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // sábado
  return { start, end };
}

export function formatShort(d) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("es-ES", options);
}
