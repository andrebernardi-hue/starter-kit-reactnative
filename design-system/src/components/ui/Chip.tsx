import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, textStyles, spacing, radius, borderWidth } from '../../tokens';

export type ChipVariant = 'default' | 'primary' | 'filter';

interface Props {
  label:     string;
  selected?: boolean;
  onPress?:  () => void;
  variant?:  ChipVariant;
  size?:     'sm' | 'md';
  style?:    ViewStyle;
}

export function Chip({ label, selected = false, onPress, variant = 'default', size = 'md', style }: Props) {
  const isSmall = size === 'sm';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        isSmall && styles.sm,
        styles[variant],
        selected && (styles[`${variant}Selected` as keyof typeof styles] as ViewStyle),
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text
        style={[
          isSmall ? textStyles.labelSm : textStyles.labelLg,
          styles[`${variant}Label` as keyof typeof styles],
          selected && styles[`${variant}SelectedLabel` as keyof typeof styles],
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height:            36,
    paddingHorizontal: spacing.xxxs,
    borderRadius:      radius.full,
    alignItems:        'center',
    justifyContent:    'center',
    alignSelf:         'flex-start',
  },
  sm: { height: 28, paddingHorizontal: spacing.nano },

  // Variant backgrounds (unselected)
  default: { backgroundColor: colors.bgMuted },
  primary: { backgroundColor: colors.bgMuted },
  filter:  { backgroundColor: colors.bgMuted, borderWidth: borderWidth.hairline, borderColor: colors.border },

  // Variant backgrounds (selected)
  defaultSelected: { backgroundColor: colors.primary.light },
  primarySelected: { backgroundColor: colors.primary.pure },
  filterSelected:  { backgroundColor: colors.primary.light, borderColor: colors.primary.pure },

  // Label colors (unselected)
  defaultLabel: { color: colors.fg2 },
  primaryLabel: { color: colors.fg2 },
  filterLabel:  { color: colors.fg3 },

  // Label colors (selected)
  defaultSelectedLabel: { color: colors.primary.pure },
  primarySelectedLabel: { color: colors.fgOnPrimary },
  filterSelectedLabel:  { color: colors.primary.pure },
});
