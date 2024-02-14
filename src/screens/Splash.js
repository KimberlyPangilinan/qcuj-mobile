import React, { useEffect } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

const image = require("../../assets/images/logo.png")
const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LandingScreen");
    }, 4000);
  }, [navigation]);

  return (
    <View className="justify-center items-center flex-1 ">
      <Animatable.Image
        source={image}
        className="w-14 h-14"
        duration={2000}
        animation={"pulse"}
      />
      <Animatable.Text className="text-[#1B4242] text-[20px] font-bold" duration={2000} animation={"pulse"}>
        Welcome to QCUJ
      </Animatable.Text>
    </View>
  );
};

export default Splash;