import { useEffect } from "react"; // 1. Importa useEffect
import * as Linking from "expo-linking"; // 2. Importa Linking
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { navigationRef } from "./src/navigation/NavigationService";
import { AuthProvider } from "./src/contexts/AuthContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { supabase } from "./src/services/supabaseClient";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
            <Provider store={store}>
              <NavigationContainer ref={navigationRef}>
                <StackNavigator />
              </NavigationContainer>
            </Provider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}