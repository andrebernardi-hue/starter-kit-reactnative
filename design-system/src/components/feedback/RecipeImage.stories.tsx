import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { RecipeImage }         from './RecipeImage';
import { spacing }             from '../../tokens';

const meta: Meta<typeof RecipeImage> = {
  title:     'Feedback/RecipeImage',
  component: RecipeImage,
  decorators: [(Story) => <View style={{ width: 360 }}><Story /></View>],
  args: { title: 'Avocado Quinoa Bowl', hue: 150, height: 180, showTitle: true },
  argTypes: {
    hue:       { control: 'range', min: 0, max: 360, step: 10 },
    height:    { control: 'range', min: 80, max: 320, step: 8 },
    showTitle: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RecipeImage>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => (
    <View style={styles.stack}>
      <RecipeImage title="Wild Salmon Teriyaki" hue={200} height={140} />
      <RecipeImage title="Kale & Sweet Potato"  hue={90}  height={140} />
      <RecipeImage title="Spiced Chickpea Stew" hue={20}  height={140} />
      <RecipeImage title="Greek Yogurt Parfait" hue={260} height={140} />
    </View>
  ),
};

const styles = StyleSheet.create({ stack: { gap: spacing.nano } });
