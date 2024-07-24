import React from "react";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="tahlil-yasin" options={{ headerShown: false }} />
      <Stack.Screen name="maulid" options={{ headerShown: false }} />
      <Stack.Screen name="jadwal-sholat" options={{ headerShown: false }} />
      <Stack.Screen name="qiblat" options={{ headerShown: false }} />
      <Stack.Screen name="buku-santri" options={{ headerShown: false }} />
      <Stack.Screen name="kalkulator-zakat" options={{ headerShown: false }} />
    </Stack>
  );
}
