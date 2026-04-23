export const fontFamilies = {
  base:      'DMSans',
  highlight: 'Newsreader',
  mono:      'FiraCode',
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium:  '600' as const,
  bold:    '700' as const,
};

export const fontSizes = {
  xxs:     14,
  xs:      16,
  sm:      20,
  md:      24,
  lg:      32,
  xl:      40,
  xxl:     48,
  xxxl:    64,
  display: 80,
  giant:   96,
} as const;

export const lineHeights = {
  default: 1.0,
  xs:      1.15,
  sm:      1.20,
  md:      1.33,
  lg:      1.50,
  xl:      1.70,
  xxl:     2.00,
} as const;

export const letterSpacings = {
  xs:   0.02,
  sm:   0.04,
  md:   0.08,
  lg:   0.16,
  xl:   0.32,
  xxl:  0.48,
  xxxl: 0.64,
} as const;

export const textStyles = {
  display: {
    fontFamily:    fontFamilies.highlight,
    fontWeight:    fontWeights.medium,
    fontSize:      fontSizes.display,
    lineHeight:    fontSizes.display * lineHeights.xs,
    letterSpacing: letterSpacings.sm,
  },
  h1: {
    fontFamily:    fontFamilies.highlight,
    fontWeight:    fontWeights.medium,
    fontSize:      fontSizes.xxxl,
    lineHeight:    fontSizes.xxxl * lineHeights.sm,
    letterSpacing: letterSpacings.xs,
  },
  h2: {
    fontFamily:    fontFamilies.highlight,
    fontWeight:    fontWeights.medium,
    fontSize:      fontSizes.xl,
    lineHeight:    fontSizes.xl * lineHeights.sm,
    letterSpacing: letterSpacings.sm,
  },
  h3: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.lg,
    lineHeight:    fontSizes.lg * lineHeights.md,
  },
  h4: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.md,
    lineHeight:    fontSizes.md * lineHeights.md,
  },
  h5: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.sm,
    lineHeight:    fontSizes.sm * lineHeights.md,
  },
  body: {
    fontFamily:  fontFamilies.base,
    fontWeight:  fontWeights.regular,
    fontSize:    fontSizes.xs,
    lineHeight:  fontSizes.xs * lineHeights.lg,
  },
  bodyLg: {
    fontFamily:  fontFamilies.base,
    fontWeight:  fontWeights.regular,
    fontSize:    fontSizes.sm,
    lineHeight:  fontSizes.sm * lineHeights.lg,
  },
  bodySm: {
    fontFamily:  fontFamilies.base,
    fontWeight:  fontWeights.regular,
    fontSize:    fontSizes.xxs,
    lineHeight:  fontSizes.xxs * lineHeights.md,
  },
  caption: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.xxs,
    lineHeight:    fontSizes.xxs * lineHeights.md,
    letterSpacing: letterSpacings.sm,
    textTransform: 'uppercase' as const,
  },
  labelLg: {
    fontFamily:  fontFamilies.base,
    fontWeight:  fontWeights.bold,
    fontSize:    fontSizes.xs,
    lineHeight:  fontSizes.xs * lineHeights.lg,
  },
  labelSm: {
    fontFamily:  fontFamilies.base,
    fontWeight:  fontWeights.bold,
    fontSize:    fontSizes.xxs,
    lineHeight:  fontSizes.xxs * lineHeights.lg,
  },
  eyebrow: {
    fontFamily:    fontFamilies.highlight,
    fontWeight:    fontWeights.medium,
    fontSize:      fontSizes.sm,
    letterSpacing: letterSpacings.sm,
  },
  topBarTitle: {
    fontFamily:    fontFamilies.highlight,
    fontWeight:    fontWeights.medium,
    fontSize:      30,
    lineHeight:    33,
    letterSpacing: -0.3,
  },
} as const;
