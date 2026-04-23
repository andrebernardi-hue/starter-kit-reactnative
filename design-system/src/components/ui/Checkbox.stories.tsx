import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Checkbox } from './Checkbox';
import { spacing } from '../../tokens';

const meta: Meta<typeof Checkbox> = {
  title:     'UI/Checkbox',
  component: Checkbox,
  args: { checked: false, label: 'I agree to the terms' },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked:     Story = { args: { checked: false } };
export const Checked:       Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { checked: false, indeterminate: true } };
export const Disabled:      Story = { args: { checked: true, disabled: true } };

export const Group: Story = {
  render: () => {
    const [items, setItems] = useState([true, false, false]);
    const toggle = (i: number) =>
      setItems((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    return (
      <View style={{ gap: spacing.nano }}>
        <Checkbox checked={items[0]} onToggle={() => toggle(0)} label="Option A" />
        <Checkbox checked={items[1]} onToggle={() => toggle(1)} label="Option B" />
        <Checkbox checked={items[2]} onToggle={() => toggle(2)} label="Option C" />
      </View>
    );
  },
};
