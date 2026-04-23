import { Platform } from 'react-native';

const makeShadow = (
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number,
) =>
  Platform.select({
    ios: {
      shadowColor:   '#000000',
      shadowOffset:  { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius:  radius,
    },
    android: { elevation },
    default: {},
  });

export const shadows = {
  level1: makeShadow(4,  8,  0.08, 2),
  level2: makeShadow(8,  24, 0.10, 6),
  level3: makeShadow(16, 32, 0.12, 12),
  level4: makeShadow(16, 48, 0.16, 20),
} as const;

export const primaryGlow = Platform.select({
  ios: {
    shadowColor:   '#158B7C',
    shadowOffset:  { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius:  24,
  },
  android: { elevation: 12 },
  default: {},
});
