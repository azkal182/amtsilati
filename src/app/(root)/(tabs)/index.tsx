import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import GridView from "@/components/gridView";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

const menuItems = [
  { title: "Al-Qur'an", icon: "quran", link: "/quran" },
  { title: "Buku Santri", icon: "pray", link: "/buku-santri" },
  { title: "Jadwal Sholat", icon: "clock", link: "/jadwal-sholat" },
  { title: "Kiblat", icon: "kaaba", link: "/qiblat" },
  { title: "Tahlil & Yasin", icon: "book-reader", link: "/tahlil-yasin" },
  { title: "Maulid", icon: "book-open", link: "/maulid" },
  {
    title: "Kalkulator Zakat",
    icon: "hand-holding-heart",
    link: "/kalkulator-zakat",
  },
  { title: "Lain-Lain", icon: "microsoft", link: "/" },
];

const HEADER_HEIGHT = 70;
const Home = () => {
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { top } = useSafeAreaInsets();

  const headerOpacity = scrollY.interpolate({
    // inputRange: [HEADER_HEIGHT - 10, HEADER_HEIGHT],
    inputRange: [125, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const colorIcon = colorScheme === "light" ? "#0f172a" : "#cbd5e1";

  const onRefresh = () => {
    setRefreshing(true);
    console.log("Refreshing...");
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
      console.log("Refresh complete");
    }, 2000);
  };
  return (
    <View>
      <Animated.View
        style={{
          opacity: headerOpacity,
          height: HEADER_HEIGHT + top,
          paddingTop: top,
        }}
        className={
          "absolute top-0 left-0 right-0 bg-teal-500 dark:bg-teal-900 justify-center items-center z-[1000] px-6"
        }
      >
        <View className="bg-white w-full py-2 px-3 rounded-lg flex-row items-center justify-between">
          <Text
            style={{ fontFamily: "Roboto_400Regular" }}
            className="text-slate-900 font-bold text-xl"
          >
            Amtsilati
          </Text>
          <View>
            <Text
              style={{ fontFamily: "Roboto_400Regular" }}
              className="text-slate-900 font-bold"
            >
              Subuh 04:34 WIB
            </Text>
            <Text
              style={{ fontFamily: "Roboto_500Medium" }}
              className="text-slate-600 text-right"
            >
              - 07:14:46
            </Text>
          </View>
        </View>
      </Animated.View>
      <Animated.ScrollView
        //   alwaysBounceHorizontal={false}
        alwaysBounceVertical={true}
        //   bounces={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ff0000"]}
            progressBackgroundColor="#ffffff"
          />
        }
        // contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        className="bg-slate-100 dark:bg-slate-900"
      >
        {/* banner */}
        <View className="h-72 bg-teal-500 dark:bg-teal-900 rounded-bl-[50px] items-center justify-center">
          <Text className="text-slate-800 dark:text-slate-200 text-3xl">
            Amtsilati
          </Text>
        </View>
        {/* menu */}
        <View className="px-3 mt-6">
          <GridView
            col={4}
            data={menuItems}
            renderItem={(item) => (
              <Link href={item.link}>
                <View className="items-center aspect-square justify-center">
                  <View className="aspect-square w-20 rounded-xl items-center justify-center bg-teal-400/25 dark:bg-slate-800">
                    <FontAwesome5
                      name={item.icon}
                      size={28}
                      color={colorIcon}
                    />
                  </View>
                  <Text
                    style={{ fontFamily: "Roboto_500Medium" }}
                    className="mt-1 text-slate-900 dark:text-slate-300"
                  >
                    {item.title}
                  </Text>
                </View>
              </Link>
            )}
          />
        </View>
        {/* article */}
        <View className="mt-4 px-6">
          {/* header */}
          <View className="flex-row items-center justify-between">
            <Text
              style={{ fontFamily: "Roboto_500Medium" }}
              className="text-3xl text-slate-900 dark:text-slate-300"
            >
              Headline
            </Text>
            <FontAwesome5 name="chevron-right" size={18} color="black" />
          </View>

          {/* list article */}
          <View className="gap-5 mt-3">
            {Array.from(Array(5).keys()).map((item) => (
              <View
                key={item}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 5,
                }}
                className="flex-row p-3 rounded-xl w-full bg-white dark:bg-slate-800"
              >
                <View className="w-32 aspect-square overflow-hidden items-center justify-center rounded-lg shadow-md">
                  <Image
                    resizeMode="center"
                    className="aspect-square"
                    source={require("@/assets/images/masjid.jpg")}
                  />
                </View>
                <View className="flex-1 pl-4">
                  <Text
                    style={{ fontFamily: "Roboto_500Medium" }}
                    className="text-xl leading-tight text-slate-900 dark:text-slate-200"
                  >
                    Discover 22 Mobile Blog designs on Dribbble
                  </Text>
                  <Text
                    style={{ fontFamily: "Roboto_400Regular" }}
                    className="flex-wrap text-slate-600 dark:text-slate-400 mt-1"
                    numberOfLines={3}
                  >
                    Continue reading to add tabs to an existing project or to
                    customize your app's tabs to an existing project or to.
                  </Text>
                  <Text className="text-right mt-2 text-slate-600 dark:text-slate-400">
                    Posted, 20/05/2024
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
