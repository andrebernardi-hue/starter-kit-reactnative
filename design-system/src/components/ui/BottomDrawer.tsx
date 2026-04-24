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
} from 'react-native';
import { colors, radius, shadows, spacing, textStyles } from '../../tokens';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
  visible:          boolean;
  onClose:          () => void;
  children:         React.ReactNode;
  title?:           string;
  snap?:            'half' | 'full';
  closeOnBackdrop?: boolean;
  showHandle?:      boolean;
}

export function BottomDrawer({
  visible,
  onClose,
  children,
  title,
  snap = 'half',
  closeOnBackdrop = true,
  showHandle = true,
}: Props) {
  const sheetHeight = snap === 'full' ? SCREEN_HEIGHT * 0.92 : SCREEN_HEIGHT * 0.5;

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const slideY          = useRef(new Animated.Value(sheetHeight)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue:         1,
          duration:        250,
          useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue:         0,
          duration:        300,
          easing:          Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue:         0,
          duration:        200,
          useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue:         sheetHeight,
          duration:        250,
          easing:          Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible]);

  function handleBackdropPress() {
    if (closeOnBackdrop) {
      onClose();
    }
  }

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          (shadows.level3 as object),
          { height: sheetHeight, transform: [{ translateY: slideY }] },
        ]}
      >
        {showHandle && (
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
        )}
        {title && (
          <Text style={styles.title}>{title}</Text>
        )}
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position:              'absolute',
    bottom:                0,
    left:                  0,
    right:                 0,
    backgroundColor:       '#FFFFFF',
    borderTopLeftRadius:   radius.lg,
    borderTopRightRadius:  radius.lg,
  },
  handleContainer: {
    alignItems:    'center',
    marginTop:     10,
    marginBottom:  12,
  },
  handle: {
    width:        40,
    height:       4,
    borderRadius: 2,
    backgroundColor: colors.neutral.highMedium,
  },
  title: {
    ...textStyles.h4,
    textAlign:    'center',
    color:        colors.fg1,
    marginBottom: spacing.nano,
    marginTop:    4,
  },
});
