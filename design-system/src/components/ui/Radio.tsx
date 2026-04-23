import { Pressable, Text, View, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, borderWidth } from '../../tokens';

interface RadioOption {
  label: string;
  value: string;
}

interface Props {
  options:   RadioOption[];
  value:     string;
  onChange:  (v: string) => void;
  disabled?: boolean;
}

export function Radio({ options, value, onChange, disabled = false }: Props) {
  return (
    <View style={styles.group}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => !disabled && onChange(opt.value)}
            style={[styles.row, disabled && styles.disabled]}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected, disabled }}
          >
            <View style={[styles.outer, selected && styles.outerSelected]}>
              {selected && <View style={styles.inner} />}
            </View>
            <Text style={styles.label}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group:    { gap: spacing.nano },
  row:      { flexDirection: 'row', alignItems: 'center', gap: spacing.nano },
  disabled: { opacity: 0.4 },
  outer: {
    width:           20,
    height:          20,
    borderRadius:    10,
    borderWidth:     borderWidth.hairline,
    borderColor:     colors.border,
    backgroundColor: colors.bg,
    alignItems:      'center',
    justifyContent:  'center',
  },
  outerSelected: {
    borderColor: colors.primary.pure,
    borderWidth: borderWidth.thin,
  },
  inner: {
    width:           10,
    height:          10,
    borderRadius:    5,
    backgroundColor: colors.primary.pure,
  },
  label: { ...textStyles.body, color: colors.fg2 },
});
