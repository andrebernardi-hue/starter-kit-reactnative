import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { BottomTabBar } from './BottomTabBar';
import { colors, spacing, textStyles } from '../../tokens';
import type { TabItem } from './BottomTabBar';

// ── Demo tabs used across stories ─────────────────────────────────────────────
const APP_TABS: TabItem[] = [
  { key: 'pantry',   label: 'Pantry',   icon: 'shelf'    },
  { key: 'recipes',  label: 'Recipes',  icon: 'chef'     },
  { key: 'shopping', label: 'Shopping', icon: 'shopping' },
  { key: 'profile',  label: 'Profile',  icon: 'user'     },
];

// ── Decorator: phone-frame placeholder ───────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        width:           375,
        height:          320,
        backgroundColor: colors.bgSubtle,
        borderRadius:    16,
        overflow:        'hidden',
        justifyContent:  'flex-end',
        borderWidth:     1,
        borderColor:     colors.border,
      }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...textStyles.bodySm, color: colors.fg3 }}>
          App content area
        </Text>
      </View>
      {children}
    </View>
  );
}

const meta: Meta<typeof BottomTabBar> = {
  title:     'Navigation/BottomTabBar',
  component: BottomTabBar,
  decorators: [(Story) => (
    <View style={{ padding: spacing.xxxs }}>
      <Story />
    </View>
  )],
};
export default meta;
type Story = StoryObj<typeof BottomTabBar>;

// ── Interactive (stateful) ────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default (interactive)',
  render: () => {
    const [active, setActive] = useState('pantry');
    return (
      <PhoneFrame>
        <BottomTabBar tabs={APP_TABS} activeKey={active} onChange={setActive} />
      </PhoneFrame>
    );
  },
};

// ── Floating variant ─────────────────────────────────────────────────────────
export const Floating: Story = {
  name: 'Floating (iOS 26 shelf)',
  render: () => {
    const [active, setActive] = useState('recipes');
    return (
      <View
        style={{
          width:           375,
          height:          320,
          backgroundColor: '#C8E6C9',
          borderRadius:    16,
          overflow:        'hidden',
          justifyContent:  'flex-end',
          borderWidth:     1,
          borderColor:     colors.border,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...textStyles.bodySm, color: '#2E7D32' }}>
            App content area
          </Text>
        </View>
        <BottomTabBar
          tabs={APP_TABS}
          activeKey={active}
          onChange={setActive}
          floating
        />
      </View>
    );
  },
};

// ── With badges ───────────────────────────────────────────────────────────────
export const WithBadges: Story = {
  render: () => {
    const [active, setActive] = useState('pantry');
    const tabs: TabItem[] = [
      { key: 'pantry',   label: 'Pantry',   icon: 'shelf',    badge: 3   },
      { key: 'recipes',  label: 'Recipes',  icon: 'chef'                 },
      { key: 'shopping', label: 'Shopping', icon: 'shopping', badge: 12  },
      { key: 'profile',  label: 'Profile',  icon: 'user'                 },
    ];
    return (
      <PhoneFrame>
        <BottomTabBar tabs={tabs} activeKey={active} onChange={setActive} />
      </PhoneFrame>
    );
  },
};

// ── 3 tabs ────────────────────────────────────────────────────────────────────
export const ThreeTabs: Story = {
  render: () => {
    const [active, setActive] = useState('recipes');
    return (
      <PhoneFrame>
        <BottomTabBar
          tabs={APP_TABS.slice(0, 3)}
          activeKey={active}
          onChange={setActive}
        />
      </PhoneFrame>
    );
  },
};
