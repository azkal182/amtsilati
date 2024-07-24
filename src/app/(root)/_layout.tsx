import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Roboto_500Medium, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [loaded, error] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Utsmani: require("@/assets/fonts/Uthmanic.otf"),
    SurahNames: require("@/assets/fonts/surah_names.ttf"),
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
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
