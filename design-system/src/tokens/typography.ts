import { dsConfig } from './ds.config';

const { baseFontSize, fontSizeScale } = dsConfig.typography;
const sz = (scale: number) => Math.round(baseFontSize * scale);

// ─── Font Families ───────────────────────────────────────────────────────────
// Semantic slots: choose by purpose, not appearance.
export const fontFamilies = {
  /** UI sans-serif — all headings, buttons, labels, body copy */
  base:      dsConfig.typography.fontFamilies.base,
  /** Editorial serif — long-form article body & display hero moments */
  editorial: dsConfig.typography.fontFamilies.highlight,
  /** Monospace — code snippets & technical content */
  mono:      dsConfig.typography.fontFamilies.mono,
  /** @deprecated use `editorial` */
  highlight: dsConfig.typography.fontFamilies.highlight,
} as const;

// ─── Weights ──────────────────────────────────────────────────────────────────
export const fontWeights = {
  regular: '400' as const,
  medium:  '600' as const,
  bold:    '700' as const,
};

// ─── Size Scale ───────────────────────────────────────────────────────────────
// Named sizes derive from `baseFontSize * fontSizeScale[key]`.
// `micro` is intentionally off-scale — chrome/hint text only.
export const fontSizes = {
  micro:   11,                     // badge counts, timestamps, status indicators
  xxs:     sz(fontSizeScale.xxs),  // small labels, captions
  xs:      sz(fontSizeScale.xs),   // body copy, form inputs
  sm:      sz(fontSizeScale.sm),   // large body, h5
  md:      sz(fontSizeScale.md),   // h4
  lg:      sz(fontSizeScale.lg),   // h3
  xl:      sz(fontSizeScale.xl),   // h2
  xxl:     sz(fontSizeScale.xxl),
  xxxl:    sz(fontSizeScale.xxxl), // h1
  display: sz(fontSizeScale.display), // hero display
  giant:   sz(fontSizeScale.giant),
} as const;

// ─── Line Height Multipliers ──────────────────────────────────────────────────
export const lineHeights = {
  default: 1.0,
  xs:      1.15,
  sm:      1.20,
  md:      1.33,
  lg:      1.50,
  xl:      1.70,
  xxl:     2.00,
} as const;

// ─── Letter Spacing ───────────────────────────────────────────────────────────
export const letterSpacings = {
  xs:   0.02,
  sm:   0.04,
  md:   0.08,
  lg:   0.16,
  xl:   0.32,
  xxl:  0.48,
  xxxl: 0.64,
} as const;

// ─── Text Style Slots ─────────────────────────────────────────────────────────
// These are the only font definitions components should reference directly.
// Never hardcode fontFamily, fontWeight, or fontSize in a component StyleSheet.
export const textStyles = {

  // ── Display / Editorial ─────────────────────────────────────────────────────
  /** Hero moments: Newsreader for maximum editorial drama */
  display: {
    fontFamily:    fontFamilies.editorial,
    fontWeight:    fontWeights.medium,
    fontSize:      fontSizes.display,
    lineHeight:    fontSizes.display * lineHeights.xs,
    letterSpacing: letterSpacings.sm,
  },

  // ── Headings — DM Sans ───────────────────────────────────────────────────────
  /** Screen-level titles */
  h1: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.xxxl,
    lineHeight:    fontSizes.xxxl * lineHeights.sm,
    letterSpacing: letterSpacings.xs,
  },
  /** Section headings */
  h2: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.xl,
    lineHeight:    fontSizes.xl * lineHeights.sm,
    letterSpacing: letterSpacings.xs,
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

  // ── Body ─────────────────────────────────────────────────────────────────────
  /** Standard UI body — forms, descriptions, list items */
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
  /**
   * Long-form editorial reading — Newsreader at a comfortable reading size.
   * Use for article bodies, recipe steps, and any sustained prose passage.
   */
  article: {
    fontFamily:  fontFamilies.editorial,
    fontWeight:  fontWeights.regular,
    fontSize:    17,
    lineHeight:  17 * lineHeights.xl,   // ≈ 29 — generous for reading
  },

  // ── Labels ───────────────────────────────────────────────────────────────────
  /** Interactive labels — buttons, tabs, badges */
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
  /**
   * Tiny UI chrome — badge counts, status ticks, timestamps, hint text.
   * Below the reading scale; use sparingly and never for primary content.
   */
  micro: {
    fontFamily:  fontFamilies.base,
    fontWeight:  fontWeights.regular,
    fontSize:    fontSizes.micro,
    lineHeight:  fontSizes.micro * lineHeights.md,
  },

  // ── Utility ──────────────────────────────────────────────────────────────────
  /** Overline / section marker — all-caps DM Sans with wide tracking */
  eyebrow: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.xxs,
    letterSpacing: letterSpacings.xl,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.xxs,
    lineHeight:    fontSizes.xxs * lineHeights.md,
    letterSpacing: letterSpacings.sm,
    textTransform: 'uppercase' as const,
  },

  // ── Navigation ───────────────────────────────────────────────────────────────
  /** Top navigation bar large title (off-scale, tuned for iOS top bar) */
  topBarTitle: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      30,
    lineHeight:    33,
    letterSpacing: -0.3,
  },

} as const;
