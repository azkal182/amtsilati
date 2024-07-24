import { useFonts } from "expo-font";
import "../global.css";
import { Slot } from "expo-router";
import { SessionProvider } from "@/store/context";

export default function Layout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
