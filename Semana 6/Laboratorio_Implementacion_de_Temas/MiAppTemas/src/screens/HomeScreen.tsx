import { Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import Card from '../components/Card';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Variantes de Botón</Text>
      
      <CustomButton title='Botón Primario' onPress={() => {}} variant='primary' />
      <CustomButton title='Botón Secundario' onPress={() => {}} variant='secondary' />
      <CustomButton title='Botón Terciario' onPress={() => {}} variant='tertiary' />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Tarjetas de Muestra</Text>
      <Card title="Bienvenido" icon="star" description="Esta es una tarjeta utilizando componentes dinámicos con Context." />
      <Card title="Configuración Rápida" icon="flash" description="Cambia el tema global de la aplicación desde la pestaña configuración." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginTop: 24, marginBottom: 12 },
});