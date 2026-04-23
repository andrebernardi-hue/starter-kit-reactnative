import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { CategoryTile }        from './CategoryTile';
import { Typography }          from './Typography';
import { spacing, colors }     from '../../tokens';
import { CATEGORIES }          from '../../types/pantry';

const meta: Meta<typeof CategoryTile> = {
  title:     'UI/CategoryTile',
  component: CategoryTile,
  args:      { category: 'produce', size: 44 },
  argTypes: {
    category: { control: 'select', options: ['freezer','fridge','produce','dry','canned','spices','oils','bakery'] },
    size:     { control: 'range', min: 24, max: 80, step: 4 },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryTile>;

export const Default: Story = {};

export const AllCategories: Story = {
  render: () => (
    <View style={styles.grid}>
      {CATEGORIES.map((cat) => (
        <View key={cat.id} style={styles.item}>
          <CategoryTile category={cat.id} size={44} />
          <Typography role="labelSm" color={colors.fg3}>{cat.label}</Typography>
        </View>
      ))}
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      {[24, 36, 44, 56, 72].map((s) => (
        <CategoryTile key={s} category="produce" size={s} />
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxxs },
  item: { alignItems: 'center', gap: 6, width: 80 },
  row:  { flexDirection: 'row', gap: spacing.nano, alignItems: 'flex-end' },
});
