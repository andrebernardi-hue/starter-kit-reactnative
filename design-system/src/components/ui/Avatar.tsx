import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontFamilies, fontWeights, shadows, radius } from '../../tokens';

interface Props {
  initials: string;
  size?:    number;
  onPress?: () => void;
}

export function Avatar({ initials, size = 36, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
      style={[
        styles.base,
        shadows.level1,
        { width: size, height: size, borderRadius: radius.full },
      ]}
    >
      <Text style={[styles.initials, { fontSize: Math.round(size * 0.4) }]}>
        {initials.slice(0, 2).toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary.pure,
    borderWidth:     2,
    borderColor:     colors.bg,
    alignItems:      'center',
    justifyContent:  'center',
  },
  initials: {
    fontFamily: fontFamilies.base,
    fontWeight: fontWeights.bold,
    color:      colors.fgOnPrimary,
  },
});
