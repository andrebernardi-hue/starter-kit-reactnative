import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Chip } from './Chip';
import { spacing } from '../../tokens';

const meta: Meta<typeof Chip> = {
  title:     'UI/Chip',
  component: Chip,
  args: { label: 'Vegetarian', variant: 'default' },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Default:        Story = { args: { label: 'Default' } };
export const Selected:       Story = { args: { label: 'Selected', selected: true } };
export const Filter:         Story = { args: { label: 'Filter', variant: 'filter' } };
export const FilterSelected: Story = { args: { label: 'Filter', variant: 'filter', selected: true } };
export const Small:          Story = { args: { label: 'Small', size: 'sm' } };

export const FilterGroup: Story = {
  render: () => {
    const tags = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Quick'];
    const [selected, setSelected] = useState<string[]>(['Vegetarian']);
    const toggle = (t: string) =>
      setSelected((prev) =>
        prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
      );
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.nano }}>
        {tags.map((t) => (
          <Chip
            key={t}
            label={t}
            variant="filter"
            selected={selected.includes(t)}
            onPress={() => toggle(t)}
          />
        ))}
      </View>
    );
  },
};
