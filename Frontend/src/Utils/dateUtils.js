export function getWeekRange(date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay()); // domingo
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // sábado
  return { start, end };
}
export function formatShort(d) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("es-ES", options);
}
