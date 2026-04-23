export const duration = {
  micro: 120,
  fast:  180,
  base:  240,
} as const;

export const easing = {
  standard: [0.2, 0, 0, 1] as [number, number, number, number],
} as const;

export const opacity = {
  intense: 0.64,
  medium:  0.32,
  light:   0.16,
  semi:    0.08,
} as const;
