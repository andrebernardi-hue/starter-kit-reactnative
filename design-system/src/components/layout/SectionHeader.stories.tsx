import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View }                from 'react-native';
import { SectionHeader }       from './SectionHeader';
import { ListItem }            from '../ui/ListItem';

const meta: Meta<typeof SectionHeader> = {
  title:     'Layout/SectionHeader',
  component: SectionHeader,
  args:      { children: 'Fresh Produce' },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {};

export const WithContent: Story = {
  render: () => (
    <View style={{ width: 360 }}>
      <SectionHeader>Fresh Produce</SectionHeader>
      <ListItem title="Avocado"      subtitle="2 pcs · Expires in 1d" onPress={() => {}} />
      <ListItem title="Baby spinach" subtitle="200g · Expires in 3d"  onPress={() => {}} />
      <SectionHeader>Fridge</SectionHeader>
      <ListItem title="Greek yogurt" subtitle="500ml · Expires in 5d" onPress={() => {}} />
    </View>
  ),
};
