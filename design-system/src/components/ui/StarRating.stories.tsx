import React, { useState }     from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet }    from 'react-native';
import { StarRating }          from './StarRating';
import { Typography }          from './Typography';
import { spacing }             from '../../tokens';

const meta: Meta<typeof StarRating> = {
  title:     'UI/StarRating',
  component: StarRating,
  args:      { value: 3, readOnly: false, size: 24 },
  argTypes: {
    value:    { control: 'range', min: 0, max: 5, step: 1 },
    size:     { control: 'range', min: 12, max: 40, step: 2 },
    readOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Default: Story = {};

export const Interactive: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    return (
      <View style={styles.stack}>
        <StarRating value={rating} onChange={setRating} size={32} />
        <Typography role="bodySm" color="#666">{rating ? `${rating} stars` : 'Tap to rate'}</Typography>
      </View>
    );
  },
};

export const ReadOnly: Story = { args: { value: 4, readOnly: true } };

const styles = StyleSheet.create({
  stack: { alignItems: 'center', gap: spacing.nano },
});
