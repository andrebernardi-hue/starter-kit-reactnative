import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, textStyles, radius } from '../../tokens';

interface Props {
  value:         string;
  onChangeText:  (text: string) => void;
  placeholder?:  string;
  onSubmit?:     () => void;
  onClear?:      () => void;
  loading?:      boolean;
  autoFocus?:    boolean;
  disabled?:     boolean;
  showCancel?:   boolean;
  onCancel?:     () => void;
  style?:        ViewStyle;
}

function SearchIcon() {
  return (
    <View style={iconStyles.container}>
      {/* Circle */}
      <View style={iconStyles.circle} />
      {/* Handle */}
      <View style={iconStyles.handle} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
  container: {
    width:  14,
    height: 14,
  },
  circle: {
    position:     'absolute',
    top:          0,
    left:         0,
    width:        11,
    height:       11,
    borderRadius: 5.5,
    borderWidth:  2,
    borderColor:  colors.fg3,
  },
  handle: {
    position:        'absolute',
    bottom:          0,
    right:           0,
    width:           4,
    height:          1.5,
    backgroundColor: colors.fg3,
    transform:       [{ rotate: '45deg' }],
  },
});

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onSubmit,
  onClear,
  loading    = false,
  autoFocus  = false,
  disabled   = false,
  showCancel = true,
  onCancel,
  style,
}: Props) {
  const [focused, setFocused] = useState(false);
  const cancelWidth = useRef(new Animated.Value(0)).current;

  function handleFocus() {
    setFocused(true);
    Animated.timing(cancelWidth, {
      toValue:         52,
      duration:        200,
      useNativeDriver: false,
    }).start();
  }

  function handleBlur() {
    setFocused(false);
    Animated.timing(cancelWidth, {
      toValue:         0,
      duration:        200,
      useNativeDriver: false,
    }).start();
  }

  function handleClear() {
    onChangeText('');
    onClear?.();
  }

  function handleCancel() {
    onChangeText('');
    onCancel?.();
  }

  return (
    <View style={[styles.outer, style]}>
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
          disabled && styles.disabled,
        ]}
      >
        <SearchIcon />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.fg4}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmit}
          autoFocus={autoFocus}
          editable={!disabled}
          returnKeyType="search"
        />
        {loading ? (
          <ActivityIndicator size="small" color={colors.fg4} />
        ) : value.length > 0 ? (
          <Pressable onPress={handleClear} hitSlop={8}>
            <Text style={styles.clearIcon}>×</Text>
          </Pressable>
        ) : null}
      </View>

      {showCancel !== false && (
        <Animated.View style={{ width: cancelWidth, overflow: 'hidden' }}>
          <Pressable onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  container: {
    flex:              1,
    flexDirection:     'row',
    alignItems:        'center',
    height:            44,
    borderRadius:      22,
    backgroundColor:   colors.neutral.highLight,
    paddingHorizontal: 14,
    gap:               8,
  },
  containerFocused: {
    borderWidth:     1.5,
    borderColor:     colors.focusRing,
    backgroundColor: colors.bg,
  },
  disabled: {
    opacity: 0.4,
  },
  input: {
    ...textStyles.bodySm,
    flex:            1,
    color:           colors.fg1,
    paddingVertical: 0,
    borderWidth:     0,
    backgroundColor: 'transparent',
  },
  clearIcon: {
    // ×  dismiss glyph — slightly larger than body for tap target clarity
    ...textStyles.body,
    color:      colors.fg3,
    lineHeight: 20,
  },
  cancelButton: {
    width:          52,
    alignItems:     'center',
    justifyContent: 'center',
    height:         44,
  },
  cancelText: {
    ...textStyles.labelSm,
    color: colors.primary.pure,
  },
});
