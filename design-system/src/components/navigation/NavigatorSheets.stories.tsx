import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { ModalSheet, FormSheet } from './NavigatorSheets';
import { Button }   from '../ui/Button';
import { Field, Input } from '../ui/Input';
import { Toggle }   from '../ui/Toggle';
import { colors, spacing, textStyles } from '../../tokens';

const meta: Meta = {
  title:     'Navigation/Sheets',
  decorators: [(Story) => (
    <View style={{ padding: spacing.xxxs, alignItems: 'center', minHeight: 180, justifyContent: 'center' }}>
      <Story />
    </View>
  )],
};
export default meta;
type Story = StoryObj;

// ── ModalSheet ────────────────────────────────────────────────────────────────
export const ModalSheetStory: Story = {
  name: 'ModalSheet — full-height',
  render: () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    return (
      <>
        <Button label="Open Modal Sheet" onPress={() => setOpen(true)} />
        <ModalSheet
          visible={open}
          onClose={() => setOpen(false)}
          title="Add Item"
        >
          <Field label="Item name" required>
            <Input value={text} onChangeText={setText} placeholder="e.g. Almond milk" />
          </Field>
          <View style={{ height: spacing.nano }} />
          <Field label="Category">
            <Input value="" onChangeText={() => {}} placeholder="e.g. Fridge" />
          </Field>
          <View style={{ height: spacing.xxxs }} />
          <Button label="Save item" onPress={() => setOpen(false)} />
        </ModalSheet>
      </>
    );
  },
};

export const ModalSheetLarge: Story = {
  name: 'ModalSheet — large (75 %)',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button label="Open Large Sheet" variant="outline" onPress={() => setOpen(true)} />
        <ModalSheet
          visible={open}
          onClose={() => setOpen(false)}
          title="Filter Recipes"
          size="large"
        >
          <Toggle label="Vegetarian only"   value={false} onValueChange={() => {}} />
          <View style={{ height: spacing.nano }} />
          <Toggle label="Under 30 minutes"  value={true}  onValueChange={() => {}} />
          <View style={{ height: spacing.nano }} />
          <Toggle label="5 ingredients max" value={false} onValueChange={() => {}} />
          <View style={{ height: spacing.xxxs }} />
          <Button label="Apply filters" onPress={() => setOpen(false)} />
        </ModalSheet>
      </>
    );
  },
};

// ── FormSheet ─────────────────────────────────────────────────────────────────
export const FormSheetStory: Story = {
  name: 'FormSheet — compact card',
  render: () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    return (
      <>
        <Button label="Open Form Sheet" onPress={() => setOpen(true)} />
        <FormSheet
          visible={open}
          onClose={() => setOpen(false)}
          title="Rename item"
          subtitle="Give this pantry item a clearer name."
        >
          <Field label="New name" required>
            <Input value={text} onChangeText={setText} placeholder="e.g. Oat milk (carton)" />
          </Field>
          <View style={{ height: spacing.nano }} />
          <Button label="Rename" onPress={() => setOpen(false)} />
        </FormSheet>
      </>
    );
  },
};

export const FormSheetDestructive: Story = {
  name: 'FormSheet — destructive confirmation',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button label="Delete Item" variant="text" onPress={() => setOpen(true)} />
        <FormSheet
          visible={open}
          onClose={() => setOpen(false)}
          title="Delete item?"
          subtitle="This will permanently remove Oat milk from your pantry."
        >
          <View style={{ gap: spacing.nano }}>
            <Button label="Delete permanently" variant="primary" onPress={() => setOpen(false)} />
            <Button label="Cancel"             variant="text"   onPress={() => setOpen(false)} />
          </View>
        </FormSheet>
      </>
    );
  },
};
