# Design System — Claude Rules

## The Sync Contract

Every configurable value in this Design System lives in **three places** simultaneously:

| File | Role |
|---|---|
| `src/tokens/ds.config.ts` | **Mirror** — structured manifest Claude reads to understand the DS state |
| `src/tokens/colors.ts` | **Source of truth** — what the package actually exports and uses |
| `src/tokens/spacing.ts` | **Source of truth** |
| `src/tokens/typography.ts` | **Source of truth** |
| `src/tokens/shadows.ts` | **Source of truth** |
| `toolkit/tokens.css` | **Browser mirror** — CSS custom properties for the HTML toolkit preview |

**The token files are what the package ships. They are self-contained and import nothing from `ds.config.ts`.** The config and the CSS file are read/preview layers — they exist for Claude and for the browser toolkit, not for the runtime.

### The Rule

> Any time you change a value in a token file, you must update **both** `ds.config.ts` **and** `toolkit/tokens.css` to match. Every edit touches all three files. No exceptions.

---

## Value Map

This section maps every configurable value to its exact location in all three files.

### `toolkit/tokens.css` — CSS Variable Naming Convention

CSS variables mirror the token structure using kebab-case:
- `colors.primary.pure` → `--color-primary-pure`
- `colors.secondary.extraLight` → `--color-secondary-extra-light`
- `colors.highlight.medium` → `--color-highlight-medium`
- `fontFamilies.base` → `--font-base`
- `fontSizes.xxs` → `--font-size-xxs`
- `spacing.nano` → `--spacing-nano`
- `radius.sm` → `--radius-sm`
- `buttonSizes.lg.height` → `--button-height-lg`
- `shadows.level2` → `--shadow-level2` (collapsed to a single CSS box-shadow value)
- `primaryGlow` → `--shadow-glow`

### Colors → `src/tokens/colors.ts`

| Config path | Token file location |
|---|---|
| `dsConfig.color.primary.*` | `colors.primary.*` (5 variants: pure, extraLight, light, medium, dark) |
| `dsConfig.color.secondary.*` | `colors.secondary.*` (4 variants: extraLight, light, medium, dark) |
| `dsConfig.color.semantic.highlight.*` | `colors.highlight.*` (light, medium, dark) |
| `dsConfig.color.semantic.success.*` | `colors.success.*` (light, medium, dark) |
| `dsConfig.color.semantic.warning.*` | `colors.warning.*` (light, medium, dark) |
| `dsConfig.color.semantic.error.*` | `colors.error.*` (light, medium, dark) |
| `dsConfig.color.primaryGlowColor` | `shadows.ts` → `primaryGlow.shadowColor` |

**Not in config (static, not configurable):**
- `colors.neutral.*` — grey scale
- `colors.bg`, `colors.bgSubtle`, `colors.bgMuted` — surface colors
- `colors.fg1`–`colors.fg4`, `colors.fgOnPrimary` — foreground/text colors
- `colors.border`, `colors.borderSubtle`, `colors.borderStrong` — border colors
- `colors.focusRing`, `colors.link`, `colors.linkHover` — interaction colors
- `colors.nearBlack` — near-black
- `colors.categories.*` — pantry domain colors (8 categories × tint + ink)

### Typography → `src/tokens/typography.ts`

| Config path | Token file location |
|---|---|
| `dsConfig.typography.fontFamilies.base` | `fontFamilies.base` |
| `dsConfig.typography.fontFamilies.highlight` | `fontFamilies.highlight` |
| `dsConfig.typography.fontFamilies.mono` | `fontFamilies.mono` |
| `dsConfig.typography.fontSizes.xxs` | `fontSizes.xxs` |
| `dsConfig.typography.fontSizes.xs` | `fontSizes.xs` |
| `dsConfig.typography.fontSizes.sm` | `fontSizes.sm` |
| `dsConfig.typography.fontSizes.md` | `fontSizes.md` |
| `dsConfig.typography.fontSizes.lg` | `fontSizes.lg` |
| `dsConfig.typography.fontSizes.xl` | `fontSizes.xl` |
| `dsConfig.typography.fontSizes.xxl` | `fontSizes.xxl` |
| `dsConfig.typography.fontSizes.xxxl` | `fontSizes.xxxl` |
| `dsConfig.typography.fontSizes.display` | `fontSizes.display` |
| `dsConfig.typography.fontSizes.giant` | `fontSizes.giant` |

