import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontFamilies, fontWeights } from '../../tokens';

const meta: Meta = {
  title: 'Design System/Colors',
};
export default meta;
type Story = StoryObj;

function Swatch({ name, value }: { name: string; value: string }) {
  const light = isLightColor(value);
  return (
    <View style={[styles.swatch, { backgroundColor: value }]}>
      <Text style={[styles.swatchLabel, { color: light ? '#071412' : '#FFFFFF' }]}>{name}</Text>
      <Text style={[styles.swatchValue, { color: light ? '#666' : 'rgba(255,255,255,0.7)' }]}>{value}</Text>
    </View>
  );
}

function Group({ title, swatches }: { title: string; swatches: { name: string; value: string }[] }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.swatches}>
        {swatches.map((s) => <Swatch key={s.name} {...s} />)}
      </View>
    </View>
  );
}

export const Palette: Story = {
  render: () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Group title="Primary" swatches={[
        { name: 'pure',       value: colors.primary.pure       },
        { name: 'extraLight', value: colors.primary.extraLight },
        { name: 'light',      value: colors.primary.light      },
        { name: 'medium',     value: colors.primary.medium     },
        { name: 'dark',       value: colors.primary.dark       },
      ]} />
      <Group title="Secondary" swatches={[
        { name: 'extraLight', value: colors.secondary.extraLight },
        { name: 'light',      value: colors.secondary.light      },
        { name: 'medium',     value: colors.secondary.medium     },
        { name: 'dark',       value: colors.secondary.dark       },
      ]} />
      <Group title="Feedback" swatches={[
        { name: 'success', value: colors.success.medium },
        { name: 'warning', value: colors.warning.medium },
        { name: 'error',   value: colors.error.medium   },
      ]} />
      <Group title="Neutrals" swatches={[
        { name: 'nearBlack',  value: colors.nearBlack               },
        { name: 'lowDark',    value: colors.neutral.lowDark         },
        { name: 'lowMedium',  value: colors.neutral.lowMedium       },
        { name: 'lowLight',   value: colors.neutral.lowLight        },
        { name: 'highMedium', value: colors.neutral.highMedium      },
        { name: 'highLight',  value: colors.neutral.highLight       },
        { name: 'highSubtle', value: colors.neutral.highExtraLight  },
        { name: 'white',      value: colors.neutral.highPure        },
      ]} />
      <Group title="Semantic" swatches={[
        { name: 'bg',       value: colors.bg       },
        { name: 'bgSubtle', value: colors.bgSubtle },
        { name: 'bgMuted',  value: colors.bgMuted  },
        { name: 'border',   value: colors.border   },
        { name: 'link',     value: colors.link     },
      ]} />
      <Group title="Categories" swatches={
        Object.entries(colors.categories).map(([id, v]) => ({ name: id, value: v.tint }))
      } />
    </ScrollView>
  ),
};

function isLightColor(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

const styles = StyleSheet.create({
  container:  { padding: spacing.xxxs, gap: spacing.xxs },
  group:      { gap: spacing.nano },
  groupTitle: { fontFamily: fontFamilies.base, fontWeight: fontWeights.bold, fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: 1 },
  swatches:   { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  swatch:     { width: 100, height: 72, borderRadius: radius.sm, padding: 8, justifyContent: 'flex-end' },
  swatchLabel:{ fontFamily: fontFamilies.base, fontWeight: fontWeights.bold, fontSize: 11 },
  swatchValue:{ fontFamily: fontFamilies.mono, fontSize: 10, marginTop: 2 },
});
