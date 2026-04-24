import React, { useEffect, useRef } from 'react';
import { View, Pressable, Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../tokens';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  /** Total number of pages. */
  total:      number;
  /** Zero-based index of the active page. */
  current:    number;
  /**
   * `dots`  — compact circular dots, active one slightly larger.
   * `pills` — active indicator expands into a wider pill.
   */
  variant?:   'dots' | 'pills';
  /** Called when a dot/pill is tapped. Omit to make the control non-interactive. */
  onChange?:  (index: number) => void;
  /** Override the active indicator colour (defaults to `colors.primary.pure`). */
  activeColor?:   string;
  /** Override the inactive indicator colour (defaults to `colors.neutral.highMedium`). */
  inactiveColor?: string;
  style?:     ViewStyle;
}

// ─── Animated dot ─────────────────────────────────────────────────────────────

function PaginationDot({
  active,
  variant,
  activeColor,
  inactiveColor,
  onPress,
}: {
  active:         boolean;
  variant:        'dots' | 'pills';
  activeColor:    string;
  inactiveColor:  string;
  onPress?:       () => void;
}) {
  const widthAnim = useRef(
    new Animated.Value(active ? (variant === 'pills' ? PILL_W : DOT_SIZE) : DOT_SIZE),
  ).current;
  const opacityAnim = useRef(new Animated.Value(active ? 1 : INACTIVE_OPACITY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(widthAnim, {
        toValue:         active ? (variant === 'pills' ? PILL_W : DOT_SIZE) : DOT_SIZE,
        useNativeDriver: false,
        tension:         120,
        friction:        10,
      }),
      Animated.timing(opacityAnim, {
        toValue:         active ? 1 : INACTIVE_OPACITY,
        duration:        180,
        useNativeDriver: false,
      }),
    ]).start();
  }, [active, variant]);

  const inner = (
    <Animated.View
      style={[
        styles.dot,
        {
          width:           widthAnim,
          backgroundColor: active ? activeColor : inactiveColor,
          opacity:         opacityAnim,
        },
      ]}
    />
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
      >
        {inner}
      </Pressable>
    );
  }

  return inner;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function Pagination({
  total,
  current,
  variant      = 'dots',
  onChange,
  activeColor   = colors.primary.pure,
  inactiveColor = colors.neutral.highMedium,
  style,
}: Props) {
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: total }).map((_, i) => (
        <PaginationDot
          key={i}
          active={i === current}
          variant={variant}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          onPress={onChange ? () => onChange(i) : undefined}
        />
      ))}
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const DOT_SIZE        = 8;
const PILL_W          = 24;
const INACTIVE_OPACITY = 0.35;

const styles = StyleSheet.create({
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            6,
  },
  dot: {
    height:       DOT_SIZE,
    borderRadius: radius.full,
  },
});
