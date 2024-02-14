import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
export default function CustomHeader({title,onPress}) {
  return (
    <View className="flex-row justify-between items-center w-full px-[16px] py-2">
      <Pressable onPress={onPress}>
        <AntDesign name="left" size={16} color="black" />
      </Pressable>
      <Text className="font-bold text-[16px]">{title}</Text>
    </View>
  )
}