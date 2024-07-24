import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { calculatePrayerTimes, getMonthName } from "@/lib/prayTimes";
import { FontAwesome5 } from "@expo/vector-icons";
import { toHijri } from "hijri-converter";
import { isamicDate } from "@/lib/calenderHijri";
import { useColorScheme } from "nativewind";

const JadwalSholat = () => {
  const { top } = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const today = new Date();
  const latitude = -6.3117; // Example coordinates for Jakarta, Indonesia
  const longitude = 110.4542;
  const timezone = 7; // WIB
  const ihthiyat = 2; // 2 minutes for example
  const altitude = 71; // Altitude in meters (example: 0 for sea level)

  const prayerTime = calculatePrayerTimes(
    today,
    latitude,
    longitude,
    timezone,
    ihthiyat,
    altitude
  );

  // Fungsi untuk mendapatkan waktu saat ini dalam format HH:MM
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  // Fungsi untuk mencari waktu sholat terdekat
  const getNextPrayerTime = (jadwalSholat) => {
    const currentTime = getCurrentTime();
    let nextPrayer = null;
    let nextPrayerName = null;

    for (const [prayer, time] of Object.entries(jadwalSholat)) {
      if (time > currentTime) {
        if (nextPrayer === null || time < nextPrayer) {
          nextPrayer = time;
          nextPrayerName = prayer;
        }
      }
    }

    return { name: nextPrayerName, time: nextPrayer } || null;
  };
  //   const nextPrayer = getNextPrayerTime(prayerTime);

  // Fungsi untuk menghitung selisih waktu dalam format HH:MM:SS
  const calculateTimeDifference = (currentTime, nextPrayerTime) => {
    const [hours1, minutes1, seconds1] = currentTime.split(":").map(Number);
    const [hours2, minutes2, seconds2] = nextPrayerTime.split(":").map(Number);

    const date1 = new Date();
    date1.setHours(hours1, minutes1, seconds1, 0);

    const date2 = new Date();
    date2.setHours(hours2, minutes2, 0, 0);
    // @ts-ignore
    const diffInSeconds = (date2 - date1) / 1000;
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const [nextPrayer, setNextPrayer] = useState(getNextPrayerTime(prayerTime));
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  //   console.log(timeLeft);

  useEffect(() => {
    const updateCountdown = () => {
      if (nextPrayer) {
        setTimeLeft(calculateTimeDifference(getCurrentTime(), nextPrayer.time));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  return (
    <View className="bg-slate-100 dark:bg-slate-900 flex-1">
      <View className="bg-teal-500 dark:bg-teal-900">
        <View style={{ paddingTop: top }}>
          <View
            style={{ padding: 15, flexDirection: "row", alignItems: "center" }}
          >
            <Link href={"/"}>
              <View className="flex-row items-center">
                <Ionicons
                  name="chevron-back-outline"
                  size={28}
                  color={"white"}
                />
                <Text className="ml-3 text-white text-2xl">Jadwal Sholat</Text>
              </View>
            </Link>
          </View>
        </View>
      </View>

      {/* header */}
      <View className="bg-teal-500 dark:bg-teal-900 items-center justify-center pt-10 pb-14">
        <View className="flex-row items-center">
          <Ionicons name="location-sharp" size={18} color="red" />
          <Text className="text-slate-200 ml-1">Bangsri, Jepara</Text>
        </View>
        {nextPrayer && (
          <>
            <Text className="text-slate-200 text-3xl font-semibold shadow-md mt-2">
              {`${nextPrayer.name.replace(/^\w/, (c) => c.toUpperCase())} ${
                nextPrayer.time
              } WIB`}
            </Text>
            <Text className="text-slate-200 mt-2 text-xl font-semibold">
              - {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
            </Text>
          </>
        )}
        <View className="w-full items-center justify-between flex-row px-8 mt-10">
          <View className="flex-row items-center gap-x-1">
            <Ionicons name="locate" size={18} color="white" />
            <Text className="text-white">Update</Text>
          </View>
          <Link href={"/qiblat"}>
            <View className="flex-row items-center gap-x-1">
              <Ionicons name="compass-outline" size={18} color="white" />
              <Text className="text-white">Arah Kiblat</Text>
            </View>
          </Link>
        </View>
      </View>
      {/* card jadawl sholat */}
      <View className="px-8 -mt-8">
        <View className="bg-white dark:bg-slate-950 w-full flex-row items-center justify-center px-8 rounded-lg py-4 shadow">
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={colorScheme === "light" ? "#0f172a" : "#f1f5f9"}
          />
          <View className="w-full items-center justify-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">{`${today.getDate()} ${getMonthName(
              today.getMonth()
            )} ${today.getFullYear()}`}</Text>
            <Text className="text-slate-900 dark:text-slate-100">
              {isamicDate(new Date(2024, 6, 21), 0)}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={colorScheme === "light" ? "#0f172a" : "#f1f5f9"}
          />
        </View>
      </View>
      <View className="px-8 mt-5 gap-y-1">
        <View
          className={`flex-row items-center justify-between py-4 px-2 rounded-lg ${
            nextPrayer.name === "imsak" ? "bg-teal-500 dark:bg-teal-900" : ""
          }`}
        >
          <View className="flex-row gap-x-2 items-center">
            <Ionicons
              name="moon-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Imsak
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {prayerTime.imsak}
            </Text>
            <Ionicons
              name="volume-high-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
          </View>
        </View>
        <View
          className={`flex-row items-center justify-between py-4 px-2 rounded-lg ${
            nextPrayer.name === "subuh" ? "bg-teal-500 dark:bg-teal-900" : ""
          }`}
        >
          <View className="flex-row gap-x-2 items-center">
            <Ionicons
              name="moon-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Subuh
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {prayerTime.subuh}
            </Text>
            <Ionicons
              name="volume-high-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
          </View>
        </View>
        <View
          className={`flex-row items-center justify-between py-4 px-2 rounded-lg ${
            nextPrayer.name === "dhuha" ? "bg-teal-500 dark:bg-teal-900" : ""
          }`}
        >
          <View className="flex-row gap-x-2 items-center">
            <Ionicons
              name="moon-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Dhuha
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {prayerTime.dhuha}
            </Text>
            <Ionicons
              name="volume-high-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
          </View>
        </View>
        <View
          className={`flex-row items-center justify-between py-4 px-2 rounded-lg ${
            nextPrayer.name === "zuhur" ? "bg-teal-500 dark:bg-teal-900" : ""
          }`}
        >
          <View className="flex-row gap-x-2 items-center">
            <Ionicons
              name="moon-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Zuhur
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {prayerTime.zuhur}
            </Text>
            <Ionicons
              name="volume-high-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
          </View>
        </View>
        <View
          className={`flex-row items-center justify-between py-4 px-2 rounded-lg ${
            nextPrayer.name === "ashar" ? "bg-teal-500 dark:bg-teal-900" : ""
          }`}
        >
          <View className="flex-row gap-x-2 items-center">
            <Ionicons
              name="moon-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Ashar
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {prayerTime.ashar}
            </Text>
            <Ionicons
              name="volume-high-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
          </View>
        </View>
        <View
          className={`flex-row items-center justify-between py-4 px-2 rounded-lg ${
            nextPrayer.name === "maghrib" ? "bg-teal-500 dark:bg-teal-900" : ""
          }`}
        >
          <View className="flex-row gap-x-2 items-center">
            <Ionicons
              name="moon-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Maghrib
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {prayerTime.maghrib}
            </Text>
            <Ionicons
              name="volume-high-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
          </View>
        </View>
        <View
          className={`flex-row items-center justify-between py-4 px-2 rounded-lg ${
            nextPrayer.name === "isya" ? "bg-teal-500 dark:bg-teal-900" : ""
          }`}
        >
          <View className="flex-row gap-x-2 items-center">
            <Ionicons
              name="moon-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Isya
            </Text>
          </View>
          <View className="flex-row gap-x-2 items-center">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {prayerTime.isya}
            </Text>
            <Ionicons
              name="volume-high-outline"
              size={18}
              color={colorScheme === "light" ? "#0f172a" : "#e2e8f0"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default JadwalSholat;
