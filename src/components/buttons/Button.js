import { Text, View, Pressable } from "react-native";
import React from "react";

export default function Button({ title, onPress }) {
  return (
    <Pressable
      className="items-center p-3 my-1 rounded bg-custom-blue"
      onPress={onPress}
    >
      <Text className="text-sm text-slate-100">{title}</Text>
    </Pressable>
  );
}
