import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text, View } from 'react-native';
import { WheelPicker } from './WheelPicker';
import { colors, spacing, textStyles } from '../../tokens';

const HOURS   = Array.from({ length: 24 }, (_, i) => ({ label: String(i).padStart(2, '0'), value: i }));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({ label: String(i).padStart(2, '0'), value: i }));
const MONTHS  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(
  (m, i) => ({ label: m, value: i + 1 }),
);
const DAYS    = Array.from({ length: 31 }, (_, i) => ({ label: String(i + 1), value: i + 1 }));
const YEARS   = Array.from({ length: 10 }, (_, i) => ({ label: String(2020 + i), value: 2020 + i }));

const meta: Meta<typeof WheelPicker> = {
  title:     'UI/WheelPicker',
  component: WheelPicker,
  decorators: [
    (Story) => (
      <View style={{ padding: spacing.xxxs, backgroundColor: colors.bg }}>
        <Story />
      </View>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof WheelPicker>;

export const TimePicker: Story = {
  render: () => {
    const [values, setValues] = useState([9, 30]);
    return (
      <View style={{ alignItems: 'center', gap: spacing.nano }}>
        <WheelPicker
          columns={[
            { items: HOURS,   width: 72 },
            { items: MINUTES, width: 72 },
          ]}
          values={values}
          onChange={setValues}
          visibleRows={5}
        />
        <Text style={{ ...textStyles.bodySm, color: colors.fg3 }}>
          Selected: {String(values[0]).padStart(2,'0')}:{String(values[1]).padStart(2,'0')}
        </Text>
      </View>
    );
  },
};

export const DatePicker: Story = {
  render: () => {
    const [values, setValues] = useState([1, 4, 2024]);
    return (
      <View style={{ alignItems: 'center', gap: spacing.nano }}>
        <WheelPicker
          columns={[
            { items: DAYS,   width: 60 },
            { items: MONTHS, width: 80 },
            { items: YEARS,  width: 80 },
          ]}
          values={values}
          onChange={setValues}
          visibleRows={5}
        />
        <Text style={{ ...textStyles.bodySm, color: colors.fg3 }}>
          Selected: {MONTHS[values[1]-1]?.label} {values[0]}, {values[2]}
        </Text>
      </View>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <WheelPicker
      columns={[
        { items: HOURS,   width: 72 },
        { items: MINUTES, width: 72 },
      ]}
      values={[9, 0]}
      onChange={() => {}}
      disabled
    />
  ),
};
