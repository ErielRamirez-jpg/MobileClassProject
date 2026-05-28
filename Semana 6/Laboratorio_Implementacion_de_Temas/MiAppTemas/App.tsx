// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import TabsNavigator from './src/navigation/TabsNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <TabsNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}