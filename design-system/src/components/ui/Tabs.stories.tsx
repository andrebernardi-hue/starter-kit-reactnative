import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from './Tabs';
import { colors, textStyles, spacing } from '../../tokens';

const TABS = [
  { key: 'all',       label: 'All'       },
  { key: 'favorites', label: 'Favorites' },
  { key: 'history',   label: 'History'   },
];

const meta: Meta<typeof Tabs> = {
  title:     'UI/Tabs',
  component: Tabs,
  args: { tabs: TABS, activeKey: 'all' },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = { args: { activeKey: 'all' } };

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = useState('all');
    return (
      <View style={{ width: 360 }}>
        <Tabs {...args} activeKey={active} onChange={setActive} />
        <Text style={styles.content}>Tab: {active}</Text>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  content: { ...textStyles.body, color: colors.fg3, padding: spacing.xxxs },
});
