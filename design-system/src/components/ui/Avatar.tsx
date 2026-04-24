import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { colors, textStyles, shadows, radius } from '../../tokens';

interface Props {
  initials:   string;
  size?:      number;
  onPress?:   () => void;
  color?:     string;
  imageUri?:  string;
  ring?:      boolean;
  ringColor?: string;
  variant?:   'circle' | 'rounded';
}

export function Avatar({
  initials,
  size = 36,
  onPress,
  color,
  imageUri,
  ring = false,
  ringColor = colors.primary.extraLight,
  variant = 'circle',
}: Props) {
  const [imgError, setImgError] = useState(false);

  const bgColor     = color ?? colors.primary.pure;
  const borderRad   = variant === 'rounded' ? radius.md : radius.full;
  const showImage   = !!imageUri && !imgError;
  const ringPadding = 2;
  const ringBorderR = variant === 'rounded' ? radius.md + ringPadding : radius.full;

  const avatar = (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
      style={[
        styles.base,
        shadows.level1,
        { width: size, height: size, borderRadius: borderRad, backgroundColor: bgColor },
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri: imageUri }}
          style={{ width: size, height: size, borderRadius: borderRad }}
          onError={() => setImgError(true)}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: Math.round(size * 0.4) }]}>
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (ring) {
    return (
      <View
        style={[
          styles.ring,
          {
            borderRadius:  ringBorderR,
            borderColor:   ringColor,
            padding:       ringPadding,
          },
        ]}
      >
        {avatar}
      </View>
    );
  }

  return avatar;
}

const styles = StyleSheet.create({
  base: {
    borderWidth:     2,
    borderColor:     colors.bg,
    alignItems:      'center',
    justifyContent:  'center',
    overflow:        'hidden',
  },
  initials: {
    // fontSize is set inline (scales with avatar size); family + weight from labelSm slot
    ...textStyles.labelSm,
    color: colors.fgOnPrimary,
  },
  ring: {
    borderWidth: 2,
  },
});
