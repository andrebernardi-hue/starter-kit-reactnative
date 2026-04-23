import { View, Text, StyleSheet } from 'react-native';
import { colors, fontFamilies, fontWeights, radius } from '../../tokens';
import { getExpiryState, daysBetween }               from '../../utils/expiry';
import { PantryItem }                                 from '../../types/pantry';

interface Props {
  item:     PantryItem;
  compact?: boolean;
}

const STATE_MAP = {
  expired: { bg: '#F3EEEE', fg: colors.error.dark,    label: ()         => 'Expired'              },
  soon:    { bg: '#F8E4E4', fg: colors.error.medium,  label: (d: number) => `Expires in ${d}d`    },
  warn:    { bg: '#FFE8D1', fg: colors.warning.dark,  label: (d: number) => `Expires in ${d}d`    },
};

export function ExpiryBadge({ item, compact = false }: Props) {
  const state = getExpiryState(item);
  if (!state || state === 'ok') return null;

  const { bg, fg, label } = STATE_MAP[state];
  const days = item.expiry ? daysBetween(item.expiry, new Date()) : 0;
  const text = compact && state === 'soon' ? 'Expires soon' : label(days);

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: fg }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical:   3,
    borderRadius:      radius.full,
    alignSelf:         'flex-start',
  },
  label: {
    fontFamily: fontFamilies.base,
    fontWeight: fontWeights.bold,
    fontSize:   11,
  },
});
