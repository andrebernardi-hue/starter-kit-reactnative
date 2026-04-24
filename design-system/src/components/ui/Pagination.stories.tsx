import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Pagination } from './Pagination';
import { Button }     from './Button';
import { colors, spacing, textStyles } from '../../tokens';

const meta: Meta<typeof Pagination> = {
  title:     'UI/Pagination',
  component: Pagination,
  decorators: [(Story) => (
    <View style={{ padding: spacing.xxxs, alignItems: 'center', gap: spacing.nano }}>
      <Story />
    </View>
  )],
  args: {
    total:   5,
    current: 0,
    variant: 'dots',
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

// ── Static (controls) ────────────────────────────────────────────────────────
export const Default: Story = {};

// ── Dots — interactive ────────────────────────────────────────────────────────
export const DotsInteractive: Story = {
  name: 'Dots – tappable',
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <View style={{ alignItems: 'center', gap: spacing.nano }}>
        <Text style={{ ...textStyles.bodySm, color: colors.fg3 }}>
          Page {page + 1} of 5
        </Text>
        <Pagination total={5} current={page} variant="dots" onChange={setPage} />
        <View style={{ flexDirection: 'row', gap: spacing.nano }}>
          <Button
            label="← Prev"
            size="sm"
            variant="text"
            onPress={() => setPage((p) => Math.max(0, p - 1))}
          />
          <Button
            label="Next →"
            size="sm"
            onPress={() => setPage((p) => Math.min(4, p + 1))}
          />
        </View>
      </View>
    );
  },
};

// ── Pills — interactive ───────────────────────────────────────────────────────
export const PillsInteractive: Story = {
  name: 'Pills – tappable',
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <View style={{ alignItems: 'center', gap: spacing.nano }}>
        <Text style={{ ...textStyles.bodySm, color: colors.fg3 }}>
          Page {page + 1} of 5
        </Text>
        <Pagination total={5} current={page} variant="pills" onChange={setPage} />
        <View style={{ flexDirection: 'row', gap: spacing.nano }}>
          <Button
            label="← Prev"
            size="sm"
            variant="text"
            onPress={() => setPage((p) => Math.max(0, p - 1))}
          />
          <Button
            label="Next →"
            size="sm"
            onPress={() => setPage((p) => Math.min(4, p + 1))}
          />
        </View>
      </View>
    );
  },
};

// ── Onboarding simulation ─────────────────────────────────────────────────────
export const OnboardingFlow: Story = {
  name: 'Onboarding simulation',
  render: () => {
    const [page, setPage] = useState(0);
    const screens = [
      { title: 'Track your pantry',     color: colors.primary.light   },
      { title: 'Discover recipes',      color: '#E8F5E3'              },
      { title: 'Reduce food waste',     color: '#FFF3E3'              },
      { title: 'Smart shopping lists',  color: '#E8F2FE'              },
    ];
    const s = screens[page];
    return (
      <View style={{ alignItems: 'center', gap: spacing.nano }}>
        {/* Mock screen card */}
        <View
          style={{
            width:          280,
            height:         160,
            borderRadius:   12,
            backgroundColor: s.color,
            alignItems:     'center',
            justifyContent: 'center',
            borderWidth:    1,
            borderColor:    colors.border,
          }}
        >
          <Text style={{ ...textStyles.h5, color: colors.fg1 }}>{s.title}</Text>
        </View>

        <Pagination
          total={screens.length}
          current={page}
          variant="pills"
        />

        <View style={{ flexDirection: 'row', gap: spacing.nano }}>
          {page < screens.length - 1 ? (
            <Button label="Next" size="sm" onPress={() => setPage((p) => p + 1)} />
          ) : (
            <Button label="Get started" size="sm" onPress={() => setPage(0)} />
          )}
        </View>
      </View>
    );
  },
};

// ── Custom colours ────────────────────────────────────────────────────────────
export const CustomColors: Story = {
  name: 'Custom colours',
  render: () => (
    <View style={{ gap: spacing.nano, alignItems: 'center' }}>
      <Pagination total={4} current={1} variant="pills"
        activeColor={colors.warning.medium}  inactiveColor={colors.warning.light} />
      <Pagination total={4} current={2} variant="dots"
        activeColor={colors.error.medium}    inactiveColor={colors.error.light}   />
      <Pagination total={4} current={0} variant="pills"
        activeColor={colors.success.medium}  inactiveColor={colors.success.light} />
    </View>
  ),
};
