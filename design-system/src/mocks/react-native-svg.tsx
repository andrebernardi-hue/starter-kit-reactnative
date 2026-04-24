/**
 * Storybook-only mock for `react-native-svg`.
 *
 * Wraps native browser SVG elements so Icon (and any other component that
 * imports from react-native-svg) renders correctly in the web preview without
 * pulling in react-native-svg's source tree (which is full of CJS-only
 * PEG-generated files, TurboModuleRegistry, and other native-only modules).
 *
 * The alias `react-native-svg → this file` is set in .storybook/main.ts.
 * React maps camelCase SVG props (strokeWidth, strokeLinecap, …) to the
 * correct kebab-case DOM attributes automatically.
 */
import React from 'react';

// ─── Prop types ───────────────────────────────────────────────────────────────

type CommonProps = {
  children?: React.ReactNode;
  style?:    object;
};

type SvgProps = CommonProps &
  React.SVGProps<SVGSVGElement> & {
    width?:  number | string;
    height?: number | string;
  };

type PathProps    = React.SVGProps<SVGPathElement>;
type CircleProps  = React.SVGProps<SVGCircleElement>;
type RectProps    = React.SVGProps<SVGRectElement>;
type EllipseProps = React.SVGProps<SVGEllipseElement>;
type GProps       = CommonProps & React.SVGProps<SVGGElement>;
type LineProps    = React.SVGProps<SVGLineElement>;
type PolylineProps = React.SVGProps<SVGPolylineElement>;
type PolygonProps  = React.SVGProps<SVGPolygonElement>;
type TextProps     = CommonProps & React.SVGProps<SVGTextElement>;
type TSpanProps    = CommonProps & React.SVGProps<SVGTSpanElement>;
type DefsProps     = CommonProps & React.SVGProps<SVGDefsElement>;
type ClipPathProps = CommonProps & React.SVGProps<SVGClipPathElement>;
type MaskProps     = CommonProps & React.SVGProps<SVGMaskElement>;
type StopProps     = React.SVGProps<SVGStopElement>;
type LinearGradientProps = CommonProps & React.SVGProps<SVGLinearGradientElement>;
type RadialGradientProps = CommonProps & React.SVGProps<SVGRadialGradientElement>;

// ─── Components ───────────────────────────────────────────────────────────────

export const Svg = React.forwardRef<SVGSVGElement, SvgProps>(
  ({ children, style, ...props }, ref) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <svg {...props} style={style as any} ref={ref}>
      {children}
    </svg>
  ),
);
Svg.displayName = 'Svg';

export const Path     = (p: PathProps)     => <path    {...p} />;
export const Circle   = (p: CircleProps)   => <circle  {...p} />;
export const Rect     = (p: RectProps)     => <rect    {...p} />;
export const Ellipse  = (p: EllipseProps)  => <ellipse {...p} />;
export const G        = ({ children, ...p }: GProps) => <g {...p}>{children}</g>;
export const Line     = (p: LineProps)     => <line    {...p} />;
export const Polyline = (p: PolylineProps) => <polyline {...p} />;
export const Polygon  = (p: PolygonProps)  => <polygon {...p} />;
export const Text     = ({ children, ...p }: TextProps)   => <text   {...p}>{children}</text>;
export const TSpan    = ({ children, ...p }: TSpanProps)  => <tspan  {...p}>{children}</tspan>;
export const Defs     = ({ children, ...p }: DefsProps)   => <defs   {...p}>{children}</defs>;
export const ClipPath = ({ children, ...p }: ClipPathProps) => <clipPath {...p}>{children}</clipPath>;
export const Mask     = ({ children, ...p }: MaskProps)   => <mask   {...p}>{children}</mask>;
export const Stop     = (p: StopProps)     => <stop    {...p} />;
export const LinearGradient = ({ children, ...p }: LinearGradientProps) => (
  <linearGradient {...p}>{children}</linearGradient>
);
export const RadialGradient = ({ children, ...p }: RadialGradientProps) => (
  <radialGradient {...p}>{children}</radialGradient>
);

// Default export — matches `import Svg from 'react-native-svg'`
export default Svg;
