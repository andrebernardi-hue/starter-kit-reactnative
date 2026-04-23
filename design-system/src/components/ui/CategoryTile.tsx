import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius }              from '../../tokens';
import { Icon }                        from '../icons/Icon';
import { CategoryId }                  from '../../types/pantry';

// Maps CategoryId → Icon name
const CATEGORY_ICONS: Record<CategoryId, Parameters<typeof Icon>[0]['name']> = {
  freezer: 'cat-freezer',
  fridge:  'cat-fridge',
  produce: 'cat-produce',
  dry:     'cat-dry',
  canned:  'cat-canned',
  spices:  'cat-spices',
  oils:    'cat-oils',
  bakery:  'cat-bakery',
};

interface Props {
  category: CategoryId;
  size?:    number;
  style?:   ViewStyle;
}

export function CategoryTile({ category, size = 44, style }: Props) {
  const { tint, ink } = colors.categories[category];
  const tileRadius    = Math.round(size * 0.27);
  const iconSize      = Math.round(size * 0.52);

  return (
    <View
      style={[
        styles.tile,
        { width: size, height: size, borderRadius: tileRadius, backgroundColor: tint },
        style,
      ]}
    >
      <Icon name={CATEGORY_ICONS[category]} size={iconSize} color={ink} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems:     'center',
    justifyContent: 'center',
    flexShrink:     0,
  },
});
