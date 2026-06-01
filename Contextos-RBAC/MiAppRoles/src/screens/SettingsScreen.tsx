  import React from "react";
  import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
  import { useAuth } from "../contexts/AuthContext";

  export default function SettingsScreen() {
    const { logout } = useAuth();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>estas en Settings</Text>
        <Text style={styles.subtitle}>Panel de control exclusivo de Administrador</Text>

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
    { fontSize: 22, fontWeight: "bold", color: "#5f0650", marginBottom: 10 },

    subtitle: 
    { fontSize: 14, color: "#666", marginBottom: 40 },

    logoutButton: 
    { borderWidth: 1, borderColor: "#d32f2f", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },

    logoutText: 
    { color: "#d32f2f", fontWeight: "bold", fontSize: 15 },
  });