import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { fontFamilies, fontWeights, radius } from '../../tokens';

interface Props {
  title?:     string;
  hue?:       number;
  height?:    number;
  style?:     ViewStyle;
  showTitle?: boolean;
}

export function RecipeImage({ title, hue = 150, height = 180, showTitle = true, style }: Props) {
  const c1 = `hsl(${hue}, 32%, 72%)`;

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor: c1, borderRadius: radius.md },
        style,
      ]}
    >
      {showTitle && title && (
        <View style={styles.titleWrapper}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { overflow: 'hidden', flexShrink: 0 },
  titleWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 18 },
  title: {
    fontFamily:  fontFamilies.highlight,
    fontWeight:  fontWeights.medium,
    fontSize:    24,
    lineHeight:  28,
    color:       '#FFFFFF',
  },
});
