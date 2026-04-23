import React, { useState }     from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { Input, Field }        from './Input';
import { spacing }             from '../../tokens';

const meta: Meta<typeof Input> = {
  title:     'UI/Input',
  component: Input,
  decorators: [
    (Story) => <View style={{ width: 320 }}><Story /></View>,
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState('');
    return <Input value={v} onChangeText={setV} placeholder="Item name" />;
  },
};

export const WithField: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [qty,  setQty]  = useState('');
    return (
      <View style={styles.stack}>
        <Field label="Item name" required>
          <Input value={name} onChangeText={setName} placeholder="e.g. Baby spinach" />
        </Field>
        <Field label="Quantity" hint="Enter the amount you have">
          <Input value={qty} onChangeText={setQty} placeholder="0" keyboardType="numeric" />
        </Field>
      </View>
    );
  },
};

const styles = StyleSheet.create({ stack: { gap: spacing.xxxs } });
