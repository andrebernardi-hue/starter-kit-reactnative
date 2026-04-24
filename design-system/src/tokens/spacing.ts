import { dsConfig } from './ds.config';

const { baseUnit, spacingScale } = dsConfig.spacing;
const { baseRadius, radiusScale } = dsConfig.radius;

export const spacing = {
  nano:  baseUnit * spacingScale.nano,
  xxxs:  baseUnit * spacingScale.xxxs,
  xxs:   baseUnit * spacingScale.xxs,
  xs:    baseUnit * spacingScale.xs,
  sm:    baseUnit * spacingScale.sm,
  md:    baseUnit * spacingScale.md,
  lg:    baseUnit * spacingScale.lg,
  xl:    baseUnit * spacingScale.xl,
  xxl:   baseUnit * spacingScale.xxl,
  xxxl:  baseUnit * spacingScale.xxxl,
  huge:  baseUnit * spacingScale.huge,
  giant: baseUnit * spacingScale.giant,
} as const;

export const radius = {
  xxs:  Math.round(baseRadius * radiusScale.xxs),
  xs:   Math.round(baseRadius * radiusScale.xs),
  sm:   Math.round(baseRadius * radiusScale.sm),
  md:   Math.round(baseRadius * radiusScale.md),
  lg:   Math.round(baseRadius * radiusScale.lg),
  // `full` is always used verbatim — it must stay 999 for pill shapes.
  full: radiusScale.full,
} as const;

export const borderWidth = {
  hairline: 1,
  thin:     2,
  thick:    4,
  heavy:    8,
} as const;

export const buttonSizes = {
  lg: {
    height:            dsConfig.button.height.lg,
    paddingHorizontal: dsConfig.button.paddingHorizontal.lg,
  },
  sm: {
    height:            dsConfig.button.height.sm,
    paddingHorizontal: dsConfig.button.paddingHorizontal.sm,
  },
} as const;
