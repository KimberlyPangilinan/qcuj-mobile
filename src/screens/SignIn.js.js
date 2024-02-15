import { View, Text, ToastAndroid, ScrollView } from "react-native";
import React, { useState } from "react";
import Layout from "../components/Layout";
import Input from "../components/forms/Input";
import Button from "../components/buttons/Button";
import {  generateFormContent } from "../helpers/constants";

export default function SignIn({ navigation }) {
  const [formStep, setFormStep] = useState(0);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [job, setJob] = useState("");
  const [shift, setShift] = useState("");
  
 const formContent = generateFormContent(
    firstName, 
    lastName,
    contact,
    job,
    shift,
    setFirstName,
    setLastName,
    setContact,
    setJob,
    setShift
)

  const handleBackButton = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    } else {
      navigation.navigate("LandingScreen");
    }
  };
  
  const submitRegistrationForm = () => {
    console.log(firstName, lastName, contact, job)
    ToastAndroid.show('Registration Successful ', ToastAndroid.SHORT);
    navigation.navigate("Home")
  }
  
  return (
    <Layout title="Sign Up" onPress={() => handleBackButton()}>
      <View key={formContent[formStep].id} className="justify-between flex-1">
        <View className="pb-4 border-b-[0.2px] border-slate-300">
          <Text className="text-[16px] font-bold">
            {formContent[formStep].header}
          </Text>
          <Text>{formContent[formStep].subtitle}</Text>
        </View>
        <ScrollView >
          {formContent[formStep].input.map((input, key) => {
            return (
              <Input
                key={key}
                label={input.label}
                onChangeText={input.onchange}
                text={input.value}
                placeholder={input.placeholder}
              />
            );
          })}
        </ScrollView>
        <View>
          {formContent[formStep].isSubmitButton ? (
            <Button title="Submit" onPress={()=> submitRegistrationForm()}/>
          ) : (
            <Button
              title="Continue"
              onPress={() => setFormStep(formStep + 1)}
            />
          )}
        </View>
      </View>
    </Layout>
  );
}
