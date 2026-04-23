# Skill: tune-design-tokens

Adapt the Design System to a new brand palette, typography, or spacing system by editing the single config file.

---

## The One File to Edit

**Always and only edit:**
`design-system/src/tokens/ds.config.ts`

**Never edit:**
- `tokens/colors.ts`
- `tokens/spacing.ts`
- `tokens/typography.ts`
- `tokens/shadows.ts`
- `tokens/motion.ts`
- Anything under `components/`

These token files are computed from `ds.config.ts`. Editing them directly would break the single-source-of-truth contract and your changes would be lost on the next config update.

**Exception — category colors:** If asked to change pantry category colors (freezer, fridge, produce, dry, canned, spices, oils, bakery), edit the `categories` block directly in `tokens/colors.ts`. These are domain-specific and intentionally not in the config.

---

## Config Schema Reference

### `color`
All values are hex strings (`#RRGGBB`).

**`color.primary`** — 5 variants: `pure`, `extraLight`, `light`, `medium`, `dark`
- `pure`: main brand color (buttons, links, focus rings)
- `dark`: hover states, high-contrast text on light backgrounds
- `light` / `medium` / `extraLight`: tint backgrounds and subtle fills

**`color.secondary`** — 4 variants: `extraLight`, `light`, `medium`, `dark`
Accent palette for chips, badges, secondary actions.

**`color.semantic.highlight / success / warning / error`** — 3 variants each: `light`, `medium`, `dark`
- `medium`: the display color shown in UI
- `light`: background tint behind the indicator
- `dark`: text color on light background

**`color.primaryGlowColor`** *(optional)* — defaults to `color.primary.pure`. Override only if the drop shadow glow should differ from the button color.

---

### `typography`

**`typography.fontFamilies.base / highlight / mono`** — font family name strings.
Must match fonts loaded in the host app's font setup (e.g. via `expo-font` or native font linking).

**`typography.baseFontSize`** — integer, body text size in dp/pt. Default: `16`.
All named font sizes are computed as `Math.round(baseFontSize * scale)`.

**`typography.fontSizeScale`** — multiplier per step.
Minimum recommended: `0.75` (produces 12dp at base 16 — absolute floor for legibility).
Do not make `xxs` less than `0.75` or text becomes unreadably small.

---

### `spacing`

**`spacing.baseUnit`** — grid unit in dp. Default: `8`.
All spacing steps = `baseUnit * spacingScale[key]`.
Keep results as multiples of 4 for pixel-grid alignment on most device densities.

**`spacing.spacingScale`** — multipliers per step (can be decimals).

---

### `radius`

**`radius.baseRadius`** — base corner radius in dp. Default: `4`.
All steps = `Math.round(baseRadius * radiusScale[key])`.

**`radius.radiusScale.full`** — always `999` (pill shape). Do not change this value; changing it would break pill buttons, chips, and toggles.

---

### `button`

**`button.paddingHorizontal.lg / sm`** — horizontal padding inside buttons in dp.

**`button.height.lg / sm`** — total touchable height in dp.
Minimum `44` for accessibility (WCAG touch target guideline). Never set below `44`.

---

### `shadow`

**`shadow.intensityMultiplier`** — float, range `0.0–2.0`.
Scales all `shadowOpacity` values (iOS) and `elevation` values (Android).
- `0.5` → subtler, flatter feel
- `1.0` → default
- `1.5` → more depth, heavier cards
Values above `2.0` will look unnatural on iOS (opacities exceed sensible range).

---

## What Claude Must Not Do

- Do not install color math or palette generation libraries.
- Do not change the `DSConfig` TypeScript interface (the `interface DSConfig { ... }` block at the top of `ds.config.ts`). The interface is the contract — adding or removing keys requires updating token files, which breaks the protected layer.
- Do not add runtime logic to token files. They must remain pure static derivations of the config.
- Do not touch `tokens/motion.ts` — motion tokens are not configurable in v1.

---

## Validation

After editing `ds.config.ts`, run TypeScript to catch structural errors:

```sh
cd design-system && npx tsc --noEmit
```

A missing key, wrong type, or misspelled property will surface immediately as a compile error.

---

## Preview

Run Storybook to see all changes live:

```sh
cd design-system && yarn storybook
# Opens at http://localhost:6007
```

Most signal-rich stories to watch after a config change:

| Story | What it exercises |
|---|---|
| **Colors** | Full palette swatches — confirm primary, secondary, semantic |
| **Button** | Primary color, radius, height, padding, shadow glow |
| **Typography** | All textStyles, font families, font sizes |
| **Chip** | Secondary color, `radius.full` (pill shape) |
| **Input** | Border color, focus ring color, `radius.sm`, font |
| **Toggle** | Primary color, `radius.full` |

Vite HMR will hot-reload all stories within ~2 seconds of saving `ds.config.ts`.
