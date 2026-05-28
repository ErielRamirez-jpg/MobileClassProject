import { View, Text, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { isDark, colors, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons name={isDark ? 'moon' : 'sunny'} size={72} color={colors.primary} style={styles.icon} />
      
      <Text style={[styles.title, { color: colors.text }]}>
        Tema actual: {isDark ? 'Oscuro' : 'Claro'}
      </Text>
      
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Cambia el tema
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          {isDark ? 'Desactivar modo oscuro' : 'Activar modo oscuro'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? colors.primary : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#9B59B6' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  icon: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  label: { fontSize: 16 },
});