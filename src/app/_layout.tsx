import { useFonts } from "expo-font";
import "../global.css";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Roboto_500Medium, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [loaded, error] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
