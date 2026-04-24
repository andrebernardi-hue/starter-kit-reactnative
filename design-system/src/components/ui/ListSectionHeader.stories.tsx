import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ListSectionHeader } from './ListSectionHeader';
import { ListItem } from './ListItem';
import { colors } from '../../tokens';

const meta: Meta<typeof ListSectionHeader> = {
  title:     'UI/ListSectionHeader',
  component: ListSectionHeader,
  args: { label: 'Fridge', topSpacing: true },
  decorators: [
    (Story) => (
      <View style={{ width: 360, backgroundColor: colors.bg }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ListSectionHeader>;

export const Default:         Story = {};
export const NoTopSpacing:    Story = { args: { topSpacing: false } };

export const WithList: Story = {
  render: () => (
    <View style={{ width: 360, backgroundColor: colors.bg }}>
      <ListSectionHeader label="Fridge" />
      <ListItem title="Chicken breast" subtitle="Expires in 2 days" showDivider />
      <ListItem title="Greek yogurt" subtitle="Expires in 4 days" showDivider />
      <ListSectionHeader label="Pantry" />
      <ListItem title="Olive oil" subtitle="500ml" showDivider />
      <ListItem title="Brown rice" subtitle="1kg" />
    </View>
  ),
};
