import React, { useEffect } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import * as SecureStore from 'expo-secure-store';
import { useIsFocused, useNavigation } from "@react-navigation/native";

const image = require("../../assets/images/logo.png")
const Splash = ({ navigation }) => {
  const navigation1 = useNavigation();
  const isFocused = useIsFocused(); 
 
  useEffect(() => {
    
    const getToken = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                console.log('Token available:', token);
                navigation.navigate("HomeStack");
            } else {
                navigation.navigate("LandingScreen");
                console.log('Token not available');
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };
  setTimeout(() => {
    getToken();
  }, 4000);
    
}, [navigation1, isFocused]);
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