import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors, textStyles, spacing, radius, shadows, buttonSizes } from '../../tokens';

export type ButtonVariant = 'primary' | 'outline' | 'danger' | 'text';
export type ButtonSize    = 'lg' | 'sm';

interface Props {
  label:       string;
  onPress:     () => void;
  variant?:    ButtonVariant;
  size?:       ButtonSize;
  disabled?:   boolean;
  loading?:    boolean;
  fullWidth?:  boolean;
  style?:      ViewStyle;
}

export function Button({
  label,
  onPress,
  variant   = 'primary',
  size      = 'lg',
  disabled  = false,
  loading   = false,
  fullWidth = true,
  style,
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        size === 'sm' && styles.sm,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        variant === 'primary' && !isDisabled && shadows.level2,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.fgOnPrimary : colors.primary.pure}
          size="small"
        />
      ) : (
        <Text style={[
          size === 'lg' ? textStyles.labelLg : textStyles.labelSm,
          styles[`${variant}Label` as keyof typeof styles],
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height:            buttonSizes.lg.height,
    paddingHorizontal: buttonSizes.lg.paddingHorizontal,
    borderRadius:      radius.md,
    alignItems:        'center',
    justifyContent:    'center',
    flexDirection:     'row',
    gap:               spacing.nano,
  },
  sm: {
    height:            buttonSizes.sm.height,
    paddingHorizontal: buttonSizes.sm.paddingHorizontal,
    borderRadius:      radius.sm,
  },
  fullWidth: { alignSelf: 'stretch' },
  disabled:  { opacity: 0.4 },

  primary: { backgroundColor: colors.primary.pure },
  outline: {
    backgroundColor: colors.bg,
    borderWidth:     1.5,
    borderColor:     colors.primary.pure,
  },
  danger: {
    backgroundColor: colors.bg,
    borderWidth:     1.5,
    borderColor:     colors.error.medium,
  },
  text: { backgroundColor: 'transparent' },

  primaryLabel: { color: colors.fgOnPrimary },
  outlineLabel: { color: colors.primary.pure },
  dangerLabel:  { color: colors.error.medium },
  textLabel:    { color: colors.primary.pure },
});
