// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from 'react';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'DoHyeon-Regular': require('../assets/fonts/DoHyeon-Regular.ttf'),
  });

  // Keep splash screen visible until fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevent app from rendering until fonts are ready
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
    </Stack>
  );
}
