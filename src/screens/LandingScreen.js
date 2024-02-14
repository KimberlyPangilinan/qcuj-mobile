import { View, Text } from 'react-native'
import React from 'react'
import Button from '../components/buttons/Button'
import Logo from '../components/Logo'
import SecondaryButton from '../components/buttons/SecondaryButton'

export default function LandingScreen({navigation}) {
  return (
    <View className="px-[16px] justify-around flex-1 ">
      <View className="items-center">
          <Logo/>
          <Text className="mt-2 font-bold text-[16px]">Quezon City University Journals</Text>
          <Text className="text-[16px]">Create your research account</Text>
      </View>
      <View>
          <Button title="Let's create an Account"
          onPress={() => navigation.navigate('Signup')}
          />
          <Text className="text-xs text-center my-1"> ---- or ----</Text>
          <SecondaryButton 
              title="Sign in" 
              onPress={() => navigation.navigate('HomeStack')}
          />
      </View>
    </View>
  )
}