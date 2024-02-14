import React from "react";
import { Text, View } from "react-native";
import Button from "./src/components/buttons/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import Splash from "./src/screens/Splash";
import SignUp from "./src/screens/SignUp";
import { StatusBar } from "expo-status-bar";
import Home from "./src/screens/Home.js";
import { Provider } from "react-redux";
import { store } from "./src/store.js";
import Article from "./src/screens/Article.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={16} />
          ),
        }}
      />
       <Tab.Screen name="History" component={SignUp} 
       options={{
        tabBarLabel: "History",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bookmark" color={color} size={16} />
        ),
      }}
      />
      <Tab.Screen name="Profile" component={SignUp} 
       options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={16} />
        ),
      }}
      />
     
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="Article" component={Article} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}