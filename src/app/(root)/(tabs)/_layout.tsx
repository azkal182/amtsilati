import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/tabBarIcon";
import { useColorScheme } from "nativewind";
import { FontAwesome } from "@expo/vector-icons";

const TabLayout = () => {
  const { colorScheme } = useColorScheme();
  const colorIcon = colorScheme === "light" ? "#64748b" : "#64748b";
  const activeColorIcon = colorScheme === "light" ? "#2dd4bf" : "#0d9488";
  const tabBackgroundColor = colorScheme === "light" ? "#e2e8f0" : "#1e293b";
  const borderTopColor = colorScheme === "light" ? "#e2e8f0" : "#0f172a";

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBackgroundColor,
          borderTopColor: borderTopColor,
        },
        tabBarActiveTintColor: activeColorIcon,
        tabBarInactiveTintColor: colorIcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name={"home"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          headerShown: false,
          title: "Al-Qur'an",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"quran"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sidafa"
        options={{
          title: "Sidafa",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"user-alt"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
