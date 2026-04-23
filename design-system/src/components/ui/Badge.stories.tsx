import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { Badge }               from './Badge';
import { spacing }             from '../../tokens';

const meta: Meta<typeof Badge> = {
  title:     'UI/Badge',
  component: Badge,
  args:      { label: 'Expires soon', variant: 'warning', size: 'sm' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'error'] },
    size:    { control: 'select', options: ['sm', 'xs'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Primary: Story = { args: { label: 'Matched',       variant: 'primary' } };
export const Success: Story = { args: { label: 'Cooked!',        variant: 'success' } };
export const Warning: Story = { args: { label: 'Expires in 5d', variant: 'warning' } };
export const Error:   Story = { args: { label: 'Expired',        variant: 'error'   } };

export const AllVariants: Story = {
  render: () => (
    <View style={styles.row}>
      <Badge label="Default"       variant="default" />
      <Badge label="Primary"       variant="primary" />
      <Badge label="Expires in 5d" variant="warning" />
      <Badge label="Expired"       variant="error"   />
      <Badge label="Cooked!"       variant="success" />
    </View>
  ),
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.nano },
});
