import { Pressable, Text, View, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, radius, borderWidth } from '../../tokens';

interface Props {
  checked:        boolean;
  onToggle:       () => void;
  label?:         string;
  disabled?:      boolean;
  indeterminate?: boolean;
}

export function Checkbox({ checked, onToggle, label, disabled = false, indeterminate = false }: Props) {
  const isActive = checked || indeterminate;

  return (
    <Pressable
      onPress={() => !disabled && onToggle()}
      style={[styles.row, disabled && styles.disabled]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
    >
      <View style={[styles.box, isActive ? styles.boxActive : styles.boxInactive]}>
        {checked && !indeterminate && <Text style={styles.mark}>✓</Text>}
        {indeterminate && <View style={styles.dash} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', gap: spacing.nano },
  disabled: { opacity: 0.4 },
  box: {
    width:          20,
    height:         20,
    borderRadius:   radius.xs,
    alignItems:     'center',
    justifyContent: 'center',
  },
  boxInactive: {
    backgroundColor: colors.bg,
    borderWidth:     borderWidth.hairline,
    borderColor:     colors.border,
  },
  boxActive: {
    backgroundColor: colors.primary.pure,
    borderWidth:     0,
  },
  mark: { color: colors.fgOnPrimary, fontSize: 12, fontWeight: '700', lineHeight: 14 },
  dash: {
    width:           10,
    height:          2,
    borderRadius:    1,
    backgroundColor: colors.fgOnPrimary,
  },
  label: { ...textStyles.body, color: colors.fg2 },
});
