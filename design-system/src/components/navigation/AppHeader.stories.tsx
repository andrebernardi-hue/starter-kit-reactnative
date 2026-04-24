import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView } from 'react-native';
import { AppHeader }  from './AppHeader';
import { colors, spacing, textStyles } from '../../tokens';

const meta: Meta<typeof AppHeader> = {
  title:     'Navigation/AppHeader',
  component: AppHeader,
  decorators: [(Story) => (
    <View style={{ width: 375, borderWidth: 1, borderColor: colors.border, borderRadius: 12, overflow: 'hidden' }}>
      <Story />
    </View>
  )],
};
export default meta;
type Story = StoryObj<typeof AppHeader>;

// ── Large title (root screen) ─────────────────────────────────────────────────
export const LargeTitle: Story = {
  name: 'Large Title (root screen)',
  render: () => (
    <AppHeader
      title="My Pantry"
      subtitle="24 items · 3 expiring soon"
      variant="large"
      actions={[
        { icon: 'search',  onPress: () => {}, accessibilityLabel: 'Search'      },
        { icon: 'plus',    onPress: () => {}, accessibilityLabel: 'Add item'    },
      ]}
    />
  ),
};

// ── Compact (pushed screen) ───────────────────────────────────────────────────
export const Compact: Story = {
  name: 'Compact (pushed screen)',
  render: () => (
    <AppHeader
      title="Recipe Details"
      variant="compact"
      onBack={() => {}}
      actions={[
        { icon: 'heart',   onPress: () => {}, accessibilityLabel: 'Favourite'   },
        { icon: 'pencil',  onPress: () => {}, accessibilityLabel: 'Edit'        },
      ]}
    />
  ),
};

// ── Compact — no back, no actions ─────────────────────────────────────────────
export const CompactMinimal: Story = {
  name: 'Compact – minimal',
  render: () => (
    <AppHeader title="Notifications" variant="compact" />
  ),
};

// ── Large + back ──────────────────────────────────────────────────────────────
export const LargeWithBack: Story = {
  name: 'Large + back button',
  render: () => (
    <AppHeader
      title="Filter Recipes"
      variant="large"
      onBack={() => {}}
      actions={[{ icon: 'x', onPress: () => {}, accessibilityLabel: 'Clear all' }]}
    />
  ),
};

// ── Transparent (over image) ──────────────────────────────────────────────────
export const Transparent: Story = {
  name: 'Transparent (over image)',
  render: () => (
    <View style={{ width: 375, height: 200, backgroundColor: '#2E7D32', borderRadius: 12, overflow: 'hidden' }}>
      <AppHeader
        title="Summer Salads"
        variant="compact"
        onBack={() => {}}
        transparent
        actions={[{ icon: 'heart', onPress: () => {}, accessibilityLabel: 'Favourite' }]}
        style={{ borderBottomWidth: 0 }}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...textStyles.bodySm, color: '#C8E6C9' }}>Background content</Text>
      </View>
    </View>
  ),
};

// ── All variants stacked ──────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <View style={{ gap: spacing.nano, padding: spacing.nano, backgroundColor: colors.bgSubtle }}>
      <AppHeader
        title="My Pantry"
        subtitle="24 items"
        variant="large"
        actions={[
          { icon: 'search', onPress: () => {}, accessibilityLabel: 'Search' },
          { icon: 'plus',   onPress: () => {}, accessibilityLabel: 'Add'   },
        ]}
      />
      <AppHeader
        title="Recipe Details"
        variant="compact"
        onBack={() => {}}
        actions={[
          { icon: 'heart',  onPress: () => {}, accessibilityLabel: 'Favourite' },
          { icon: 'pencil', onPress: () => {}, accessibilityLabel: 'Edit'      },
        ]}
      />
      <AppHeader
        title="Settings"
        variant="compact"
        onBack={() => {}}
      />
    </View>
  ),
};
