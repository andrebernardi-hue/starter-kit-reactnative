import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const OPTIONS = [
  { label: 'Quick (< 30 min)',  value: 'quick'  },
  { label: 'Medium (30–60 min)', value: 'medium' },
  { label: 'Long (60+ min)',     value: 'long'   },
];

const meta: Meta<typeof Radio> = {
  title:     'UI/Radio',
  component: Radio,
  args: { options: OPTIONS, value: 'quick' },
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Default:  Story = { args: { value: 'quick' } };
export const Disabled: Story = { args: { value: 'medium', disabled: true } };

export const Interactive: Story = {
  render: (args) => {
    const [v, setV] = useState('quick');
    return <Radio {...args} value={v} onChange={setV} />;
  },
};
