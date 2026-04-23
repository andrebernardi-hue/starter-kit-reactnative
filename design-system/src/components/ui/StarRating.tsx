import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../tokens';

interface Props {
  value?:    number;
  onChange?: (rating: number) => void;
  size?:     number;
  readOnly?: boolean;
}

export function StarRating({ value = 0, onChange, size = 24, readOnly = false }: Props) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity
          key={i}
          disabled={readOnly}
          onPress={() => onChange?.(i)}
          activeOpacity={0.7}
          style={styles.star}
        >
          <Text style={{ fontSize: size, color: i <= display ? colors.warning.medium : colors.border }}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row:  { flexDirection: 'row', gap: 2 },
  star: { padding: 2 },
});
