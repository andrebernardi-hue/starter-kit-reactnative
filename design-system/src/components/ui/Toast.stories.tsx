import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Toast, ToastVariant } from './Toast';
import { spacing } from '../../tokens';

const meta: Meta<typeof Toast> = {
  title:     'UI/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <View style={{ padding: spacing.xxxs, maxWidth: 360, width: '100%' }}>
        <Story />
      </View>
    ),
  ],
  args: {
    title:   'Item added',
    message: 'Almond milk saved to Fridge.',
    variant: 'default',
    visible: true,
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

// ── Single variant stories ────────────────────────────────────────────────────
export const Default: Story = {};

export const Success: Story = {
  args: {
    title:   'Recipe cooked',
    message: 'Great job — marked as cooked today.',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    title:   'Expiring soon',
    message: '3 items expire within the next 3 days.',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    title:   'Sync failed',
    message: 'Check your connection and try again.',
    variant: 'error',
  },
};

export const MessageOnly: Story = {
  name: 'Message Only (no title)',
  args: {
    title:   undefined,
    message: 'Changes saved successfully.',
    variant: 'success',
  },
};

// ── All variants at once ──────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <View style={{ gap: spacing.nano, width: 320 }}>
      <Toast variant="default" title="Info"         message="Item added to pantry." />
      <Toast variant="success" title="Recipe cooked" message="Marked as cooked today." />
      <Toast variant="warning" title="Expiring soon" message="3 items expire this week." />
      <Toast variant="error"   title="Sync failed"   message="Check your connection." />
    </View>
  ),
};
