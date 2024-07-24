import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { useSession } from "@/store/context";
import { router } from "expo-router";

const Login = () => {
  const [key, setKey] = useState(0);
  const { colorScheme } = useColorScheme();
  const { signIn } = useSession();

  useFocusEffect(
    React.useCallback(() => {
      // Reset the key to force re-render and re-trigger animations
      setKey((prevKey) => prevKey + 1);
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-slate-100 dark:bg-slate-900 flex-1">
          <Image
            source={
              colorScheme === "dark"
                ? require("../../../../assets/images/bg-dark.png")
                : require("../../../../assets/images/bg-light.png")
            }
            resizeMode="stretch"
            className="h-[370px] w-full absolute"
          />
          {/* light */}
          <View className="flex-row justify-around w-full absolute">
            <Animated.Image
              key={`lamp1-${key}`} // Unique key to re-trigger animation
              entering={FadeInUp.delay(200).duration(1000).springify()}
              className="h-[225px] w-[90px]"
              source={require("../../../../assets/images/lampu.png")}
            />
            <Animated.Image
              key={`lamp2-${key}`} // Unique key to re-trigger animation
              entering={FadeInUp.delay(400).duration(1000).springify()}
              className="h-[160px] w-[60px]"
              source={require("../../../../assets/images/lampu.png")}
            />
          </View>

          {/* title and form */}
          <View className="h-full w-full flex justify-around pt-52 pb-10">
            {/* title */}
            <View className="flex items-center">
              <Animated.Text
                key={`title-${key}`} // Unique key to re-trigger animation
                entering={FadeInUp.duration(1000).springify()}
                className="text-white font-bold tracking-wider text-5xl"
              >
                Login
              </Animated.Text>
            </View>
            {/* form */}
            <View className="flex items-center mx-4 space-y-4">
              <Animated.View
                key={`input1-${key}`} // Unique key to re-trigger animation
                entering={FadeInUp.duration(1000).springify()}
                className="bg-slate-200 rounded-2xl w-full"
              >
                <TextInput
                  className="p-5 "
                  placeholder="NIS"
                  placeholderTextColor={"gray"}
                />
              </Animated.View>
              <Animated.View
                key={`input2-${key}`} // Unique key to re-trigger animation
                entering={FadeInUp.delay(200).duration(1000).springify()}
                className="bg-slate-200 rounded-2xl w-full mt-4"
              >
                <TextInput
                  className="p-5 "
                  placeholder="password"
                  placeholderTextColor={"gray"}
                  secureTextEntry={true}
                />
              </Animated.View>
              <Animated.View
                key={`button-${key}`} // Unique key to re-trigger animation
                entering={FadeInUp.delay(400).duration(1000).springify()}
                className="w-full"
              >
                <TouchableOpacity
                  onPress={() => {
                    signIn();
                    router.replace("/sidafa");
                  }}
                  className="w-full bg-teal-500 dark:bg-teal-900 p-3 rounded-2xl mt-8"
                >
                  <Text className="text-xl font-bold text-white text-center">
                    Login
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
