import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Layout from '../../components/Layout';

export default function Profile({navigation}) {
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      // Optionally, navigate to the login screen or perform any other necessary actions after logout
      Alert.alert('Logged out successfully');
      navigation.navigate("SignIn")
      
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };

  return (
    <Layout>
      <Button title="Logout" onPress={handleLogout} />
    </Layout>
  );
}