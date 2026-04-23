import { useState } from 'react';
import {
  TextInput as RNTextInput,
  View, Text, StyleSheet,
  KeyboardTypeOptions, ViewStyle,
} from 'react-native';
import { colors, fontFamilies, fontSizes, radius, borderWidth, spacing } from '../../tokens';

interface FieldProps {
  label:     string;
  required?: boolean;
  hint?:     string;
  children:  React.ReactNode;
  style?:    ViewStyle;
}

export function Field({ label, required, hint, children, style }: FieldProps) {
  return (
    <View style={[styles.fieldWrapper, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      {children}
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

interface InputProps {
  value:           string;
  onChangeText:    (text: string) => void;
  placeholder?:    string;
  keyboardType?:   KeyboardTypeOptions;
  secureText?:     boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?:          ViewStyle;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType   = 'default',
  secureText     = false,
  autoCapitalize = 'sentences',
  style,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <RNTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.fg4}
      keyboardType={keyboardType}
      secureTextEntry={secureText}
      autoCapitalize={autoCapitalize}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[styles.input, focused && styles.inputFocused, style]}
    />
  );
}

const styles = StyleSheet.create({
  fieldWrapper: { gap: 6 },
  label: {
    fontFamily:    fontFamilies.base,
    fontSize:      12,
    fontWeight:    '700',
    color:         colors.fg1,
    letterSpacing: 0.02,
  },
  required: { color: colors.error.medium },
  hint:     { fontSize: 11, color: colors.fg3 },
  input: {
    height:            44,
    paddingHorizontal: spacing.xxxs,
    backgroundColor:   colors.bg,
    color:             colors.fg1,
    fontFamily:        fontFamilies.base,
    fontSize:          fontSizes.xxs,
    borderWidth:       1.5,
    borderColor:       colors.border,
    borderRadius:      10,
  },
  inputFocused: { borderColor: colors.primary.pure },
});
