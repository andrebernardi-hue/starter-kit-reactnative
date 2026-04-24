// ============================================================
// ds.config.ts — Single source of truth for every tunable value
// in the Design System.
//
// The other token files (colors.ts, spacing.ts, typography.ts,
// shadows.ts) import `dsConfig` and derive their outputs from it.
// Changing a value here is the ONLY way to retune the DS without
// breaking the token API or touching any components.
//
// Scale-based axes (spacing, radius, typography) are expressed as
// a base unit × a named scale, so a single base change rescales
// the whole system proportionally. Colors are explicit hex values
// — no palette generation — because explicit failures are safer
// than generated ones when Claude edits this file unattended.
//
// Default values below reproduce the previous hardcoded token
// outputs exactly; an unmodified config must yield zero visual
// diff from the pre-config era.
// ============================================================

export interface DSConfig {
  color: {
    primary:   { pure: string; extraLight: string; light: string; medium: string; dark: string }
    secondary: { extraLight: string; light: string; medium: string; dark: string }
    semantic: {
      highlight: { light: string; medium: string; dark: string }
      success:   { light: string; medium: string; dark: string }
      warning:   { light: string; medium: string; dark: string }
      error:     { light: string; medium: string; dark: string }
    }
    /** Override the drop-shadow glow color; defaults to `primary.pure`. */
    primaryGlowColor?: string
  }
  typography: {
    fontFamilies: { base: string; highlight: string; mono: string }
    /** Body text size in dp. All named sizes are `round(baseFontSize * scale)`. */
    baseFontSize: number
    fontSizeScale: {
      xxs: number; xs: number; sm: number; md: number; lg: number
      xl: number; xxl: number; xxxl: number; display: number; giant: number
    }
  }
  spacing: {
    /** Grid unit in dp. All steps = `baseUnit * scale[key]`. */
    baseUnit: number
    spacingScale: {
      nano: number; xxxs: number; xxs: number; xs: number; sm: number; md: number
      lg: number; xl: number; xxl: number; xxxl: number; huge: number; giant: number
    }
  }
  radius: {
    /** Base corner radius in dp. All steps = `round(baseRadius * scale[key])`. */
    baseRadius: number
    /** NOTE: `full` is always 999 (pill); do not change it. */
    radiusScale: { xxs: number; xs: number; sm: number; md: number; lg: number; full: number }
  }
  button: {
    paddingHorizontal: { lg: number; sm: number }
    /** Minimum 44 for WCAG touch target compliance. */
    height:            { lg: number; sm: number }
  }
  shadow: {
    /** 0.0–2.0. Scales all `shadowOpacity` (iOS) and `elevation` (Android). */
    intensityMultiplier: number
  }
}

export const dsConfig: DSConfig = {
  color: {
    primary: {
      pure:       '#158B7C',
      extraLight: '#19B39F',
      light:      '#E6EFEE',
      medium:     '#B1E8E1',
      dark:       '#0D423D',
    },
    secondary: {
      extraLight: '#D7EFEB',
      light:      '#8CD7CD',
      medium:     '#5ABBAE',
      dark:       '#1F6E62',
    },
    semantic: {
      highlight: { light: '#BAE0FE', medium: '#007ADD', dark: '#004AAC' },
      success:   { light: '#D9BBFB', medium: '#6AAD59', dark: '#00512D' },
      warning:   { light: '#FFC083', medium: '#FF9534', dark: '#8B4A00' },
      error:     { light: '#EF96A0', medium: '#CA4A5A', dark: '#8B2A36' },
    },
  },

  typography: {
    fontFamilies: { base: 'DMSans', highlight: 'Newsreader', mono: 'FiraCode' },
    baseFontSize: 16,
    fontSizeScale: {
      xxs:     0.875,
      xs:      1.0,
      sm:      1.25,
      md:      1.5,
      lg:      2.0,
      xl:      2.5,
      xxl:     3.0,
      xxxl:    4.0,
      display: 5.0,
      giant:   6.0,
    },
  },

  spacing: {
    baseUnit: 8,
    spacingScale: {
      nano:  1,
      xxxs:  2,
      xxs:   3,
      xs:    4,
      sm:    5,
      md:    6,
      lg:    7,
      xl:    8,
      xxl:   10,
      xxxl:  15,
      huge:  20,
      giant: 25,
    },
  },

  radius: {
    baseRadius: 4,
    radiusScale: {
      xxs:  0.5,
      xs:   1.0,
      sm:   2.0,
      md:   4.0,
      lg:   6.0,
      full: 999,
    },
  },

  button: {
    paddingHorizontal: { lg: 24, sm: 16 },
    height:            { lg: 52, sm: 40 },
  },

  shadow: {
    intensityMultiplier: 1.0,
  },
}
