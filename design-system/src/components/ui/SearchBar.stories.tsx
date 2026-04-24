import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SearchBar } from './SearchBar';
import { colors, spacing } from '../../tokens';

const meta: Meta<typeof SearchBar> = {
  title:     'UI/SearchBar',
  component: SearchBar,
  args: { value: '', placeholder: 'Search pantry...' },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: spacing.xxxs, backgroundColor: colors.bg }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Empty:    Story = { args: { value: '' } };
export const WithText: Story = { args: { value: 'Chicken' } };
export const Loading:  Story = { args: { value: 'chicken', loading: true } };
export const Disabled: Story = { args: { value: '', disabled: true } };
export const NoCancel: Story = { args: { value: '', showCancel: false } };

export const Interactive: Story = {
  render: (args) => {
    const [text, setText] = useState('');
    return (
      <SearchBar
        {...args}
        value={text}
        onChangeText={setText}
        onClear={() => setText('')}
        onCancel={() => setText('')}
      />
    );
  },
};
