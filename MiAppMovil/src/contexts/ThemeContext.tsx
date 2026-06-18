import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeColors } from "../utils/types/ThemeColors";

type ThemeMode = "light" | "dark";



const lightColors: ThemeColors = {
  background: "#ffffff",
  text: "#f5f5f5",
  textSecondary: "#666666",
  primary: "#001f5c",
  secondary: "#5f0650",
  inputBackground: "#f0f0f0",
  buttonPrimaryBg: "#67102d",
  buttonPrimaryText: "#ffffff",
  buttonSecondaryBg: "gray",
  buttonSecondaryText: "#ffffff",
  buttonTertiaryBg: "#e8e8e8",
  buttonTertiaryText: "#1a1a1a",
  onSecondary: "#ffffff",
  tabBarBackground: "#ffffff",
  headerBackground: "#ffffff",
  headerText: "#001f5c",
  error: "#d32f2f",
  border: "#cccccc"
};

const darkColors: ThemeColors = {
    background: "#121212",
    text: "#e0e0e0",
    textSecondary: "#a0a0a0",
    primary: "#5b8def",
    secondary: "#c466b8",
    inputBackground: "#2a2a2a",
    buttonPrimaryBg: "#222922",
    buttonPrimaryText: "#ffffff",
    buttonSecondaryBg: "#555555",
    buttonSecondaryText: "#e0e0e0",
    buttonTertiaryBg: "#2a2a2a",
    buttonTertiaryText: "#e0e0e0",
    onSecondary: "#ffffff",
    tabBarBackground: "#1e1e1e",
    headerBackground: "#1e1e1e",
    headerText: "#e0e0e0",
    error: "#f78c8a",
    border: "#444444"
};

type ThemeContextType = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const colors = theme === "dark" ? darkColors : lightColors;
  const isDark = theme === "dark";

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    //validacion de contenido de Theme
    const newTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
