import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function bukuSantri() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View className="bg-teal-500 dark:bg-teal-900">
        <View style={{ paddingTop: top }}>
          <View className="flex-row p-4 items-center">
            <Link href={"/"}>
              <View className="flex-row items-center">
                <Ionicons
                  name="chevron-back-outline"
                  size={28}
                  color={"white"}
                />
                <Text className="ml-3 text-white text-2xl">Buku Santri</Text>
              </View>
            </Link>
          </View>
        </View>
      </View>

      <View className="p-5">
        <View
          className="flex-row rounded-[10px] items-center bg-white mb-4"
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View className="bg-teal-400/25 h-full flex-row items-center px-4 rounded-l-[10px]">
            <Text className="items-center font-bold text-teal-600">1</Text>
          </View>
          <View className="p-4">
            <Text>Maulid</Text>
            <Text>29 Bacaan</Text>
          </View>
        </View>

        <View
          className="flex-row rounded-[10px] items-center bg-white mb-4"
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View className="bg-teal-400/25 h-full flex-row items-center px-4 rounded-l-[10px]">
            <Text className="items-center font-bold text-teal-600">2</Text>
          </View>
          <View className="p-4">
            <Text>Maulid Berjanji</Text>
            <Text>20 Bacaan</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
