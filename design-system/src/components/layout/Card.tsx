import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, borderWidth, shadows, spacing } from '../../tokens';

type Elevation = 0 | 1 | 2;

interface Props {
  children:   React.ReactNode;
  elevation?: Elevation;
  padding?:   number;
  style?:     ViewStyle;
}

export function Card({ children, elevation = 1, padding = spacing.xxxs, style }: Props) {
  return (
    <View style={[
      styles.base,
      elevation > 0 && shadows[`level${elevation}` as 'level1' | 'level2'],
      { padding },
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.bg,
    borderRadius:    radius.md,
    borderWidth:     borderWidth.hairline,
    borderColor:     colors.borderSubtle,
  },
});
