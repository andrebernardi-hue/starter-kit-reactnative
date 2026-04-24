import { View, Text, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, radius } from '../../tokens';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

interface Props {
  title?:   string;
  message:  string;
  variant?: ToastVariant;
  visible?: boolean;
}

const VARIANT_STYLES: Record<ToastVariant, { bg: string; dot: string; titleColor: string; msgColor: string }> = {
  default: { bg: colors.primary.light,  dot: colors.primary.pure,   titleColor: colors.primary.dark,  msgColor: colors.fg2           },
  success: { bg: '#E8F5E3',             dot: colors.success.medium,  titleColor: colors.success.dark,  msgColor: colors.fg2           },
  warning: { bg: '#FFF3E3',             dot: colors.warning.medium,  titleColor: colors.warning.dark,  msgColor: colors.fg2           },
  error:   { bg: '#FDE8EA',             dot: colors.error.medium,    titleColor: colors.error.dark,    msgColor: colors.fg2           },
} as const;

export function Toast({ title, message, variant = 'default', visible = true }: Props) {
  if (!visible) return null;
  const v = VARIANT_STYLES[variant];

  return (
    <View style={[styles.container, { backgroundColor: v.bg }]}>
      {/* Dot */}
      <View style={[styles.dot, { backgroundColor: v.dot }]} />
      {/* Body */}
      <View style={styles.body}>
        {title && (
          <Text style={[styles.title, { color: v.titleColor }]}>{title}</Text>
        )}
        <Text style={[styles.message, { color: v.msgColor }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    borderRadius:  radius.sm,
    overflow:      'hidden',
    padding:       spacing.nano,
    gap:           10,
    alignSelf:     'stretch',
  },
  dot: {
    width:        8,
    height:       8,
    borderRadius: 4,
    flexShrink:   0,
    marginTop:    4,   // optical alignment with first line of text
  },
  body: {
    flex: 1,
    gap:  2,
  },
  title: {
    ...textStyles.labelSm,
  },
  message: {
    ...textStyles.bodySm,
  },
});
