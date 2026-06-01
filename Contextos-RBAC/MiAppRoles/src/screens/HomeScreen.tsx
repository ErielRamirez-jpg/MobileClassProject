import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { logout, role } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Pantalla de Inicio</Text>
      <Text style={styles.subtitle}>Tu rol actual es: <Text style={styles.bold}>{role}</Text></Text>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },

  title: 
  { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },

  subtitle: 
  { fontSize: 16, color: "#666", marginBottom: 40 },

  bold: 
  { fontWeight: "bold", color: "#5f0650" },

  logoutButton: 
  { borderWidth: 1, borderColor: "#d32f2f", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },

  logoutText: 
  { color: "#d32f2f", fontWeight: "bold", fontSize: 15 },
});