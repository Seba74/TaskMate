export const colors = {
  primary: "#27a59b",
  background: "#fff",
  text: "#1E2029",
  textMuted: "#e3e3e3",
  icon: "#1E2029",
  maximumTrackTintColor: "rgba(255,255,255,0.4)",
  minimumTrackTintColor: "rgba(255,255,255,0.6)",
};

export enum ColorCategory {
  "Pendiente" = "#57A9C2",
  "En Proceso" = "#FFD569",
  "Rechazado" = "#F96B6B",
  "En Revisión" = "#6B79F9",
  "Finalizado" = "#6BF981",
}

const RandomColor: { [key: number]: string } = {
  1: "#B36A5E",
  2: "#247B7B",
  3: "#5E503F",
  4: "#3B1F2B",
  5: "#A28497",
  6: "#754668",
  7: "#A1BA89",
  8: "#515B3A",
  9: "#0D5C63",
  10: "#23395B",
};

export function getRandomColor(): string {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return RandomColor[randomNumber];
}
