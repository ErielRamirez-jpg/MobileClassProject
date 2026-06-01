  import React from "react";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import LoginScreen from "../screens/LoginScreen";
  import TabNavigator from "./TabNavigator";
  import { useAuth } from "../contexts/AuthContext";

  const Stack = createNativeStackNavigator();

  export default function StackNavigator() {
    const { isAuthenticated } = useAuth();

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        )}
      </Stack.Navigator>
    );
  }