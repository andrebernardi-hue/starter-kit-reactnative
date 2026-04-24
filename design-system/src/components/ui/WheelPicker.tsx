import React, { useRef, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { colors, radius, textStyles } from '../../tokens';

export interface WheelColumn {
  items: { label: string; value: any }[];
  width?: number;
}

interface Props {
  columns:      WheelColumn[];
  values:       any[];
  onChange:     (values: any[], changedColIndex: number) => void;
  rowHeight?:   number;
  visibleRows?: number;
  disabled?:    boolean;
}

function WheelColumnView({
  column,
  value,
  rowHeight,
  visibleRows,
  disabled,
  onChangeValue,
}: {
  column:        WheelColumn;
  value:         any;
  rowHeight:     number;
  visibleRows:   number;
  disabled:      boolean;
  onChangeValue: (val: any) => void;
}) {
  const scrollRef     = useRef<ScrollView>(null);
  const halfRows      = Math.floor(visibleRows / 2);
  const containerH    = rowHeight * visibleRows;
  const paddingVert   = rowHeight * halfRows;

  const currentIndex = column.items.findIndex((it) => it.value === value);

  useEffect(() => {
    const idx = currentIndex >= 0 ? currentIndex : 0;
    // slight delay to allow layout
    const t = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: idx * rowHeight, animated: false });
    }, 50);
    return () => clearTimeout(t);
  }, [value, currentIndex, rowHeight]);

  function handleScrollEnd(y: number) {
    if (disabled) return;
    const rawIndex   = Math.round(y / rowHeight);
    const clamped    = Math.max(0, Math.min(rawIndex, column.items.length - 1));
    onChangeValue(column.items[clamped].value);
  }

  // Fallback width so flex:1 doesn't collapse to 0 when the parent row has no
  // intrinsic bounds (common in react-native-web / Storybook centered layouts).
  const colWidth = column.width ?? 72;

  return (
    <View style={[styles.columnContainer, { height: containerH, width: colWidth }]}>
      <ScrollView
        ref={scrollRef}
        snapToInterval={rowHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollEnabled={!disabled}
        onMomentumScrollEnd={(e) => handleScrollEnd(e.nativeEvent.contentOffset.y)}
        onScrollEndDrag={(e) => handleScrollEnd(e.nativeEvent.contentOffset.y)}
        contentContainerStyle={{ paddingTop: paddingVert, paddingBottom: paddingVert }}
      >
        {column.items.map((item, i) => (
          <View key={i} style={{ height: rowHeight, justifyContent: 'center' }}>
            <Text style={styles.rowText}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Center highlight */}
      <View
        style={[
          styles.highlight,
          { height: rowHeight, top: paddingVert },
        ]}
        pointerEvents="none"
      />

      {/* Top fade */}
      <View
        style={[styles.fadeTop, { height: paddingVert }]}
        pointerEvents="none"
      />

      {/* Bottom fade */}
      <View
        style={[styles.fadeBottom, { height: paddingVert }]}
        pointerEvents="none"
      />
    </View>
  );
}

export function WheelPicker({
  columns,
  values,
  onChange,
  rowHeight   = 44,
  visibleRows = 5,
  disabled    = false,
}: Props) {
  function handleColumnChange(colIndex: number, newVal: any) {
    const newValues = values.map((v, i) => (i === colIndex ? newVal : v));
    onChange(newValues, colIndex);
  }

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      {columns.map((col, i) => (
        <WheelColumnView
          key={i}
          column={col}
          value={values[i]}
          rowHeight={rowHeight}
          visibleRows={visibleRows}
          disabled={disabled}
          onChangeValue={(val) => handleColumnChange(i, val)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  disabled: {
    opacity: 0.4,
  },
  columnContainer: {
    overflow: 'hidden',
  },
  rowText: {
    ...textStyles.body,
    color:             colors.fg1,
    textAlign:         'center',
    textAlignVertical: 'center',
  },
  highlight: {
    position:        'absolute',
    left:            8,
    right:           8,
    backgroundColor: colors.primary.light,
    opacity:         0.7,
    borderRadius:    radius.xs,
  },
  fadeTop: {
    position:        'absolute',
    top:             0,
    left:            0,
    right:           0,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  fadeBottom: {
    position:        'absolute',
    bottom:          0,
    left:            0,
    right:           0,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
});
