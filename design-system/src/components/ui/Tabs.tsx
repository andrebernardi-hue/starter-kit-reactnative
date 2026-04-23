import { Pressable, Text, View, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, borderWidth } from '../../tokens';

interface TabItem {
  key:   string;
  label: string;
}

interface Props {
  tabs:      TabItem[];
  activeKey: string;
  onChange:  (key: string) => void;
}

export function Tabs({ tabs, activeKey, onChange }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, active && styles.tabActive]}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:     'row',
    borderBottomWidth: borderWidth.hairline,
    borderBottomColor: colors.border,
  },
  tab: {
    flex:              1,
    alignItems:        'center',
    paddingVertical:   spacing.nano,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom:      -1,
  },
  tabActive:   { borderBottomColor: colors.primary.pure },
  label:       { ...textStyles.labelSm, color: colors.fg3 },
  labelActive: { color: colors.primary.pure },
});
