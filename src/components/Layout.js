import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../components/navigation/CustomHeader'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
  
export default function Layout({title, onPress, showHeader = true,children}) {
    const insets = useSafeAreaInsets();
  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}
  >
    {
      showHeader 
        ? <CustomHeader title={title} onPress={onPress} />
        : <></>
    }
    <View className="flex-1 px-[16px]  w-full">
        {children}
    </View>
  </View>
  )
}