/**
 * ESM shim for the `warn-once` package.
 * The real package ships CJS-only (`module.exports = fn`), which Vite cannot
 * serve as ESM.  This shim re-implements the same behaviour so Storybook works.
 */
const DEV = process.env.NODE_ENV !== 'production';
const seen = new Set<string>();

export default function warnOnce(condition: boolean, ...rest: unknown[]): void {
  if (DEV && condition) {
    const key = rest.join(' ');
    if (seen.has(key)) return;
    seen.add(key);
    console.warn(...rest);
  }
}
