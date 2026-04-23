import { Pressable, Text, View, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, borderWidth } from '../../tokens';

interface Props {
  title:        string;
  subtitle?:    string;
  onPress?:     () => void;
  leftSlot?:    React.ReactNode;
  rightSlot?:   React.ReactNode;
  showDivider?: boolean;
  disabled?:    boolean;
}

export function ListItem({
  title,
  subtitle,
  onPress,
  leftSlot,
  rightSlot,
  showDivider = true,
  disabled = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={[styles.row, showDivider && styles.divider, disabled && styles.disabled]}
      accessibilityRole={onPress ? 'button' : 'none'}
    >
      {leftSlot && <View style={styles.left}>{leftSlot}</View>}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>
      {rightSlot && <View style={styles.right}>{rightSlot}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection:     'row',
    alignItems:        'center',
    minHeight:         56,
    paddingHorizontal: spacing.xxxs,
    backgroundColor:   colors.bg,
    gap:               spacing.nano,
  },
  divider: {
    borderBottomWidth: borderWidth.hairline,
    borderBottomColor: colors.borderSubtle,
  },
  disabled: { opacity: 0.4 },
  left:     { flexShrink: 0 },
  right:    { flexShrink: 0, marginLeft: 'auto' },
  body:     { flex: 1, justifyContent: 'center', gap: 2 },
  title:    { ...textStyles.labelLg, color: colors.fg1 },
  subtitle: { ...textStyles.bodySm,  color: colors.fg4 },
});
