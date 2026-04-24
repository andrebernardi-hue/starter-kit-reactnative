import { dsConfig } from './ds.config';

const { primary, secondary, semantic } = dsConfig.color;

export const colors = {
  // ── Config-driven palettes ──────────────────────────────────────────────────
  primary,
  secondary,
  highlight: semantic.highlight,
  success:   semantic.success,
  warning:   semantic.warning,
  error:     semantic.error,

  // ── Static neutral palette (not in config; v1 decision) ─────────────────────
  neutral: {
    lowDark:        '#292929',
    lowMedium:      '#666666',
    lowLight:       '#858585',
    lowExtraLight:  '#A3A3A3',
    highMedium:     '#E0E0E0',
    highLight:      '#F0F0F0',
    highExtraLight: '#F9F9F9',
    highPure:       '#FFFFFF',
  },
  nearBlack:    '#071412',

  // ── Static UI aliases ───────────────────────────────────────────────────────
  bg:           '#FFFFFF',
  bgSubtle:     '#F9F9F9',
  bgMuted:      '#F0F0F0',
  fg1:          '#071412',
  fg2:          '#292929',
  fg3:          '#666666',
  fg4:          '#858585',
  fgOnPrimary:  '#FFFFFF',
  border:       '#E0E0E0',
  borderSubtle: '#F0F0F0',
  borderStrong: '#A3A3A3',

  // ── Interactive tokens derived from primary ─────────────────────────────────
  focusRing:    primary.extraLight,
  link:         primary.pure,
  linkHover:    primary.dark,

  // ── Domain-specific category palette (static, edit directly) ────────────────
  categories: {
    freezer: { tint: '#E6F0F8', ink: '#1E6BB8' },
    fridge:  { tint: '#E8F5F3', ink: '#158B7C' },
    produce: { tint: '#E8F5E3', ink: '#3C7C33' },
    dry:     { tint: '#F5F0E3', ink: '#8A6A2E' },
    canned:  { tint: '#F5EBE3', ink: '#A9531A' },
    spices:  { tint: '#F5E3E8', ink: '#8B2A36' },
    oils:    { tint: '#F5F3E3', ink: '#6B5A1E' },
    bakery:  { tint: '#F3E3F5', ink: '#6A2E8B' },
  },
} as const;

export type ColorToken = typeof colors;
