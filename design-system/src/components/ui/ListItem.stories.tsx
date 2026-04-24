import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { ListItem } from './ListItem';
import { colors } from '../../tokens';

const meta: Meta<typeof ListItem> = {
  title:     'UI/ListItem',
  component: ListItem,
  args: { title: 'Chicken breast', subtitle: 'Expires in 2 days', showDivider: true },
  decorators: [
    (Story) => (
      <View style={{ width: 360, backgroundColor: colors.bg }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default:    Story = {};
export const NoSubtitle: Story = { args: { subtitle: undefined } };
export const NoDivider:  Story = { args: { showDivider: false } };
export const Disabled:   Story = { args: { disabled: true } };

export const WithSlots: Story = {
  args: {
    title:     'Pantry item',
    subtitle:  '500g • Fridge',
    leftSlot: (
      <View
        style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.primary.light }}
      />
    ),
    rightSlot: <Text style={{ color: colors.fg4 }}>›</Text>,
  },
};

export const WithIcon: Story = {
  args: {
    title:    'Chicken breast',
    subtitle: 'Fridge • Expires in 2 days',
    icon:     <View style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: colors.primary.pure }} />,
    showChevron: true,
  },
};

export const WithChevron: Story = {
  args: { title: 'Settings', showChevron: true },
};

export const List: Story = {
  render: () => (
    <View style={{ width: 360, backgroundColor: colors.bg }}>
      {['Chicken breast', 'Brown rice', 'Olive oil', 'Garlic'].map((name, i) => (
        <ListItem
          key={name}
          title={name}
          subtitle={`Expires in ${i + 1} day${i !== 0 ? 's' : ''}`}
          onPress={() => {}}
          rightSlot={<Text style={{ color: colors.fg4 }}>›</Text>}
        />
      ))}
    </View>
  ),
};
