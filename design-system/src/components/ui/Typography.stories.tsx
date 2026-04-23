import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { Typography }          from './Typography';
import { spacing }             from '../../tokens';

const meta: Meta<typeof Typography> = {
  title:     'UI/Typography',
  component: Typography,
  args:      { children: 'The quick brown fox' },
  argTypes: {
    role: {
      control: 'select',
      options: [
        'display','h1','h2','h3','h4','h5',
        'body','bodyLg','bodySm',
        'caption','labelLg','labelSm','eyebrow','topBarTitle',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {};

export const TypeScale: Story = {
  render: () => (
    <View style={styles.stack}>
      <Typography role="h1">H1 · Magic Pantry</Typography>
      <Typography role="h2">H2 · My Pantry</Typography>
      <Typography role="h3">H3 · Fresh Produce</Typography>
      <Typography role="h4">H4 · Avocado</Typography>
      <Typography role="h5">H5 · Expires soon</Typography>
      <Typography role="eyebrow">Eyebrow · Categories</Typography>
      <Typography role="bodyLg">Body Large — Discover what you can make tonight using what's already in your kitchen.</Typography>
      <Typography role="body">Body — Greek yogurt, baby spinach, cherry tomatoes, lemon, garlic.</Typography>
      <Typography role="bodySm">Body Small — 3 items expiring this week</Typography>
      <Typography role="caption">Caption · 14 items · 2 expiring</Typography>
      <Typography role="labelLg">Label Large</Typography>
      <Typography role="labelSm">Label Small</Typography>
    </View>
  ),
};

export const TopBarTitle: Story = {
  args: { role: 'topBarTitle', children: 'My Pantry' },
};

export const EyebrowRole: Story = {
  args: { role: 'eyebrow', children: 'Fresh Produce' },
};

const styles = StyleSheet.create({
  stack: { gap: spacing.nano, maxWidth: 360 },
});
