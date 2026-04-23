import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View }                from 'react-native';
import { TopBar }              from './TopBar';
import { Avatar }              from '../ui/Avatar';
import { Button }              from '../ui/Button';

const meta: Meta<typeof TopBar> = {
  title:     'Layout/TopBar',
  component: TopBar,
  decorators: [(Story) => <View style={{ width: 390 }}><Story /></View>],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  args: { title: 'My Pantry' },
};

export const WithSubtitle: Story = {
  args: { title: 'My Pantry', subtitle: '14 items · 2 expiring' },
};

export const WithLeadingAndTrailing: Story = {
  args: {
    title:    'Settings',
    leading:  <Button label="Back" variant="text" onPress={() => {}} fullWidth={false} size="sm" />,
    trailing: <Avatar initials="AB" size={32} />,
  },
};

export const PantryHome: Story = {
  args: {
    title:    'My Pantry',
    subtitle: '14 items · 2 expiring',
    trailing: <Avatar initials="AB" size={36} />,
  },
};
