import { Platform } from 'react-native';
import { dsConfig } from './ds.config';

const mul = dsConfig.shadow.intensityMultiplier;

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
      shadowOpacity: opacity * mul,
      shadowRadius:  radius,
    },
    android: { elevation: Math.round(elevation * mul) },
    default: {},
  });

export const shadows = {
  level1: makeShadow(4,  8,  0.08, 2),
  level2: makeShadow(8,  24, 0.10, 6),
  level3: makeShadow(16, 32, 0.12, 12),
  level4: makeShadow(16, 48, 0.16, 20),
} as const;

const glowColor = dsConfig.color.primaryGlowColor ?? dsConfig.color.primary.pure;

export const primaryGlow = Platform.select({
  ios: {
    shadowColor:   glowColor,
    shadowOffset:  { width: 0, height: 10 },
    shadowOpacity: 0.35 * mul,
    shadowRadius:  24,
  },
  android: { elevation: Math.round(12 * mul) },
  default: {},
});
