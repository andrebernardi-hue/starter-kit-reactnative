/**
 * NavigatorSheets
 *
 * Two visual shells that match the native stack navigator presentation styles:
 *
 * • `ModalSheet`  — full-height-ish card that slides up from the bottom.
 *                   Maps to `presentation: 'modal'` in react-navigation.
 *
 * • `FormSheet`   — compact centred card (not full-width) with a close button.
 *                   Maps to `presentation: 'formSheet'` in react-navigation.
 *
 * Neither depends on react-navigation at runtime — they are pure RN components
 * that can be dropped into any navigation setup or used standalone.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Animated,
  Dimensions,
  Easing,
  Pressable,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Icon }               from '../icons/Icon';
import { AppHeader }          from './AppHeader';
import { colors, radius, shadows, spacing, textStyles } from '../../tokens';

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

// ─── ModalSheet ───────────────────────────────────────────────────────────────

interface ModalSheetProps {
  visible:   boolean;
  onClose:   () => void;
  title?:    string;
  children:  React.ReactNode;
  /**
   * `full`  — 92 % of screen height (default).
   * `large` — 75 % of screen height.
   */
  size?: 'full' | 'large';
}

export function ModalSheet({
  visible,
  onClose,
  title,
  children,
  size = 'full',
}: ModalSheetProps) {
  const sheetH = size === 'full' ? SCREEN_H * 0.92 : SCREEN_H * 0.75;

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const slideY          = useRef(new Animated.Value(sheetH)).current;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1, duration: 240, useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue: 0, duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0, duration: 200, useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue: sheetH, duration: 260,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => setMounted(false));
    }
  }, [visible]);

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.modalSheet,
          (shadows.level3 as object),
          { height: sheetH, transform: [{ translateY: slideY }] },
        ]}
      >
        {/* Handle */}
        <View style={styles.handleRow}>
          <View style={styles.handle} />
        </View>

        {/* Header */}
        {title && (
          <AppHeader
            title={title}
            variant="compact"
            actions={[{
              icon:               'x',
              onPress:            onClose,
              accessibilityLabel: 'Close',
            }]}
            style={styles.sheetHeader}
          />
        )}

        {/* Content */}
        <ScrollView style={styles.sheetBody} contentContainerStyle={styles.sheetBodyContent}>
          {children}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

// ─── FormSheet ────────────────────────────────────────────────────────────────

interface FormSheetProps {
  visible:   boolean;
  onClose:   () => void;
  title?:    string;
  /** Optional subtitle below the title */
  subtitle?: string;
  children:  React.ReactNode;
}

export function FormSheet({
  visible,
  onClose,
  title,
  subtitle,
  children,
}: FormSheetProps) {
  const scale   = useRef(new Animated.Value(0.92)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.spring(scale,   { toValue: 1,    useNativeDriver: true, tension: 90, friction: 10 }),
        Animated.timing(opacity, { toValue: 1,    duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scale,   { toValue: 0.92, duration: 180, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0,    duration: 180, useNativeDriver: true }),
      ]).start(() => setMounted(false));
    }
  }, [visible]);

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      {/* Scrim */}
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Form card */}
      <View style={styles.formCenter} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.formCard,
            (shadows.level4 as object),
            { opacity, transform: [{ scale }] },
          ]}
        >
          {/* Close button */}
          <Pressable
            onPress={onClose}
            style={styles.formClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Icon name="x" size={18} color={colors.fg3} stroke={2} />
          </Pressable>

          {/* Title + subtitle */}
          {(title || subtitle) && (
            <View style={styles.formTitleBlock}>
              {title    && <Text style={styles.formTitle}>{title}</Text>}
              {subtitle && <Text style={styles.formSubtitle}>{subtitle}</Text>}
            </View>
          )}

          {/* Content */}
          <View style={styles.formContent}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── common ──────────────────────────────────────────────────────────────────
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },

  // ── ModalSheet ───────────────────────────────────────────────────────────────
  modalSheet: {
    position:             'absolute',
    bottom:               0,
    left:                 0,
    right:                0,
    backgroundColor:      colors.bg,
    borderTopLeftRadius:  radius.lg,
    borderTopRightRadius: radius.lg,
  },
  handleRow: {
    alignItems:   'center',
    paddingTop:   10,
    paddingBottom: 4,
  },
  handle: {
    width:           40,
    height:          4,
    borderRadius:    2,
    backgroundColor: colors.neutral.highMedium,
  },
  sheetHeader: {
    borderBottomWidth: 0,
    backgroundColor:   'transparent',
  },
  sheetBody: {
    flex: 1,
  },
  sheetBodyContent: {
    padding: spacing.xxxs,
  },

  // ── FormSheet ─────────────────────────────────────────────────────────────
  formCenter: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxs,
  },
  formCard: {
    width:           Math.min(SCREEN_W - spacing.xxxs * 2, 420),
    backgroundColor: colors.bg,
    borderRadius:    radius.lg,
    overflow:        'hidden',
    paddingBottom:   spacing.xxxs,
  },
  formClose: {
    position:        'absolute',
    top:             spacing.nano,
    right:           spacing.nano,
    zIndex:          10,
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: colors.bgMuted,
    alignItems:      'center',
    justifyContent:  'center',
  },
  formTitleBlock: {
    paddingTop:        spacing.xxxs,
    paddingHorizontal: spacing.xxxs,
    paddingBottom:     spacing.nano,
    gap:               4,
  },
  formTitle: {
    ...textStyles.h4,
    color: colors.fg1,
  },
  formSubtitle: {
    ...textStyles.bodySm,
    color: colors.fg3,
  },
  formContent: {
    paddingHorizontal: spacing.xxxs,
  },
});
