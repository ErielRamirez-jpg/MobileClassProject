import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Variant = 'primary' | 'secondary' | 'tertiary';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
};

export default function CustomButton({ title, onPress, variant = 'primary' }: Props) {
  const { colors } = useTheme();

  const getBackground = (): string => {
    if (variant === 'primary') return colors.primary;
    if (variant === 'secondary') return colors.surface;
    return 'transparent'; // tertiary
  };

  const getTextColor = (): string => {
    if (variant === 'primary') return '#FFFFFF';
    if (variant === 'secondary') return colors.text;
    return colors.primary; // tertiary
  };

  const getBorder = (): ViewStyle => {
    if (variant === 'tertiary') return { borderWidth: 1.5, borderColor: colors.primary };
    if (variant === 'secondary') return { borderWidth: 1, borderColor: colors.border };
    return {};
  };

  return (
    <TouchableOpacity
      style={[styles.base, { backgroundColor: getBackground() }, getBorder()]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, { color: getTextColor() }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 6,
    alignItems: 'center',
  },
  label: { fontSize: 16, fontWeight: '600' },
});