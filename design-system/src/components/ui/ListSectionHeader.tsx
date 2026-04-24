import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, spacing, textStyles, fontWeights, letterSpacings } from '../../tokens';

interface Props {
  label:       string;
  topSpacing?: boolean;
}

export function ListSectionHeader({ label, topSpacing = true }: Props) {
  return (
    <Text style={[styles.label, topSpacing && styles.topSpacing]}>
      {label.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    // micro + bold + wide tracking — section markers demand emphasis at this size
    ...textStyles.micro,
    fontWeight:        fontWeights.bold,
    letterSpacing:     letterSpacings.lg,  // wider tracking reinforces the all-caps rhythm
    color:             colors.fg4,
    paddingHorizontal: spacing.xxxs,
    paddingBottom:     6,
  },
  topSpacing: {
    marginTop: spacing.xxxs,
  },
});
