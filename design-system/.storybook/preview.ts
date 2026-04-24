import type { Preview } from '@storybook/react';

/**
 * react-native-web converts StyleSheet.create() to atomic CSS classes, not inline
 * style attributes.  That means `[style*="DMSans"]` selectors never match.
 *
 * The correct fix: declare @font-face rules whose `font-family` names match our
 * design-system token values ('DMSans', 'Newsreader', 'FiraCode') so the browser
 * resolves them when react-native-web emits `font-family: DMSans` in a CSS class.
 *
 * Strategy: fetch the Google Fonts CSS (which the browser returns as woff2 @font-face
 * blocks), replace the CSS family names with our token names, then inject the result.
 * Newsreader is already named 'Newsreader' in both Google Fonts and our tokens — no change needed.
 */
async function injectTokenFonts() {
  const GFONTS_URL =
    'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700' +
    '&family=Newsreader:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500' +
    '&family=Fira+Code:wght@400;500' +
    '&display=swap';

  try {
    const css = await fetch(GFONTS_URL).then((r) => r.text());

    // Remap CSS font-family names → our design-system token names
    const remapped = css
      .replace(/font-family:\s*['"]DM Sans['"]/g,  "font-family: 'DMSans'")
      .replace(/font-family:\s*['"]Fira Code['"]/g, "font-family: 'FiraCode'");
    // 'Newsreader' is already an exact match — no substitution needed

    const el = document.createElement('style');
    el.dataset.id = 'ds-token-fonts';
    el.textContent = remapped;
    document.head.appendChild(el);
  } catch (err) {
    console.warn('[DS Storybook] font injection failed — fonts may render with fallbacks', err);
  }
}

injectTokenFonts();

// ── Global canvas styles ──────────────────────────────────────────────────────
const globalStyle = document.createElement('style');
globalStyle.textContent = `
  /* Storybook chrome uses the loaded Google-Fonts names (with spaces) */
  #storybook-root, #storybook-docs {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;
document.head.appendChild(globalStyle);

// ── Preview config ────────────────────────────────────────────────────────────
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white',   value: '#FFFFFF' },
        { name: 'subtle',  value: '#F9F9F9' },
        { name: 'muted',   value: '#F0F0F0' },
        { name: 'dark',    value: '#071412' },
        { name: 'primary', value: '#158B7C' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
