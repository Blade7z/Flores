export interface FlowerVariant {
  petal: string;
  light: string;
  deep: string;
  core: string;
  coreDark: string;
}

export const FLOWER_VARIANTS: readonly FlowerVariant[] = [
  { petal: '#ffc832', light: '#ffe98f', deep: '#f0a71e', core: '#a86613', coreDark: '#6d3f09' },
  { petal: '#ffb020', light: '#ffd24d', deep: '#e0790a', core: '#8a4d08', coreDark: '#5d3305' },
  { petal: '#ffe066', light: '#fff2a9', deep: '#f5b92b', core: '#a86613', coreDark: '#6d3f09' },
  { petal: '#f9a826', light: '#ffce4d', deep: '#d97d05', core: '#7a430a', coreDark: '#4f2b05' },
  { petal: '#ffd34d', light: '#ffe98a', deep: '#efa218', core: '#8f5410', coreDark: '#5c3508' },
] as const;

export const PETAL_COLORS: readonly string[] = [
  '#ffc832',
  '#ffd34d',
  '#ffe066',
  '#f9a826',
  '#ffb020',
  '#ffe98f',
] as const;