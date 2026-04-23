import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { Button }              from './Button';
import { spacing }             from '../../tokens';

const meta: Meta<typeof Button> = {
  title:     'UI/Button',
  component: Button,
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'outline', 'danger', 'text'] },
    size:     { control: 'select', options: ['lg', 'sm'] },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
  },
  args: {
    label:     'Find Recipes',
    onPress:   () => {},
    variant:   'primary',
    size:      'lg',
    disabled:  false,
    loading:   false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary:     Story = {};
export const Outline:     Story = { args: { variant: 'outline', label: 'Adjust Filters' } };
export const Danger:      Story = { args: { variant: 'danger',  label: 'Delete Account' } };
export const TextVariant: Story = { args: { variant: 'text',   label: 'Skip for now'   } };
export const Loading:     Story = { args: { loading: true } };
export const Disabled:    Story = { args: { disabled: true } };
export const SmallSize:   Story = { args: { size: 'sm', label: 'Add item' } };

export const AllVariants: Story = {
  render: () => (
    <View style={styles.stack}>
      <Button label="Primary"  variant="primary"  onPress={() => {}} fullWidth={false} />
      <Button label="Outline"  variant="outline"  onPress={() => {}} fullWidth={false} />
      <Button label="Danger"   variant="danger"   onPress={() => {}} fullWidth={false} />
      <Button label="Text"     variant="text"     onPress={() => {}} fullWidth={false} />
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: { gap: spacing.nano, alignItems: 'flex-start' },
});
