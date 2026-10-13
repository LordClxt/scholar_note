// Mentions du système de notation sur 20
export const mention = (note: number) => {
  if (note >= 16) return "Très bien";
  if (note >= 14) return "Bien";
  if (note >= 12) return "Assez bien";
  if (note >= 10) return "Passable";
  return "Insuffisant";
};

export const formatNote = (note: number) => String(Math.round(note * 100) / 100).replace(".", ",");
