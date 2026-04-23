import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { Avatar }              from './Avatar';
import { spacing }             from '../../tokens';

const meta: Meta<typeof Avatar> = {
  title:     'UI/Avatar',
  component: Avatar,
  args:      { initials: 'AB', size: 36 },
  argTypes: {
    size: { control: 'range', min: 28, max: 72, step: 4 },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      {[28, 36, 44, 56, 72].map((s) => (
        <Avatar key={s} initials="AB" size={s} />
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.nano, alignItems: 'flex-end' },
});
