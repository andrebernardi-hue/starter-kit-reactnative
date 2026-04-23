import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import { colors, textStyles, spacing } from '../../tokens';

interface Props {
  value:          boolean;
  onValueChange:  (v: boolean) => void;
  disabled?:      boolean;
  label?:         string;
}

export function Toggle({ value, onValueChange, disabled = false, label }: Props) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue:         value ? 1 : 0,
      duration:        180,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const thumbX = anim.interpolate({ inputRange: [0, 1], outputRange: [3, 25] });
  const bg     = anim.interpolate({ inputRange: [0, 1], outputRange: [colors.border, colors.primary.pure] });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={[styles.row, disabled && styles.disabled]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <Animated.View style={[styles.track, { backgroundColor: bg }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX: thumbX }] }]} />
      </Animated.View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', gap: spacing.nano },
  disabled: { opacity: 0.4 },
  track: {
    width:          50,
    height:         28,
    borderRadius:   14,
    justifyContent: 'center',
  },
  thumb: {
    position:        'absolute',
    width:           22,
    height:          22,
    borderRadius:    11,
    backgroundColor: colors.neutral.highPure,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.15,
    shadowRadius:    2,
    elevation:       2,
  },
  label: { ...textStyles.body, color: colors.fg2 },
});