**Not in config (static):**
- `fontWeights` — regular/medium/bold (400/600/700)
- `lineHeights` — multiplier scale (1.0–2.0)
- `letterSpacings` — spacing scale (0.02–0.64)
- `textStyles` — composed text styles (display, h1–h5, body variants, labels, etc.)
- `topBarTitle` — uses off-scale hardcoded values (30/33/−0.3), intentionally not in config

### Spacing → `src/tokens/spacing.ts`

| Config path | Token file location |
|---|---|
| `dsConfig.spacing.nano` | `spacing.nano` |
| `dsConfig.spacing.xxxs` | `spacing.xxxs` |
| `dsConfig.spacing.xxs` | `spacing.xxs` |
| `dsConfig.spacing.xs` | `spacing.xs` |
| `dsConfig.spacing.sm` | `spacing.sm` |
| `dsConfig.spacing.md` | `spacing.md` |
| `dsConfig.spacing.lg` | `spacing.lg` |
| `dsConfig.spacing.xl` | `spacing.xl` |
| `dsConfig.spacing.xxl` | `spacing.xxl` |
| `dsConfig.spacing.xxxl` | `spacing.xxxl` |
| `dsConfig.spacing.huge` | `spacing.huge` |
| `dsConfig.spacing.giant` | `spacing.giant` |

### Radius → `src/tokens/spacing.ts`

| Config path | Token file location |
|---|---|
| `dsConfig.radius.xxs` | `radius.xxs` |
| `dsConfig.radius.xs` | `radius.xs` |
| `dsConfig.radius.sm` | `radius.sm` |
| `dsConfig.radius.md` | `radius.md` |
| `dsConfig.radius.lg` | `radius.lg` |
| `dsConfig.radius.full` | `radius.full` — always 999 (pill), do not change |

**Not in config (static):**
- `borderWidth` — hairline/thin/thick/heavy (1/2/4/8)

### Button Sizes → `src/tokens/spacing.ts`

| Config path | Token file location |
|---|---|
| `dsConfig.button.height.lg` | `buttonSizes.lg.height` |
| `dsConfig.button.height.sm` | `buttonSizes.sm.height` |
| `dsConfig.button.paddingHorizontal.lg` | `buttonSizes.lg.paddingHorizontal` |
| `dsConfig.button.paddingHorizontal.sm` | `buttonSizes.sm.paddingHorizontal` |

`Button.tsx` reads from `buttonSizes` — changing `buttonSizes` in `spacing.ts` is sufficient to update the component. No need to touch `Button.tsx`.

Minimum height is **44dp** for accessibility (WCAG touch target guideline).

### Shadows → `src/tokens/shadows.ts`

| Config path | Token file location |
|---|---|
| `dsConfig.shadow.glow.color` | `primaryGlow` → `shadowColor` |
| `dsConfig.shadow.glow.opacity` | `primaryGlow` → `shadowOpacity` |
| `dsConfig.shadow.levels.level1.*` | `shadows.level1` via `makeShadow(offsetY, radius, opacity, elevation)` |
| `dsConfig.shadow.levels.level2.*` | `shadows.level2` |
| `dsConfig.shadow.levels.level3.*` | `shadows.level3` |
| `dsConfig.shadow.levels.level4.*` | `shadows.level4` |

Shadow `level1` args: `makeShadow(offsetY, radius, opacity, elevation)`.

---

## What Is NOT Configurable

These values are intentionally static and should not be added to `ds.config.ts`:

- `colors.neutral.*` — the grey scale is brand-neutral by design
- `colors.bg*`, `colors.fg*`, `colors.border*` — UI surface/foreground system
- `colors.categories.*` — domain-specific pantry colors; edit `colors.ts` directly if needed
- `fontWeights` — typographic constants (400/600/700)
- `lineHeights`, `letterSpacings` — scale multipliers, not per-brand values
- `textStyles` — composed styles; they automatically reflect changes to `fontFamilies` and `fontSizes`
- `borderWidth` — structural constants
- `motion` tokens — duration, easing, opacity; not brand-configurable in v1

---

## Validation

After any token change, confirm TypeScript is clean:

```sh
cd design-system && npx tsc --noEmit
```

To preview all component changes live:

```sh
cd design-system && yarn storybook
# http://localhost:6007
```

Most signal-rich stories: **Colors**, **Button**, **Typography**, **Chip**, **Input**, **Toggle**.
