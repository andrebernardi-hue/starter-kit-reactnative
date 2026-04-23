import { Text, StyleSheet, ViewStyle, View } from 'react-native';
import { colors, fontFamilies, fontWeights, spacing } from '../../tokens';

interface Props {
  children: string;
  style?:   ViewStyle;
}

export function SectionHeader({ children, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{children.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:        spacing.xxs,
    marginBottom:     10,
    marginHorizontal: 2,
  },
  text: {
    fontFamily:    fontFamilies.base,
    fontWeight:    fontWeights.bold,
    fontSize:      11,
    color:         colors.fg3,
    letterSpacing: 0.1,
  },
});
