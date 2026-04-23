// ============================================================
// ds.config.ts — Mirror of all configurable Design System values.
//
// This file does NOT drive the token files. The token files
// (colors.ts, spacing.ts, typography.ts, shadows.ts) are the
// source of truth and hold self-contained hardcoded values.
//
// This file exists so Claude (CoWork skill) has a single,
// structured place to read the current DS state and understand
// what every value means and how it relates to the system.
//
// SYNC RULE: every value here must match its counterpart in the
// token files at all times. See CLAUDE.md for the full map.
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
    primaryGlowColor: string
  }
  typography: {
    fontFamilies: { base: string; highlight: string; mono: string }
    fontSizes: {
      xxs: number; xs: number; sm: number; md: number; lg: number
      xl: number; xxl: number; xxxl: number; display: number; giant: number
    }
  }
  spacing: {
    nano: number; xxxs: number; xxs: number; xs: number; sm: number; md: number
    lg: number; xl: number; xxl: number; xxxl: number; huge: number; giant: number
  }
  radius: {
    xxs: number; xs: number; sm: number; md: number; lg: number; full: number
  }
  button: {
    paddingHorizontal: { lg: number; sm: number }
    height:            { lg: number; sm: number }
  }
  shadow: {
    glow: { color: string; opacity: number }
    levels: {
      level1: { offsetY: number; radius: number; opacity: number; elevation: number }
      level2: { offsetY: number; radius: number; opacity: number; elevation: number }
      level3: { offsetY: number; radius: number; opacity: number; elevation: number }
      level4: { offsetY: number; radius: number; opacity: number; elevation: number }
    }
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
    primaryGlowColor: '#158B7C',
  },

  typography: {
    fontFamilies: { base: 'DMSans', highlight: 'Newsreader', mono: 'FiraCode' },
    fontSizes: {
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
    },
  },

  spacing: {
    nano:  8,
    xxxs:  16,
    xxs:   24,
    xs:    32,
    sm:    40,
    md:    48,
    lg:    56,
    xl:    64,
    xxl:   80,
    xxxl:  120,
    huge:  160,
    giant: 200,
  },

  radius: {
    xxs:  2,
    xs:   4,
    sm:   8,
    md:   16,
    lg:   24,
    full: 999,
  },

  button: {
    paddingHorizontal: { lg: 24, sm: 16 },
    height:            { lg: 52, sm: 40 },
  },

  shadow: {
    glow: { color: '#158B7C', opacity: 0.35 },
    levels: {
      level1: { offsetY: 4,  radius: 8,  opacity: 0.08, elevation: 2  },
      level2: { offsetY: 8,  radius: 24, opacity: 0.10, elevation: 6  },
      level3: { offsetY: 16, radius: 32, opacity: 0.12, elevation: 12 },
      level4: { offsetY: 16, radius: 48, opacity: 0.16, elevation: 20 },
    },
  },
}
