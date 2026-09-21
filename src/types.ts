export interface GrownFlower {
  id: number;
  left: number;
  top: number;
  scale: number;
  variant: number;
  flipped: boolean;
}

export interface BurstItem {
  id: number;
  kind: 'hearts' | 'sparkle';
  bx: number;
  by: number;
  count: number;
  color?: string;
}

export interface FlowerSpec {
  id: number;
  left: number;
  bottom: number;
  size: number;
  variant: number;
  delay: number;
  dur: number;
  flipped: boolean;
}