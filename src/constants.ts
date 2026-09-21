export interface FlowerVariant {
  petal: string;
  light: string;
  core: string;
  coreDark: string;
}

export const FLOWER_VARIANTS: readonly FlowerVariant[] = [
  { petal: '#ffc832', light: '#ffe98f', core: '#a86613', coreDark: '#6d3f09' },
  { petal: '#ffb020', light: '#ffd24d', core: '#8a4d08', coreDark: '#5d3305' },
  { petal: '#ffe066', light: '#fff2a9', core: '#a86613', coreDark: '#6d3f09' },
  { petal: '#f9a826', light: '#ffce4d', core: '#7a430a', coreDark: '#4f2b05' },
  { petal: '#ffd34d', light: '#ffe98a', core: '#8f5410', coreDark: '#5c3508' },
] as const;

export const PETAL_COLORS: readonly string[] = [
  '#ffc832',
  '#ffd34d',
  '#ffe066',
  '#f9a826',
  '#ffb020',
  '#ffe98f',
] as const;

export const HEART_COLORS: readonly string[] = [
  '#ffd34d',
  '#ff8ba7',
  '#ff5d73',
  '#fff8ea',
  '#ffb020',
] as const;