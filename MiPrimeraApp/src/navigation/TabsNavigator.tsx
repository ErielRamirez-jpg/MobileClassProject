import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import RoutinesScreen from "../screens/RoutinesScreen";
import ProfileScreen from "../screens/UserSettings/ProfileScreen";
import SettingsScreen from "../screens/UserSettings/SettingsScreen";
import { useTheme } from "../contexts/ThemeContext";

//1. declarar tipado para pantallas y sus parametros
type TabsParamList = {
  Home: undefined;
  Products: undefined;
  Routines: undefined;
  Profile: undefined;
  Settings: undefined;
};

//2. crear el tabs navigator el cual se va a manejar la navegacion por pestañas
const Tab = createBottomTabNavigator<TabsParamList>();

//3. utilizar el tab navigator
export type { TabsParamList };

export default function TabNavigator() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#5f0650",
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.tabBarBackground,
        },
        headerStyle:{ backgroundColor: colors.headerBackground},
        headerTintColor: colors.headerText
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: "Productos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flask" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Routines"
        component={RoutinesScreen}
        options={{
          title: "Rutinas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Mi Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Configuración",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
