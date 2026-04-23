import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, fontFamilies, fontWeights, fontSizes, radius, spacing } from '../../tokens';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'primary';
export type BadgeSize    = 'sm' | 'xs';

interface Props {
  label:    string;
  variant?: BadgeVariant;
  size?:    BadgeSize;
  style?:   ViewStyle;
}

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; fg: string }> = {
  default: { bg: colors.bgMuted,       fg: colors.fg3          },
  primary: { bg: colors.primary.light, fg: colors.primary.dark },
  success: { bg: colors.success.light, fg: colors.success.dark },
  warning: { bg: colors.warning.light, fg: colors.warning.dark },
  error:   { bg: '#F3EEEE',            fg: colors.error.dark   },
};

export function Badge({ label, variant = 'default', size = 'sm', style }: Props) {
  const { bg, fg } = VARIANT_STYLES[variant];
  return (
    <View style={[styles.base, size === 'xs' && styles.xs, { backgroundColor: bg }, style]}>
      <Text style={[styles.label, { color: fg }, size === 'xs' && styles.labelXs]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.nano,
    paddingVertical:   3,
    borderRadius:      radius.full,
    alignSelf:         'flex-start',
  },
  xs: {
    paddingHorizontal: 6,
    paddingVertical:   2,
  },
  label: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      fontSizes.xxs,
    letterSpacing: 0.1,
  },
  labelXs: { fontSize: 11 },
});
