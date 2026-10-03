import "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";
import { SplashOverlay } from "../src/components/SplashOverlay";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
  });
  const [showIntro, setShowIntro] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // On a JS-only reload (Fast Refresh, or reopening in Expo Go without a
      // full native relaunch) the native splash has often already been
      // hidden once before, so calling hideAsync() again throws "No native
      // splash screen registered for given view controller" — harmless in
      // that case, so it's swallowed rather than left as an uncaught error.
      try {
        await SplashScreen.hideAsync();
      } catch {}
      setShowIntro(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, [showIntro]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="gallery" options={{ presentation: "modal" }} />
        </Stack>
        {showIntro && <SplashOverlay />}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
