import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth, UserRole } from "../contexts/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("common");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione su Rol</Text>

      <View style={styles.roleContainer}>
        {/* Opción Common */}
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === "common" && styles.activeButton]}
          onPress={() => setSelectedRole("common")}
        >
          <Text style={[styles.roleText, selectedRole === "common" && styles.activeText]}>
            Usuario Común (common)
          </Text>
        </TouchableOpacity>

        {/* Opción Admin */}
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === "admin" && styles.activeButton]}
          onPress={() => setSelectedRole("admin")}
        >
          <Text style={[styles.roleText, selectedRole === "admin" && styles.activeText]}>
            Administrador (admin)
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={() => login(selectedRole)}>
        <Text style={styles.submitButtonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },

  title: 
  { fontSize: 22, fontWeight: "bold", marginBottom: 30, color: "#333" },

  roleContainer: 
  { width: "100%", marginBottom: 30, gap: 15 },

  roleButton: 
  { padding: 16, borderRadius: 8, borderWidth: 1, borderColor: "#ccc", alignItems: "center" },

  activeButton: 
  { borderColor: "#5f0650", backgroundColor: "#f9f0f6" },

  roleText: 
  { fontSize: 16, color: "#666", fontWeight: "500" },

  activeText: 
  { color: "#5f0650", fontWeight: "700" },

  submitButton: 
  { backgroundColor: "#5f0650", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 8, width: "100%", alignItems: "center" },

  submitButtonText: 
  { color: "#fff", fontSize: 16, fontWeight: "bold" },
});