export const HORARIOS_DEL_DIA = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

/*/contruir día completo con horarios libres y ocupados*/

export const construirDiaCompleto = (clasesAgendadas) => {
  return HORARIOS_DEL_DIA.map((hora) => {
    const clase = clasesAgendadas.find((c) => c.time === hora);
    return {
      time: hora,
      clase: clase || null,
    };
  });
};
