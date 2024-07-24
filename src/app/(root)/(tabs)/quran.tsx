import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { getListSurahs } from "@/helper/quran";
import { FontAwesome } from "@expo/vector-icons";
import { toArabic } from "@/utils";

const Quran = () => {
  const { top } = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listSurah = getListSurahs();

  const handleSelectChange = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <View className="flex-1 bg-slate-100 dark:bg-slate-900">
      {/* header */}
      <View
        style={{ paddingTop: top }}
        className="bg-teal-500 dark:bg-teal-900 pb-4"
      >
        <Text
          style={{ fontFamily: "Roboto_500Medium" }}
          className="text-3xl px-6 text-white"
        >
          Al Qur'an
        </Text>
        <View className="w-full px-6 mt-4">
          <SegmentedControl
            values={["Surah", "Juz"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              handleSelectChange(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
      </View>
      {/* content */}
      <View className="pt-6 px-6">
        {selectedIndex === 0 ? (
          <View>
            <View className="flex-row items-center px-4 py-1 bg-white dark:bg-slate-700  rounded-xl">
              <FontAwesome
                name="search"
                size={20}
                color="#6B7280"
                style={{ marginRight: 5 }}
              />
              <TextInput
                placeholder="Cari Nama Surah"
                className="flex-1 h-10 bg-white dark:bg-slate-700 p-3 text-lg"
              />
            </View>
            <ScrollView className="pt-6 mb-60 px-2">
              {listSurah?.map((item: any, index: number) => (
                <View key={item.number}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      gap: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{ fontSize: 32, fontFamily: "Utsmani" }}
                      className="text-slate-900 dark:text-slate-400"
                    >
                      {toArabic(item.number)}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          //   fontWeight: "400",
                          fontSize: 16,
                          fontFamily: "Roboto_400Regular",
                        }}
                        className="text-slate-900 dark:text-slate-400"
                      >
                        {item.surahName.transliteration.id}
                      </Text>
                      <Text
                        style={{
                          color: "brown",
                          fontFamily: "Roboto_400Regular",
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >{`${item.surahName.translation.id} (${item.numberOfAyahs} ayat)`}</Text>
                    </View>
                    <Text
                      className="text-slate-900 dark:text-slate-400"
                      style={{ fontFamily: "SurahNames", fontSize: 20 }}
                    >
                      {item.surahName.short}
                    </Text>
                  </View>
                  {index < listSurah.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        marginVertical: 5,
                      }}
                      className="bg-slate-200 dark:bg-slate-800"
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        ) : selectedIndex === 1 ? (
          <View className="flex-row items-center px-4 py-1 bg-white dark:bg-slate-700 rounded-xl">
            <FontAwesome
              name="search"
              size={20}
              color="#6B7280"
              style={{ marginRight: 5 }}
            />
            <TextInput
              placeholder="Cari Nama Juz"
              className="flex-1 h-10 bg-white dark:bg-slate-700 p-3 text-lg"
            />
          </View>
        ) : (
          <Text>{selectedIndex}</Text>
        )}
      </View>
    </View>
  );
};

export default Quran;
