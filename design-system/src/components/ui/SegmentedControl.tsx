import React, { useRef, useState } from 'react';
import { Animated, Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { colors, textStyles, fontWeights } from '../../tokens';

export interface SegmentItem {
  key:   string;
  label: string;
}

interface Props {
  items:     SegmentItem[];
  value:     string;
  onChange:  (key: string) => void;
  disabled?: boolean;
  style?:    ViewStyle;
}

export function SegmentedControl({ items, value, onChange, disabled = false, style }: Props) {
  const activeIndex = items.findIndex((item) => item.key === value);
  const anim = useRef(new Animated.Value(activeIndex >= 0 ? activeIndex : 0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  // Subtract padding from both sides so the pill never bleeds outside the track
  const innerWidth = containerWidth > 0 ? containerWidth - TRACK_PADDING * 2 : 0;
  const pillWidth  = innerWidth > 0 ? innerWidth / items.length : 0;

  const pillLeft = anim.interpolate({
    inputRange:  items.map((_, i) => i),
    // Offset by TRACK_PADDING so position 0 starts at the inner edge, not the outer edge
    outputRange: items.map((_, i) => TRACK_PADDING + i * pillWidth),
  });

  function handlePress(key: string, index: number) {
    if (disabled) return;
    Animated.timing(anim, {
      toValue:         index,
      duration:        180,
      useNativeDriver: false,
    }).start();
    onChange(key);
  }

  return (
    <View style={[styles.container, disabled && styles.disabled, style]}>
      <View
        style={styles.track}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {/* Animated pill */}
        {containerWidth > 0 && (
          <Animated.View
            style={[
              styles.pill,
              { width: pillWidth, left: pillLeft },
            ]}
          />
        )}

        {items.map((item, index) => {
          const isActive = item.key === value;
          return (
            <Pressable
              key={item.key}
              style={styles.segment}
              onPress={() => handlePress(item.key, index)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// ── Layout constants ─────────────────────────────────────────────────────────
const TRACK_PADDING = 5;
const TRACK_HEIGHT  = 52;
const PILL_HEIGHT   = TRACK_HEIGHT - TRACK_PADDING * 2; // 42
// Concentric radii: pill mirrors the container curve minus the padding gap
const TRACK_RADIUS  = 16;
const PILL_RADIUS   = TRACK_RADIUS - TRACK_PADDING;     // 11

const styles = StyleSheet.create({
  container: {
    height: TRACK_HEIGHT,
  },
  track: {
    flex:            1,
    backgroundColor: colors.neutral.highLight,
    borderRadius:    TRACK_RADIUS,
    padding:         TRACK_PADDING,
    flexDirection:   'row',
    overflow:        'visible', // let the pill shadow breathe outside the track bounds
  },
  disabled: {
    opacity: 0.4,
  },
  pill: {
    position:        'absolute',
    top:             TRACK_PADDING,
    height:          PILL_HEIGHT,
    borderRadius:    PILL_RADIUS,
    backgroundColor: '#FFFFFF',
    // Soft centred shadow — minimal offset so the glow is symmetric, not directional
    shadowColor:     '#000000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.10,
    shadowRadius:    8,
    elevation:       3,
  },
  segment: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  label: {
    // Regular weight for inactive — makes the bold-active contrast clearly legible
    ...textStyles.body,
    color: colors.fg3,
  },
  labelActive: {
    color:      colors.fg1,
    fontWeight: fontWeights.bold,
  },
});
