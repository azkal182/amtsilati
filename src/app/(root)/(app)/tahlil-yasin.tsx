import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Link } from "expo-router";
import tahlil from "@/data/tahlil.json";
import yasin from "@/data/yasin.json";
import { toArabic } from "@/utils";
import { useColorScheme } from "nativewind";

const TahlilYasin = () => {
  const { top } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <View className="flex-1 bg-slate-100">
      <View
        style={{ paddingTop: top + 10 }}
        className="flex-row bg-teal-500 dark:bg-teal-900 p-4 items-center"
      >
        <Link href={"/"}>
          <View>
            <Ionicons name="chevron-back-outline" size={28} color={"white"} />
          </View>
        </Link>
        <View
          className="bg-slate-100"
          style={{
            flex: 1,
            marginHorizontal: 15,
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <SegmentedControl
            backgroundColor={colorScheme === "dark" ? "#0f172a" : ""}
            fontStyle={{ color: colorScheme === "dark" ? "#f1f5f9" : "" }}
            values={["Tahlil", "Yasin"]}
            selectedIndex={selectedIndex}
            onChange={(event) => {
              handleIndexChange(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          aA
        </Text>
      </View>
      <View style={styles.content}>
        {selectedIndex === 0 ? (
          //   <ScrollView>
          //     {tahlil.map((item: any) => (
          //       <Text
          //         style={{
          //           writingDirection: "rtl",
          //           fontFamily: "Utsmani",
          //           fontSize: 24,
          //         }}
          //       >
          //         {item.textArab}
          //       </Text>
          //     ))}
          //   </ScrollView>
          <FlatList
            data={tahlil}
            renderItem={({ item }) => (
              <View>
                <Text
                  style={{
                    writingDirection: "rtl",
                    fontFamily: "Utsmani",
                    fontSize: 27,
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                  }}
                >
                  {item.textArab}
                </Text>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                ></View>
              </View>
            )}
          />
        ) : selectedIndex === 1 ? (
          <FlatList
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
            data={yasin.verses}
            renderItem={({ item }) => (
              <View>
                <View
                  //   style={{
                  //     flexDirection: "row",
                  //     direction: "rtl",
                  //     justifyContent: "space-between",
                  //     alignItems: "center",
                  //   }}
                  style={{
                    direction: "rtl",
                  }}
                  className="flex px-3 flex-row items-center justify-between w-full"
                >
                  <Text
                    style={{
                      writingDirection: "rtl",
                      fontFamily: "Utsmani",
                      fontSize: 27,
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                      width: "95%",
                    }}
                  >
                    {item.text.arab}{" "}
                    <Text style={{ fontSize: 32 }}>
                      {toArabic(item.number.inSurah)}
                    </Text>
                  </Text>
                  <Text style={{ paddingRight: 10 }} className="w-5">
                    <FontAwesome name="ellipsis-v" size={28} />
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                ></View>
              </View>
            )}
          />
        ) : (
          <Text>tab Tahlil</Text>
        )}
      </View>
    </View>
  );
};

export default TahlilYasin;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "white",
  },
  statusBar: {
    backgroundColor: "#1a9183",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  content: {},
});
