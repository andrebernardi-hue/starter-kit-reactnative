import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View }                from 'react-native';
import { Card }                from './Card';
import { Typography }          from '../ui/Typography';
import { spacing, colors }     from '../../tokens';

const meta: Meta<typeof Card> = {
  title:     'Layout/Card',
  component: Card,
  decorators: [(Story) => (
    <View style={{ width: 360, padding: spacing.xxxs, backgroundColor: colors.bgSubtle }}>
      <Story />
    </View>
  )],
  argTypes: {
    elevation: { control: 'select', options: [0, 1, 2] },
  },
  args: { elevation: 1 },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Typography role="h4">Greek Yogurt Bowl</Typography>
      <Typography role="bodySm">3 ingredients matched · Ready in 10 min</Typography>
    </Card>
  ),
};

export const Flat: Story = {
  render: () => (
    <Card elevation={0}>
      <Typography role="body">Flat card — no shadow, just border.</Typography>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card elevation={2}>
      <Typography role="h4">Recipe card with stronger shadow</Typography>
    </Card>
  ),
};
