import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Toast, ToastVariant } from './Toast';
import { spacing } from '../../tokens';

const meta: Meta<typeof Toast> = {
  title:     'UI/Toast',
  component: Toast,
  args: { message: 'Item added to pantry', variant: 'default', visible: true },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {};
export const Success: Story = { args: { message: 'Recipe cooked — well done!', variant: 'success' } };
export const Warning: Story = { args: { message: '3 items expire this week',   variant: 'warning' } };
export const Error:   Story = { args: { message: 'Could not save changes',      variant: 'error'   } };

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: spacing.nano, width: 320 }}>
      {(['default', 'success', 'warning', 'error'] as ToastVariant[]).map((v) => (
        <Toast key={v} variant={v} message={`This is a ${v} notification`} />
      ))}
    </View>
  ),
};
