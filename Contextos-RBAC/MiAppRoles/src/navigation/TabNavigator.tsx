import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { useAuth } from "../contexts/AuthContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { role } = useAuth();
  const initialTab = role === "admin" ? "Settings" : "Home";

  return (
    <Tab.Navigator initialRouteName={initialTab}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />

      {role === "admin" && (
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Configuración" }} />
      )}
    </Tab.Navigator>
  );
}