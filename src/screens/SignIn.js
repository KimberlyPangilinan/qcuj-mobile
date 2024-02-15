import { View, Text, ToastAndroid, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Input from "../components/forms/Input";
import Button from "../components/buttons/Button";
import * as SecureStore from 'expo-secure-store';
import { useIsFocused, useNavigation } from "@react-navigation/native";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function SignIn({ navigation }) {
  const navigation1 = useNavigation();
  const isFocused = useIsFocused(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    const getToken = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            if (token) {
                console.log('Token available:', token);
                navigation.navigate("HomeStack");
            } else {
                console.log('Token not available');
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    getToken();
}, [navigation1, isFocused]);

  const submitRegistrationForm = () => {
 
    const loginData = {
      email: email,
      password: password
    };
  
    fetch(`https://web-production-cecc.up.railway.app/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data here
        ToastAndroid.show('Login Successful ', ToastAndroid.SHORT);
        navigation.navigate("HomeStack")
        save("token",data.token)
    })
    .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
    });
  }
  
  return (
    <Layout title="Sign In" onPress={() => navigation.goBack()}>
      <View  className="justify-between flex-1">
        <View className="pb-4 border-b-[0.2px] border-slate-300">
          <Text className="text-[16px] font-bold">
            
          </Text>
        </View>
        <ScrollView >
              <Input
                label="Email"
                onChangeText={setEmail}
                text={email}
                placeholder={"Enter email address"}
              />
              <Text></Text>
                <Input
                type="password"
                label="Password"
                onChangeText={setPassword}
                text={password}
                placeholder={"Enter password"}
              />
        </ScrollView>
        <View>
            <Button title="Submit" onPress={()=> submitRegistrationForm()}/>
        </View>
      </View>
    </Layout>
  );
}
