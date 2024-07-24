import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSession } from "@/store/context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GridView from "@/components/gridView";

const menuItems = [
  { title: "Tabungan", icon: "quran" },
  { title: "Syahriyah", icon: "pray" },
  { title: "Kesehatan", icon: "clock" },
];

const SidafaScreen = () => {
  const { signOut } = useSession();
  const { top } = useSafeAreaInsets();
  return (
    <View className="flex-1" style={{ paddingTop: top }}>
      <View className="bg-teal-500 dark:bg-teal-900 h-52 m-4 rounded-xl p-6">
        <Text
          className="text-white text-3xl font-semibold"
          style={{ fontFamily: "Roboto_500Medium" }}
        >
          Abdul Wahid Romadani
        </Text>
        <View className="flex-row items-center mt-4">
          <Text
            style={{ fontFamily: "Roboto_500Medium" }}
            className="text-white text-xl w-16"
          >
            Saldo
          </Text>
          <Text
            style={{ fontFamily: "Roboto_500Medium" }}
            className="text-white text-xl w-16"
          >
            : Rp.0
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text
            style={{ fontFamily: "Roboto_500Medium" }}
            className="text-white text-xl w-16"
          >
            UPT
          </Text>
          <Text
            style={{ fontFamily: "Roboto_500Medium" }}
            className="text-white text-xl w-16"
          >
            : Rp.0
          </Text>
        </View>
        <Text className="mt-6 text-right text-white text-3xl font-semibold">
          2.1.1.A2300090405
        </Text>
      </View>
      {/* menu item */}
      <View className="px-3">
        <GridView
          col={3}
          data={menuItems}
          renderItem={(item) => (
            <View className="items-center aspect-video justify-center ">
              <View className="aspect-video w-[95%] rounded-xl items-center justify-center bg-teal-400/25 dark:bg-slate-800">
                <Text
                  style={{ fontFamily: "Roboto_500Medium" }}
                  className="mt-1 text-slate-900 dark:text-slate-300"
                >
                  {item.title}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View className="mx-8 mt-auto mb-4">
        <Pressable
          className="p-4 bg-teal-500 dark:bg-teal-900 rounded-2xl"
          onPress={() => {
            signOut();
          }}
        >
          <Text className="text-white text-center">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SidafaScreen;
