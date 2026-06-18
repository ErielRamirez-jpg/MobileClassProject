import { View, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ScreenWrapper from "../components/ScreenWrapper";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("mjsalinas@unitec.edu");
  const [password, setPassword] = useState("");

  const { login, loginWithGoogle } = useAuth();

  const handleLogin = () => {
    try {
      login(email, password);
      navigation.navigate("MainTabs");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log("Error al presionar el botón de Google:", error);
    }
  };

  return (
    <ScreenWrapper>
      <CustomInput
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={setEmail}
      />

      <CustomInput
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={setPassword}
      />

      {/* Botón principal ocupando el ancho completo arriba */}
      <CustomButton title={i18n.t("signIn")} onPress={handleLogin} />

      {/* Contenedor para botones lado a lado */}
      <View style={styles.buttonRow}>
        <CustomButton 
          title="Google" 
          variant="tertiary" 
          onPress={handleGoogleLogin} 
        />
        <CustomButton 
          title="Regístrate" 
          variant="secondary"
          onPress={() => navigation.navigate("Register")} 
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 310, // Ajustado para que los dos botones de 150px quepan con 10px de espacio entre ellos
    marginTop: 15,
  },
});