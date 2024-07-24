import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");

const QiblatPage = () => {
  const { top } = useSafeAreaInsets();
  const [magnetometerData, setMagnetometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [qiblaDirection, setQiblaDirection] = useState(0);

  useEffect(() => {
    Magnetometer.setUpdateInterval(30); // Update interval in milliseconds
    const subscription = Magnetometer.addListener((data) => {
      setMagnetometerData(data);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const qiblaDir = calculateQiblaDirection(
        location.coords.latitude,
        location.coords.longitude
      );
      setQiblaDirection(qiblaDir);
    })();
  }, []);

  const calculateDirection = () => {
    let { x, y } = magnetometerData;
    let angle = Math.atan2(y, x);
    let degree = angle * (180 / Math.PI);

    if (degree < 0) {
      degree = 360 + degree;
    }

    return Math.round(degree);
  };

  const calculateQiblaDirection = (latitude: any, longitude: any) => {
    const A = 21.4226514 * (Math.PI / 180.0);
    const B = 39.8269916 * (Math.PI / 180.0);
    const C = latitude * (Math.PI / 180.0);
    const D = longitude * (Math.PI / 180.0);

    const direction =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(B - D),
        Math.cos(C) * Math.tan(A) - Math.sin(C) * Math.cos(B - D)
      );
    const qiblah = direction < 0 ? direction + 360 : direction;

    return Math.round(qiblah);
  };

  return (
    <View>
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
                <Text className="ml-3 text-white text-2xl">Arah Kiblat</Text>
              </View>
            </Link>
          </View>
        </View>
      </View>
      <View className="items-center justify-center mt-14">
        <Text style={styles.text}>Kompas</Text>
        <View
          style={styles.compassContainer}
          className="bg-slate-900 rounded-full"
        >
          <Image
            source={require("@/assets/images/compass/compass_bg.png")}
            style={{
              width: width * 0.8,
              height: width * 0.8,
              transform: [{ rotate: `${360 - calculateDirection() + 90}deg` }],
            }}
          />
          <Image
            source={require("@/assets/images/compass/compass.png")}
            resizeMode="cover"
            style={[
              styles.pointer,
              {
                transform: [
                  {
                    rotate: `${qiblaDirection - calculateDirection() + 90}deg`,
                  },
                ],
              },
            ]}
          />
        </View>
        <Text style={styles.degree}>{calculateDirection()}°</Text>
        <Text style={styles.qibla}>Arah Kiblat: {qiblaDirection}°</Text>
      </View>
    </View>
  );
};

export default QiblatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  compassContainer: {
    width: width * 0.8,
    height: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pointer: {
    position: "absolute",
    height: "100%",
    width: 40,
  },
  degree: {
    fontSize: 64,
    color: "red",
    marginTop: 20,
  },
  qibla: {
    fontSize: 24,
    color: "blue",
    marginTop: 10,
  },
});
