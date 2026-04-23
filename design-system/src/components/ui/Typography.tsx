import { Text, TextStyle } from 'react-native';
import { textStyles, colors } from '../../tokens';

type Role =
  | 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  | 'body' | 'bodyLg' | 'bodySm'
  | 'caption' | 'labelLg' | 'labelSm' | 'eyebrow' | 'topBarTitle';

interface Props {
  role?:          Role;
  color?:         string;
  children:       React.ReactNode;
  style?:         TextStyle;
  numberOfLines?: number;
}

export function Typography({ role = 'body', color, children, style, numberOfLines }: Props) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        textStyles[role],
        color ? { color } : defaultColor(role),
        style,
      ]}
    >
      {children}
    </Text>
  );
}

function defaultColor(role: Role): TextStyle {
  if (['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'topBarTitle'].includes(role)) {
    return { color: colors.fg1 };
  }
  if (role === 'caption' || role === 'bodySm') return { color: colors.fg3 };
  if (role === 'eyebrow')                      return { color: colors.primary.pure };
  return { color: colors.fg2 };
}
