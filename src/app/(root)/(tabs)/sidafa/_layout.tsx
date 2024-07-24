import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import {
  Redirect,
  router,
  Stack,
  useFocusEffect,
  usePathname,
} from "expo-router";
import { useSession } from "@/store/context";

const SidafaLayout = () => {
  const { session, isLoading } = useSession();
  const pathname = usePathname();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  useFocusEffect(() => {
    if (pathname !== "/sidafa/login") {
      if (!session) {
        router.replace("/sidafa/login");
      }
    }
  });
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SidafaLayout;
