import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse, G } from 'react-native-svg';
import { colors } from '../../tokens';

export type IconName =
  | 'shelf' | 'clock' | 'plus' | 'minus' | 'x' | 'check'
  | 'chevron-right' | 'chevron-left' | 'chevron-down'
  | 'arrow-left' | 'arrow-right' | 'search' | 'settings'
  | 'pencil' | 'trash' | 'star' | 'star-filled'
  | 'heart' | 'heart-filled' | 'alert' | 'info' | 'clock-small'
  | 'flame' | 'chef' | 'filter' | 'user' | 'logout' | 'shopping'
  | 'cat-freezer' | 'cat-fridge' | 'cat-produce' | 'cat-dry'
  | 'cat-canned' | 'cat-spices' | 'cat-oils' | 'cat-bakery'
  | 'spoon' | 'sparkle' | 'spoon-sparkle';

interface IconProps {
  name:    IconName;
  size?:   number;
  color?:  string;
  stroke?: number;
}

export function Icon({ name, size = 22, color = colors.fg1, stroke = 1.75 }: IconProps) {
  const common = {
    width:           size,
    height:          size,
    viewBox:         '0 0 24 24',
    fill:            'none' as const,
    stroke:          color,
    strokeWidth:     stroke,
    strokeLinecap:   'round' as const,
    strokeLinejoin:  'round' as const,
  };

  switch (name) {
    case 'shelf':
      return (
        <Svg {...common}>
          <Rect x="3" y="4" width="18" height="16" rx="2" />
          <Path d="M3 10h18M3 15h18" />
          <Path d="M7 7v0M11 7v0M7 12v0M11 12v0M7 17v0M11 17v0" />
        </Svg>
      );
    case 'clock':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M12 7v5l3 2" />
        </Svg>
      );
    case 'plus':
      return <Svg {...common}><Path d="M12 5v14M5 12h14" /></Svg>;
    case 'minus':
      return <Svg {...common}><Path d="M5 12h14" /></Svg>;
    case 'x':
      return <Svg {...common}><Path d="M18 6 6 18M6 6l12 12" /></Svg>;
    case 'check':
      return <Svg {...common}><Path d="M20 6 9 17l-5-5" /></Svg>;
    case 'chevron-right':
      return <Svg {...common}><Path d="M9 6l6 6-6 6" /></Svg>;
    case 'chevron-left':
      return <Svg {...common}><Path d="M15 6l-6 6 6 6" /></Svg>;
    case 'chevron-down':
      return <Svg {...common}><Path d="M6 9l6 6 6-6" /></Svg>;
    case 'arrow-left':
      return <Svg {...common}><Path d="M19 12H5M12 19l-7-7 7-7" /></Svg>;
    case 'arrow-right':
      return <Svg {...common}><Path d="M5 12h14M12 5l7 7-7 7" /></Svg>;
    case 'search':
      return (
        <Svg {...common}>
          <Circle cx="11" cy="11" r="7" />
          <Path d="M21 21l-4.3-4.3" />
        </Svg>
      );
    case 'settings':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="3" />
          <Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </Svg>
      );
    case 'pencil':
      return (
        <Svg {...common}>
          <Path d="M12 20h9" />
          <Path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </Svg>
      );
    case 'trash':
      return (
        <Svg {...common}>
          <Path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
        </Svg>
      );
    case 'star':
      return (
        <Svg {...common}>
          <Path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
        </Svg>
      );
    case 'star-filled':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <Path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z" />
        </Svg>
      );
    case 'heart':
      return (
        <Svg {...common}>
          <Path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </Svg>
      );
    case 'heart-filled':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <Path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </Svg>
      );
    case 'alert':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M12 8v5M12 16v.5" />
        </Svg>
      );
    case 'info':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="9" />
          <Path d="M12 11v5M12 8v.5" />
        </Svg>
      );
    case 'clock-small':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="12" r="8" />
          <Path d="M12 8v4l2.5 1.5" />
        </Svg>
      );
    case 'flame':
      return (
        <Svg {...common}>
          <Path d="M12 2c1 3-2 4-2 8a4 4 0 0 0 4 4 4 4 0 0 0 4-4c0-2-1-3-2-4 0 2-2 2-2 2s3-3 0-6c0 0-1 2-2 0z" />
          <Path d="M12 22a6 6 0 0 0 6-6c0-2-1-4-3-5 0 2-1 3-3 3s-3-1-3-3c-2 1-3 3-3 5a6 6 0 0 0 6 6z" />
        </Svg>
      );
    case 'chef':
      return (
        <Svg {...common}>
          <Path d="M6 14v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5" />
          <Path d="M6 14a4 4 0 0 1-2-6 4 4 0 0 1 5-2 4 4 0 0 1 6 0 4 4 0 0 1 5 2 4 4 0 0 1-2 6" />
          <Path d="M9 14h6" />
        </Svg>
      );
    case 'filter':
      return <Svg {...common}><Path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" /></Svg>;
    case 'user':
      return (
        <Svg {...common}>
          <Circle cx="12" cy="8" r="4" />
          <Path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </Svg>
      );
    case 'logout':
      return (
        <Svg {...common}>
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <Path d="M16 17l5-5-5-5M21 12H9" />
        </Svg>
      );
    case 'shopping':
      return (
        <Svg {...common}>
          <Path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 6H6" />
          <Circle cx="9" cy="20" r="1.5" />
          <Circle cx="18" cy="20" r="1.5" />
        </Svg>
      );
    case 'cat-freezer':
      return (
        <Svg {...common}>
          <Path d="M12 2v20M4 7l16 10M4 17l16-10" />
          <Path d="M12 5l-2-2M12 5l2-2M12 19l-2 2M12 19l2 2M5 9 3 8M5 9 4 7M19 15l2 1M19 15l1 2M5 15l-2 1M5 15 4 17M19 9l2-1M19 9l1-2" />
        </Svg>
      );
    case 'cat-fridge':
      return (
        <Svg {...common}>
          <Rect x="5" y="2" width="14" height="20" rx="2" />
          <Path d="M5 10h14" />
          <Path d="M8 6v1M8 14v3" />
        </Svg>
      );
    case 'cat-produce':
      return (
        <Svg {...common}>
          <Path d="M12 21c-4 0-7-3-7-7 0-3 2-6 4-7 1 1 2 1 3 1s2 0 3-1c2 1 4 4 4 7 0 4-3 7-7 7z" />
          <Path d="M12 7c0-2 1-4 3-5M12 7c-1-1-1-2 0-3" />
        </Svg>
      );
    case 'cat-dry':
      return (
        <Svg {...common}>
          <Path d="M7 3h10l-1 6h-8z" />
          <Path d="M8 9v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9" />
          <Path d="M10 13h4" />
        </Svg>
      );
    case 'cat-canned':
      return (
        <Svg {...common}>
          <Ellipse cx="12" cy="4" rx="7" ry="2" />
          <Path d="M5 4v16a7 2 0 0 0 14 0V4" />
          <Path d="M5 10a7 2 0 0 0 14 0" />
        </Svg>
      );
    case 'cat-spices':
      return (
        <Svg {...common}>
          <Path d="M8 2h8v4H8z" />
          <Path d="M7 6h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6z" />
          <Path d="M11 10v.5M13 12v.5M10 14v.5M14 15v.5M12 17v.5" />
        </Svg>
      );
    case 'cat-oils':
      return (
        <Svg {...common}>
          <Path d="M10 2h4v3l3 2v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7l3-2V2z" />
          <Path d="M10 13h4" />
        </Svg>
      );
    case 'cat-bakery':
      return (
        <Svg {...common}>
          <Path d="M4 12c0-4 4-7 8-7s8 3 8 7v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" />
          <Path d="M8 12v3M12 10v5M16 12v3" />
        </Svg>
      );
    case 'spoon':
      return (
        <Svg {...common}>
          <Ellipse cx="8" cy="8" rx="5" ry="4" transform="rotate(-45 8 8)" />
          <Path d="M11.5 11.5 20 20" />
        </Svg>
      );
    case 'sparkle':
      return (
        <Svg {...common}>
          <Path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
        </Svg>
      );
    case 'spoon-sparkle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <G stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
            <Ellipse cx="9" cy="9" rx="4.5" ry="3.5" transform="rotate(-45 9 9)" />
            <Path d="M12 12l7 7" />
          </G>
          <G stroke={color} strokeWidth={stroke * 0.8} strokeLinecap="round">
            <Path d="M18 5v2M18 5l1.4 1.4M18 5l-1.4 1.4" />
            <Path d="M4 18v1.5M4 18l1 1M4 18l-1 1" />
          </G>
        </Svg>
      );
    default:
      return <Svg {...common}><Rect x="4" y="4" width="16" height="16" rx="2" /></Svg>;
  }
}
