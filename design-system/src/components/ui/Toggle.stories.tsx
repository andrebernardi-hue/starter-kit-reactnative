import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Toggle } from './Toggle';
import { spacing } from '../../tokens';

const meta: Meta<typeof Toggle> = {
  title:     'UI/Toggle',
  component: Toggle,
  args: { value: false, label: 'Enable notifications' },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off:      Story = { args: { value: false } };
export const On:       Story = { args: { value: true } };
export const Disabled: Story = { args: { value: true, disabled: true } };
export const NoLabel:  Story = { args: { label: undefined } };

export const Interactive: Story = {
  render: (args) => {
    const [v, setV] = useState(args.value);
    return (
      <View style={{ gap: spacing.xxxs }}>
        <Toggle value={v} onValueChange={setV} label="Enable notifications" />
        <Toggle value={!v} onValueChange={() => setV(!v)} label="Dark mode" />
        <Toggle value={false} onValueChange={() => {}} label="Disabled" disabled />
      </View>
    );
  },
};
