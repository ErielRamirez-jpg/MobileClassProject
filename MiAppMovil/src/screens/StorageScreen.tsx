import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system"; // Importación limpia unificada
import { decode } from "base64-arraybuffer";
import { supabase } from "../services/supabaseClient";
import { env } from "../config/env";
import { useTheme } from "../contexts/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import SectionTitle from "../components/SectionTitle";
import CustomButton from "../components/CustomButton";

export default function StorageScreen() {
  const { colors } = useTheme();

  // Estados para selección de imagen de galería
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  // Estados para selección de archivo arbitrario (PDF, Word, etc.)
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Estado indicador del ActivityIndicator de carga
  const [uploading, setUploading] = useState<boolean>(false);

  // 1. Funcionalidad: Abrir la galería del dispositivo con verificación de permisos
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permiso requerido", "Se necesitan permisos para acceder a la galería de fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImageUri(selectedImage.uri);
      
      // Asignar nombre con fallback por si viene vacío
      const name = selectedImage.fileName || `imagen_${Date.now()}.jpg`;
      setImageName(name);
    }
  };

  // 2. Funcionalidad: Abrir el explorador de archivos del sistema (*/* para cualquier tipo)
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0];
        setFileUri(selectedFile.uri);
        setFileName(selectedFile.name);
      }
    } catch (error) {
      console.log("Error al seleccionar archivo:", error);
      Alert.alert("Error", "Ocurrió un inconveniente al abrir el selector de archivos.");
    }
  };

  // Lógica de Negocio Central: Lectura local en Base64, conversión a ArrayBuffer y subida
  const uploadToSupabase = async (uri: string, originalName: string, folder: string) => {
    // Generar nombre de archivo único uniendo la carpeta destino, un timestamp y el nombre limpio
    const uniqueName = `${folder}/${Date.now()}_${originalName.replace(/\s+/g, "_")}`;
    
    // Leer el archivo local usando la cadena literal "base64" para evitar fallos de tipos entre versiones
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    
    // Decodificar el string base64 a un búfer binario puro (ArrayBuffer)
    const arrayBuffer = decode(base64);

    // Subida asíncrona por medio del SDK Cliente de Supabase utilizando variables de entorno
    const { data, error } = await supabase.storage
      .from(env.supabaseBucket)
      .upload(uniqueName, arrayBuffer, {
        contentType: folder === "images" ? "image/jpeg" : "application/octet-stream",
        upsert: true,
      });

    if (error) throw error;
    return data;
  };

  // 3. Funcionalidad: Orquestar el envío asíncrono con bloques try/catch
  const handleUploadAll = async () => {
    if (!imageUri && !fileUri) {
      Alert.alert("Campos vacíos", "Por favor selecciona una imagen o un archivo antes de intentar subir.");
      return;
    }

    setUploading(true);

    try {
      // Subir la imagen procesada a la carpeta virtual /images
      if (imageUri && imageName) {
        await uploadToSupabase(imageUri, imageName, "images");
      }

      // Subir el documento arbitrario a la carpeta virtual /documents
      if (fileUri && fileName) {
        await uploadToSupabase(fileUri, fileName, "documents");
      }

      // Retroalimentación visual de Éxito al concluir la operación remota
      Alert.alert("¡Subida Exitosa!", "Tus archivos fueron cargados correctamente en Supabase Storage.");
      
      // Limpieza de estados visuales tras completar de forma correcta
      setImageUri(null);
      setImageName(null);
      setFileUri(null);
      setFileName(null);

    } catch (error: any) {
      // Retroalimentación de Error detallada al estudiante/docente
      console.error("Error completo en la transferencia:", error);
      Alert.alert("Error de Carga", error.message || "No se pudo sincronizar el archivo con la nube.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScreenWrapper>
      <SectionTitle
        title="Servicio de Almacenamiento"
        subtitle="Implementación de carga asíncrona de archivos multimedia"
      />

      {/* --- PANEL DE COMPONENTE IMAGEN --- */}
      <View style={[styles.card, { backgroundColor: colors.inputBackground }]}>
        <Text style={[styles.cardTitle, { color: colors.primary }]}>Selector de Imágenes</Text>
        
        <View style={styles.buttonContainer}>
          <CustomButton title="Seleccionar Imagen" onPress={pickImage} variant="primary" />
        </View>

        {imageUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.thumbnail} />
            <Text style={[styles.fileNameText, { color: colors.textSecondary }]} numberOfLines={1}>
              {imageName}
            </Text>
          </View>
        ) : (
          <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
            No se ha elegido una imagen previa de la galería
          </Text>
        )}
      </View>

      {/* --- PANEL DE COMPONENTE ARCHIVO --- */}
      <View style={[styles.card, { backgroundColor: colors.inputBackground }]}>
        <Text style={[styles.cardTitle, { color: colors.primary }]}>Selector de Archivos Arbitrarios</Text>
        
        <View style={styles.buttonContainer}>
          <CustomButton title="Seleccionar Archivo" onPress={pickFile} variant="secondary" />
        </View>

        {fileUri ? (
          <View style={styles.fileContainer}>
            <Text style={[styles.fileNameText, { color: colors.buttonTertiaryText }]} numberOfLines={2}>
              📄 {fileName}
            </Text>
          </View>
        ) : (
          <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
            No se ha seleccionado ningún archivo (PDF, DOCX, etc.)
          </Text>
        )}
      </View>

      {/* --- CONTROLADORES DE CARGA Y FEEDBACK VISUAL --- */}
      <View style={styles.actionContainer}>
        {uploading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.secondary} />
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Subiendo archivos a la nube remota...
            </Text>
          </View>
        ) : (
          <CustomButton title="Subir al Servicio" onPress={handleUploadAll} variant="primary" />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 9,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "gray",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  buttonContainer: {
    alignItems: "flex-start",
    marginBottom: 12,
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
  fileContainer: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    marginTop: 4,
  },
  fileNameText: {
    fontSize: 13,
    flex: 1,
  },
  placeholderText: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 4,
  },
  actionContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  loadingContainer: {
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    marginTop: 4,
  },
});