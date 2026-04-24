import React, { useEffect, useRef } from 'react';
import { Animated, ActivityIndicator, Image, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { colors, textStyles, fontWeights } from '../../tokens';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'seen' | 'failed';
export type MessageType   = 'text' | 'typing' | 'image';

interface Props {
  isMine:          boolean;
  text?:           string;
  type?:           MessageType;
  status?:         MessageStatus;
  timestamp?:      string;
  showAvatar?:     boolean;
  avatarInitials?: string;
  avatarColor?:    string;
  imageUri?:       string;
  style?:          ViewStyle;
}

function TypingDots() {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const anims = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(dot, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]),
      ),
    );
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, []);

  return (
    <View style={typingStyles.row}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={[
            typingStyles.dot,
            { transform: [{ translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] },
          ]}
        />
      ))}
    </View>
  );
}

const typingStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 2 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.fg3 },
});

function StatusIndicator({ status }: { status: MessageStatus }) {
  if (status === 'sending') {
    return <ActivityIndicator size="small" color={colors.fg4} style={{ marginTop: 2 }} />;
  }
  const map: Record<MessageStatus, { text: string; color: string }> = {
    sending:   { text: '',   color: colors.fg4 },
    sent:      { text: '✓',  color: colors.fg4 },
    delivered: { text: '✓✓', color: colors.fg4 },
    seen:      { text: '✓✓', color: colors.primary.pure },
    failed:    { text: '!',  color: colors.error.medium },
  };
  const cfg = map[status];
  return <Text style={[textStyles.micro, { color: cfg.color }]}>{cfg.text}</Text>;
}

export function ChatBubble({
  isMine,
  text,
  type = 'text',
  status,
  timestamp,
  showAvatar = false,
  avatarInitials = '?',
  avatarColor,
  imageUri,
  style,
}: Props) {
  const bubbleRadius = isMine
    ? { borderTopLeftRadius: 16, borderTopRightRadius: 4, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
    : { borderTopLeftRadius: 4, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 };

  const bubbleStyle = isMine ? styles.bubbleMine : styles.bubbleTheirs;

  function renderContent() {
    if (type === 'typing') {
      return <TypingDots />;
    }
    if (type === 'image') {
      if (imageUri) {
        return (
          <Image
            source={{ uri: imageUri }}
            style={[styles.image, bubbleRadius]}
            resizeMode="cover"
          />
        );
      }
      return <View style={[styles.image, styles.imagePlaceholder, bubbleRadius]} />;
    }
    // text
    return (
      <Text style={[styles.messageText, isMine ? styles.textMine : styles.textTheirs]}>
        {text}
      </Text>
    );
  }

  const isImageType = type === 'image';

  return (
    <View style={[styles.row, isMine ? styles.rowMine : styles.rowTheirs, style]}>
      {!isMine && showAvatar && (
        <View style={[styles.avatar, { backgroundColor: avatarColor ?? colors.primary.pure }]}>
          <Text style={styles.avatarText}>
            {avatarInitials.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      )}
      <View>
        <View style={[bubbleStyle, isImageType ? styles.bubbleImage : styles.bubblePadding, bubbleRadius]}>
          {renderContent()}
        </View>
        {/* Meta row */}
        <View style={[styles.meta, isMine ? styles.metaMine : styles.metaTheirs]}>
          {isMine && status && <StatusIndicator status={status} />}
          {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    maxWidth:      '80%',
    gap:           8,
    marginBottom:  2,
    alignItems:    'flex-end',
  },
  rowMine: {
    alignSelf: 'flex-end',
  },
  rowTheirs: {
    alignSelf: 'flex-start',
  },
  bubblePadding: {
    paddingVertical:   9,
    paddingHorizontal: 13,
  },
  bubbleImage: {},
  bubbleMine: {
    backgroundColor: colors.primary.pure,
  },
  bubbleTheirs: {
    backgroundColor:  colors.bg,
    borderWidth:      1,
    borderColor:      colors.borderSubtle,
  },
  messageText: {
    ...textStyles.bodySm,
  },
  textMine:   { color: '#FFFFFF' },
  textTheirs: { color: colors.fg1 },
  image: {
    width:  200,
    height: 150,
  },
  imagePlaceholder: {
    backgroundColor: colors.bgMuted,
  },
  avatar: {
    width:           28,
    height:          28,
    borderRadius:    14,
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatarText: {
    ...textStyles.micro,
    fontWeight: fontWeights.bold, // bold at micro size for legibility
    color:      '#FFFFFF',
  },
  meta: {
    flexDirection: 'row',
    gap:           4,
    marginTop:     2,
    alignItems:    'center',
  },
  metaMine:   { justifyContent: 'flex-end' },
  metaTheirs: { justifyContent: 'flex-start' },
  timestamp: {
    ...textStyles.micro,
    color: colors.fg4,
  },
});
