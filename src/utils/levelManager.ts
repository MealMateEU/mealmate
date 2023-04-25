export const lose_fat = (
  level: number,
  yesterdaysWeight: number,
  todaysWeight: number
) => {
  if (todaysWeight < yesterdaysWeight) {
    return level + 1;
  }
  return level;
};

export const gain_muscle = (
  level: number,
  yesterdaysWeight: number,
  todaysWeight: number
) => {
  if (todaysWeight > yesterdaysWeight) {
    return level + 1;
  }
  return level;
};

export const maintain_weight = (
  level: number,
  yesterdaysWeight: number,
  todaysWeight: number
) => {
  if (todaysWeight > yesterdaysWeight) {
    return level === 1;
  }
  return level;
};
