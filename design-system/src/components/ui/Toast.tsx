import { View, Text, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, radius, borderWidth } from '../../tokens';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

interface Props {
  message:  string;
  variant?: ToastVariant;
  visible?: boolean;
}

const VARIANT_STYLES: Record<ToastVariant, { bg: string; accent: string; text: string }> = {
  default: { bg: colors.primary.light,  accent: colors.primary.pure,   text: colors.primary.dark  },
  success: { bg: '#E8F5E3',             accent: colors.success.medium,  text: colors.success.dark  },
  warning: { bg: '#FFF3E3',             accent: colors.warning.medium,  text: colors.warning.dark  },
  error:   { bg: '#FDE8EA',             accent: colors.error.medium,    text: colors.error.dark    },
} as const;

export function Toast({ message, variant = 'default', visible = true }: Props) {
  if (!visible) return null;
  const v = VARIANT_STYLES[variant];

  return (
    <View style={[styles.container, { backgroundColor: v.bg }]}>
      <View style={[styles.accent, { backgroundColor: v.accent }]} />
      <Text style={[styles.message, { color: v.text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:    'center',
    borderRadius:  radius.sm,
    overflow:      'hidden',
    minHeight:     48,
    alignSelf:     'stretch',
  },
  accent: {
    width:     borderWidth.heavy,
    alignSelf: 'stretch',
  },
  message: {
    ...textStyles.body,
    flex:              1,
    paddingVertical:   spacing.nano,
    paddingHorizontal: spacing.xxxs,
  },
});
