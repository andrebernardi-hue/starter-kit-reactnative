import { Text, StyleSheet, ViewStyle, View } from 'react-native';
import { colors, textStyles, spacing } from '../../tokens';

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
    // caption slot — bold micro, uppercase, widely tracked
    ...textStyles.caption,
    color: colors.fg3,
  },
});
