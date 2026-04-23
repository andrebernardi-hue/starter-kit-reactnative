import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { ExpiryBadge }         from './ExpiryBadge';
import { spacing }             from '../../tokens';
import { PantryItem }          from '../../types/pantry';

const base: Omit<PantryItem, 'expiry'> = {
  id: '1', name: 'Feta cheese', category: 'fridge',
  qty: 200, unit: 'g', dateAdded: new Date(), userId: 'u1',
};

const daysFromNow = (n: number) => {
  const d = new Date(); d.setDate(d.getDate() + n); return d;
};

const meta: Meta<typeof ExpiryBadge> = {
  title:     'UI/ExpiryBadge',
  component: ExpiryBadge,
};

export default meta;
type Story = StoryObj<typeof ExpiryBadge>;

export const Expired:     Story = { args: { item: { ...base, expiry: daysFromNow(-2) } } };
export const ExpiresSoon: Story = { args: { item: { ...base, expiry: daysFromNow(2)  } } };
export const ExpiresWarn: Story = { args: { item: { ...base, expiry: daysFromNow(5)  } } };
export const Ok:          Story = { args: { item: { ...base, expiry: daysFromNow(14) } } };

export const AllStates: Story = {
  render: () => (
    <View style={styles.stack}>
      <ExpiryBadge item={{ ...base, expiry: daysFromNow(-1) }} />
      <ExpiryBadge item={{ ...base, expiry: daysFromNow(2)  }} />
      <ExpiryBadge item={{ ...base, expiry: daysFromNow(5)  }} />
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: { gap: spacing.nano, alignItems: 'flex-start' },
});
