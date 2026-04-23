import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, IconName } from './Icon';
import { colors, spacing, fontFamilies, fontSizes } from '../../tokens';

const ALL_ICONS: IconName[] = [
  'shelf','clock','plus','minus','x','check',
  'chevron-right','chevron-left','chevron-down',
  'arrow-left','arrow-right','search','settings',
  'pencil','trash','star','star-filled',
  'heart','heart-filled','alert','info','clock-small',
  'flame','chef','filter','user','logout','shopping',
  'cat-freezer','cat-fridge','cat-produce','cat-dry',
  'cat-canned','cat-spices','cat-oils','cat-bakery',
  'spoon','sparkle','spoon-sparkle',
];

const meta: Meta<typeof Icon> = {
  title:     'Icons/Icon',
  component: Icon,
  args: { size: 24, color: colors.fg1 },
  argTypes: {
    name:  { control: 'select', options: ALL_ICONS },
    size:  { control: { type: 'range', min: 16, max: 64, step: 4 } },
    color: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Single: Story = { args: { name: 'sparkle' } };

export const AllIcons: Story = {
  render: (args) => (
    <View style={styles.grid}>
      {ALL_ICONS.map((name) => (
        <View key={name} style={styles.cell}>
          <Icon {...args} name={name} />
          <Text style={styles.label}>{name}</Text>
        </View>
      ))}
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      {[16, 20, 24, 32, 40, 48].map((s) => (
        <View key={s} style={styles.cell}>
          <Icon name="spoon-sparkle" size={s} color={colors.primary.pure} />
          <Text style={styles.label}>{s}</Text>
        </View>
      ))}
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={styles.row}>
      {[colors.fg1, colors.primary.pure, colors.warning.medium, colors.error.medium, colors.success.medium].map((c) => (
        <Icon key={c} name="spoon-sparkle" size={32} color={c} />
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  grid:  { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxxs, maxWidth: 800 },
  row:   { flexDirection: 'row', gap: spacing.xxs, alignItems: 'center' },
  cell:  { alignItems: 'center', gap: 6, width: 80 },
  label: { fontFamily: fontFamilies.mono, fontSize: 10, color: colors.fg4, textAlign: 'center' },
});
