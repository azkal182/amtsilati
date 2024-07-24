import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import GridView from "@/components/gridView";

const menuItems = [
  { title: "Zakat Pertanian Tanaman Pangan", link: "" },
  { title: "Zakat Perdagangan", link: "" },
  { title: "Zakat Simpan Emas, Perak, dan Perhiasan", link: "" },
  { title: "Zakat Tambak", link: "" },
  { title: "Zakat Tanaman Produktif", link: "" },
  { title: "Zakat Peternakan", link: "" },
  { title: "Zakat Perusahaan", link: "" },
  { title: "Zakat Properti", link: "" },
  { title: "Zakat Profesi", link: "" },
];

export default function kalkulatorZakat() {
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
                <Text className="ml-3 text-white text-2xl">
                  Kalkulator Zakat
                </Text>
              </View>
            </Link>
          </View>
        </View>
      </View>
      <View className="px-3 mt-2">
        <GridView
          col={2}
          data={menuItems}
          renderItem={(item) => (
            // <View className="p-1 items-center aspect-video justify-center">
            //   <View className="shadow-lg rounded-lg p-4 h-full w-full">
            //     <Text>{item.title}</Text>
            //   </View>
            // </View>
            <View className="p-2 aspect-video">
              <View
                className="w-full h-full p-4 rounded-[10px] bg-white"
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Text className="text-xl font-semibold">{item.title}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
