import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SegmentedControl } from './SegmentedControl';
import { spacing } from '../../tokens';

const ITEMS = [
  { key: 'all',     label: 'All' },
  { key: 'fridge',  label: 'Fridge' },
  { key: 'pantry',  label: 'Pantry' },
];

const meta: Meta<typeof SegmentedControl> = {
  title:     'UI/SegmentedControl',
  component: SegmentedControl,
  args: { items: ITEMS, value: 'all' },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: spacing.xxxs }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default:  Story = { args: { value: 'all' } };
export const Middle:   Story = { args: { value: 'fridge' } };
export const Last:     Story = { args: { value: 'pantry' } };
export const Disabled: Story = { args: { value: 'all', disabled: true } };

export const TwoItems: Story = {
  args: {
    items: [{ key: 'a', label: 'Recipes' }, { key: 'b', label: 'Pantry' }],
    value: 'a',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.value ?? 'all');
    return (
      <SegmentedControl items={ITEMS} value={val} onChange={setVal} />
    );
  },
};
