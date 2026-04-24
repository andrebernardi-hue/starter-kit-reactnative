import React from 'react';
import { View, Pressable, Text, StyleSheet, Platform, ViewStyle } from 'react-native';
import { Icon }                 from '../icons/Icon';
import type { IconName }        from '../icons/Icon';
import { colors, textStyles, fontWeights, spacing, radius } from '../../tokens';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabItem {
  key:    string;
  label:  string;
  icon:   IconName;
  /** Red badge count — hidden when 0 or undefined */
  badge?: number;
}

interface Props {
  tabs:      TabItem[];
  activeKey: string;
  onChange:  (key: string) => void;
  /**
   * Detach the bar from the screen edge with rounded top corners and a small
   * horizontal inset — closer to the iOS 26 floating shelf style.
   */
  floating?: boolean;
  style?:    ViewStyle;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BottomTabBar({ tabs, activeKey, onChange, floating = false, style }: Props) {
  // react-native-web accepts unknown CSS properties as inline styles.
  // backdrop-filter gives the actual frosted-glass blur in the browser and on
  // web builds; on native the semi-transparent background acts as a fallback.
  const glassStyle = Platform.OS === 'web'
    ? { backdropFilter: 'blur(24px) saturate(180%)' } as ViewStyle
    : {};

  return (
    <View style={[styles.safeArea, floating && styles.safeAreaFloating]}>
      <View
        style={[
          styles.bar,
          floating && styles.barFloating,
          glassStyle,
          style,
        ]}
      >
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Pressable
              key={tab.key}
              style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}
              onPress={() => onChange(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tab.label}
            >
              {/* Icon + optional badge */}
              <View style={styles.iconWrap}>
                <Icon
                  name={tab.icon}
                  size={26}
                  color={active ? colors.primary.pure : colors.fg4}
                  stroke={active ? 2.2 : 1.75}
                />
                {!!tab.badge && tab.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {tab.badge > 99 ? '99+' : String(tab.badge)}
                    </Text>
                  </View>
                )}
              </View>

              {/* Label */}
              <Text style={[styles.label, active && styles.labelActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const BAR_HEIGHT = 56;  // visible tap area (extra safe-area padding added below)

const styles = StyleSheet.create({
  safeArea: {
    // Provide 16dp of extra bottom padding for iPhone home indicator.
    // Use SafeAreaView in the host app to get the real inset.
    paddingBottom: 16,
    backgroundColor: 'rgba(252, 252, 252, 0.92)',
  },
  safeAreaFloating: {
    paddingBottom: 16,
    paddingHorizontal: spacing.nano,
    backgroundColor: 'transparent',
  },

  bar: {
    flexDirection:  'row',
    height:         BAR_HEIGHT,
    backgroundColor: 'rgba(252, 252, 252, 0.92)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
  },
  barFloating: {
    borderRadius:    radius.lg,
    borderTopWidth:  StyleSheet.hairlineWidth,
    borderTopColor:  colors.borderSubtle,
    // Soft lift shadow
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.10,
    shadowRadius:    16,
    elevation:       8,
  },

  tab: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            3,
    paddingVertical: 6,
  },
  tabPressed: {
    opacity: 0.55,
  },

  iconWrap: {
    position: 'relative',
  },

  badge: {
    position:        'absolute',
    top:             -4,
    right:           -8,
    minWidth:        16,
    height:          16,
    borderRadius:    8,
    backgroundColor: colors.error.medium,
    alignItems:      'center',
    justifyContent:  'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    ...textStyles.micro,
    fontWeight: fontWeights.bold,
    color:      '#FFFFFF',
    lineHeight: 12,
  },

  label: {
    ...textStyles.micro,
    color: colors.fg4,
  },
  labelActive: {
    color:      colors.primary.pure,
    fontWeight: fontWeights.bold,
  },
});
