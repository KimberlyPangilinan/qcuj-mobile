import React, { useEffect,useState } from 'react';
import { View, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Layout from '../../components/Layout';
import Button from '../../components/buttons/Button';
import { Item } from './Browse/Browse';
import { getUserId } from '../../helpers/utilities';


export default function Profile({navigation}) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(`https://web-production-cecc.up.railway.app/api/auth/${ await getUserId()}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(user,"dd")
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'Failed to fetch user details');
      }
    }

    fetchUserDetails();
  }, []);
  
  useEffect(() => {
    console.log(user, "dd");
  }, [user]);
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      Alert.alert('Logged out successfully');
      navigation.navigate("SignIn")
      
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };

  return (
    <Layout title="My Profile">
      <View className="border-[0.2px] p-4 rounded my-4">
        <Text className="font-bold text-lg text-custom-blue mb-2">{user.last_name}, {user.first_name} {user.middle_name}.</Text>
        <Text className="mb-2"> {user.role} | {user.field_of_expertise}</Text>
        <Text className="">ORCID: {user.orc_id}</Text>
        <Text className="mb-2">Email: {user.email}</Text>

        <Text className="mb-2">{user.school_name}</Text>
        <View className="flex-row flex-wrap">
            <KeywordItems keywords={user.bio} />
        </View>  
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </Layout>
  );
}