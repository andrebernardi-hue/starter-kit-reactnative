import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Text, View } from 'react-native';
import { BottomDrawer } from './BottomDrawer';
import { colors, spacing, textStyles } from '../../tokens';

const meta: Meta<typeof BottomDrawer> = {
  title:     'UI/BottomDrawer',
  component: BottomDrawer,
  args: {
    visible:         false,
    title:           'Add Item',
    snap:            'half',
    showHandle:      true,
    closeOnBackdrop: true,
  },
};
export default meta;
type Story = StoryObj<typeof BottomDrawer>;

export const Half: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <View style={{ padding: spacing.xxxs }}>
        <Button label="Open Drawer (half)" onPress={() => setOpen(true)} />
        <BottomDrawer {...args} visible={open} onClose={() => setOpen(false)} snap="half" title="Half Drawer">
          <View style={{ padding: spacing.xxxs }}>
            <Text style={{ ...textStyles.body, color: colors.fg1 }}>Drawer content goes here.</Text>
          </View>
        </BottomDrawer>
      </View>
    );
  },
};

export const Full: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <View style={{ padding: spacing.xxxs }}>
        <Button label="Open Drawer (full)" onPress={() => setOpen(true)} />
        <BottomDrawer {...args} visible={open} onClose={() => setOpen(false)} snap="full" title="Full Drawer">
          <View style={{ padding: spacing.xxxs }}>
            <Text style={{ ...textStyles.body, color: colors.fg1 }}>Full-height drawer content.</Text>
          </View>
        </BottomDrawer>
      </View>
    );
  },
};

export const NoHandle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <View style={{ padding: spacing.xxxs }}>
        <Button label="No Handle Drawer" onPress={() => setOpen(true)} />
        <BottomDrawer visible={open} onClose={() => setOpen(false)} showHandle={false} title="No Handle">
          <View style={{ padding: spacing.xxxs }}>
            <Text style={{ ...textStyles.body, color: colors.fg1 }}>No handle bar.</Text>
          </View>
        </BottomDrawer>
      </View>
    );
  },
};
