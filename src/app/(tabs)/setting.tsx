import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, FlatList } from "react-native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons"; // Pastikan kamu telah menginstal @expo/vector-icons
import { useSafeAreaInsets } from "react-native-safe-area-context";

const settingsData = [
  { id: "1", title: "Account", type: "link" },
  { id: "2", title: "Notifications", type: "switch" },
  { id: "3", title: "Privacy", type: "link" },
  { id: "4", title: "Dark Mode", type: "switch" },
];

const SettingsItem = ({ title, type, value, onValueChange }) => {
  return (
    <View className="flex-row justify-between items-center py-4 px-6 border-b border-gray-300 dark:border-gray-700">
      <Text className="text-lg dark:text-white">{title}</Text>
      {type === "switch" ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="gray" />
      )}
    </View>
  );
};

const Settings = () => {
  const { top } = useSafeAreaInsets();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    colorScheme === "dark"
  );

  const toggleNotifications = () =>
    setIsNotificationsEnabled((prevState) => !prevState);
  const toggleDarkMode = () => {
    setIsDarkModeEnabled((prevState) => !prevState);
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  const renderItem = ({ item }) => {
    const value =
      item.type === "switch"
        ? item.title === "Notifications"
          ? isNotificationsEnabled
          : isDarkModeEnabled
        : undefined;
    const onValueChange =
      item.type === "switch"
        ? item.title === "Notifications"
          ? toggleNotifications
          : toggleDarkMode
        : undefined;

    return (
      <SettingsItem
        title={item.title}
        type={item.type}
        value={value}
        onValueChange={onValueChange}
      />
    );
  };

  return (
    <View className="flex-1 bg-slate-100 dark:bg-slate-900">
      <View
        style={{ paddingTop: top }}
        className="bg-teal-500 dark:bg-teal-900 pb-4"
      >
        <Text
          style={{ fontFamily: "Roboto_500Medium" }}
          className="text-3xl px-6"
        >
          Settings
        </Text>
      </View>
      <FlatList
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Settings;
