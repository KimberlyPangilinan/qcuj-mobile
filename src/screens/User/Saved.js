import { View, Text , SafeAreaView, ScrollView, Alert, } from 'react-native'
import React, { useState,useEffect } from 'react'

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../../components/Layout';
import { Item } from './Browse/Browse';
import { useIsFocused, useNavigation } from '@react-navigation/native';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function Saved({ route, navigation }) {

  const [savedArticles, setSavedArticles] = useState([]);
  const navigation1 = useNavigation();
  const isFocused = useIsFocused(); 
  useEffect(() => {
    // Function to load data from AsyncStorage
    const loadData = async () => {
      try {
        const savedArticlesJson = await AsyncStorage.getItem('savedArticles');
        if (savedArticlesJson) {
          const savedArticlesArray = JSON.parse(savedArticlesJson);
          setSavedArticles(savedArticlesArray);
        }
      } catch (error) {
        console.error('Error loading saved articles:', error);
        Alert.alert('Error', 'Failed to load saved articles.');
      }
    };

    loadData();

    return () => {
    };
  }, [navigation1, isFocused]); 

  return (
    <Layout title="My Saved Articles">
      <ScrollView>
        {savedArticles.map((article, index) => (
          <Item key={index} title={article.title} abstract={article.abstract.slice(0,200)} savedArticle={article} navigation={navigation}/>
        ))}
      </ScrollView>
    </Layout>
  );
};
