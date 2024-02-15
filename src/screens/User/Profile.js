import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Layout from '../../components/Layout';
import Button from '../../components/buttons/Button';

export default function Profile({navigation}) {
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
      <Button title="Logout" onPress={handleLogout} />
    </Layout>
  );
}