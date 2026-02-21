import { useColorScheme, StatusBar } from 'react-native';
import { Stack } from 'expo-router';

import { UserProvider } from '../contexts/UserContext';
import { BooksProvider } from '../contexts/BooksContext';
import { Colors } from '../constants/Colors';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserProvider>
      <BooksProvider>
        <StatusBar value="auto" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ title: 'Home' }} />
        </Stack>
      </BooksProvider>
    </UserProvider>
  );
};

export default RootLayout;
