import { View, StyleSheet, ViewStyle } from 'react-native';
import { Typography }                  from '../ui/Typography';
import { colors, spacing }             from '../../tokens';

interface Props {
  title:     string;
  subtitle?: string;
  leading?:  React.ReactNode;
  trailing?: React.ReactNode;
  style?:    ViewStyle;
}

export function TopBar({ title, subtitle, leading, trailing, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.side}>{leading}</View>
        <View style={styles.side}>{trailing}</View>
      </View>
      <View style={styles.titleBlock}>
        <Typography role="topBarTitle">{title}</Typography>
        {subtitle && (
          <Typography role="bodySm" color={colors.fg3} style={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xxxs,
    paddingTop:        spacing.nano,
    paddingBottom:     spacing.nano,
    backgroundColor:   colors.bg,
  },
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    minHeight:      40,
  },
  side:       { minWidth: 40, alignItems: 'center' },
  titleBlock: { marginTop: 4 },
  subtitle:   { marginTop: 2 },
});
