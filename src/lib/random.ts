export const rand = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const pick = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const randInt = (min: number, max: number): number =>
  Math.floor(rand(min, max + 1));