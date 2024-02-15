import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import Splash from "./src/screens/Splash";
import SignUp from "./src/screens/SignUp";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store.js";
import Article from "./src/screens/User/Browse/Article.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Browse from "./src/screens/User/Browse/Browse.js";
import Saved from "./src/screens/User/Saved.js";
import Profile from "./src/screens/User/Profile.js";
import Index from "./src/screens/User/Index.js";
import SignIn from "./src/screens/SignIn.js";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Feed"
        component={Index}
        options={{
          tabBarLabel: "My Feed",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={16} />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarLabel: "Browse",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={16} />
          ),
        }}
      />
       <Tab.Screen name="Saved" component={Saved} 
       options={{
        tabBarLabel: "Saved",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bookmark" color={color} size={16} />
        ),
      }}
      />
      <Tab.Screen name="Profile" component={Profile} 
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
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="Article" component={Article} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}