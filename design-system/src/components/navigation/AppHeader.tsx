import React from 'react';
import { View, Pressable, Text, StyleSheet, Platform, ViewStyle } from 'react-native';
import { Icon }                  from '../icons/Icon';
import type { IconName }         from '../icons/Icon';
import { colors, textStyles, fontWeights, radius, spacing } from '../../tokens';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeaderAction {
  icon:               IconName;
  onPress:            () => void;
  accessibilityLabel: string;
}

interface Props {
  title:      string;
  subtitle?:  string;
  /**
   * `large`   — iOS large-title style: actions live in the top row, the big
   *             title sits below them. Great for root screens.
   * `compact` — title is inline with leading/trailing controls. Ideal for
   *             pushed/modal screens.
   */
  variant?:   'large' | 'compact';
  /** Renders a back-arrow button on the leading side. */
  onBack?:    () => void;
  /** Up to ~3 icon-button actions placed in the trailing area. */
  actions?:   HeaderAction[];
  /**
   * Custom leading slot (overrides the auto-generated back button).
   * Use for avatars, menu icons, etc.
   */
  leading?:   React.ReactNode;
  /** Transparent background — place over images or coloured screens. */
  transparent?: boolean;
  style?:     ViewStyle;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppHeader({
  title,
  subtitle,
  variant    = 'large',
  onBack,
  actions    = [],
  leading,
  transparent = false,
  style,
}: Props) {
  // Frosted glass on web; solid bg on native (use expo-blur in the host app
  // to get native blur behind this component if desired).
  const glassStyle = Platform.OS === 'web'
    ? { backdropFilter: 'blur(20px) saturate(180%)' } as ViewStyle
    : {};

  const bgStyle: ViewStyle = transparent
    ? { backgroundColor: 'transparent' }
    : { backgroundColor: 'rgba(252,252,252,0.92)' };

  const leadingNode = leading ?? (
    onBack ? (
      <Pressable
        onPress={onBack}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Icon name="arrow-left" size={22} color={colors.primary.pure} stroke={2} />
      </Pressable>
    ) : null
  );

  const trailingNode = actions.length > 0 && (
    <View style={styles.actionPill}>
      {actions.map((a, i) => (
        <Pressable
          key={i}
          onPress={a.onPress}
          style={({ pressed }) => [styles.actionBtn, pressed && styles.actionBtnPressed]}
          accessibilityRole="button"
          accessibilityLabel={a.accessibilityLabel}
        >
          <Icon name={a.icon} size={20} color={colors.fg1} stroke={1.75} />
        </Pressable>
      ))}
    </View>
  );

  if (variant === 'large') {
    return (
      <View style={[styles.containerLarge, bgStyle, glassStyle, style]}>
        {/* Top row: leading + trailing */}
        <View style={styles.row}>
          <View style={styles.rowSide}>{leadingNode}</View>
          <View style={styles.rowSide}>{trailingNode}</View>
        </View>
        {/* Large title block */}
        <View style={styles.largeTitleBlock}>
          <Text style={styles.largeTitle}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    );
  }

  // compact variant
  return (
    <View style={[styles.containerCompact, bgStyle, glassStyle, style]}>
      <View style={styles.rowSide}>{leadingNode}</View>
      <View style={styles.compactCenter}>
        <Text style={styles.compactTitle} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.compactSubtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>
      <View style={styles.rowSide}>{trailingNode}</View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Large variant ──────────────────────────────────────────────────────────
  containerLarge: {
    paddingTop:        spacing.nano,
    paddingBottom:     spacing.nano,
    paddingHorizontal: spacing.xxxs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    minHeight:      44,
  },
  rowSide: {
    minWidth:   44,
    alignItems: 'flex-start',
  },
  largeTitleBlock: {
    marginTop:    6,
    marginBottom: 4,
  },
  largeTitle: {
    ...textStyles.topBarTitle,
    color: colors.fg1,
  },
  subtitle: {
    ...textStyles.bodySm,
    color:     colors.fg3,
    marginTop: 2,
  },

  // ── Compact variant ────────────────────────────────────────────────────────
  containerCompact: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    height:            52,
    paddingHorizontal: spacing.xxxs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
  },
  compactCenter: {
    flex:       1,
    alignItems: 'center',
    paddingHorizontal: spacing.nano,
  },
  compactTitle: {
    ...textStyles.labelLg,
    color: colors.fg1,
  },
  compactSubtitle: {
    ...textStyles.micro,
    color: colors.fg3,
  },

  // ── Back button ─────────────────────────────────────────────────────────────
  backButton: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            2,
    paddingVertical: 8,
    paddingRight:   8,
  },

  // ── Action pill (iOS 26–style glass pill for toolbar icons) ─────────────────
  actionPill: {
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: 'rgba(240,240,240,0.85)',
    borderRadius:    radius.full,
    paddingHorizontal: 4,
    paddingVertical:   4,
    gap:               2,
  },
  actionBtn: {
    width:          36,
    height:         36,
    borderRadius:   18,
    alignItems:     'center',
    justifyContent: 'center',
  },
  actionBtnPressed: {
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
});
