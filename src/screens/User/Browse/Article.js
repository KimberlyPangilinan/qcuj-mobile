import { View, Text , SafeAreaView, ScrollView, Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetArticleByIdQuery } from "../../../services/article";
import Layout from "../../../components/Layout";
import ContributorItems from '../../../components/articles/ContributorItems';
import KeywordItems from '../../../components/articles/KeywordItems';
import Button from "../../../components/buttons/Button";
import { Item } from './Browse';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserId } from '../../../helpers/utilities';

export default function Article({ route, navigation }) {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState();
  useEffect(() => {
    const fetchUserId = async () => {
        try {
            const userId = await getUserId()
            if (userId) {
                setUserId(userId)
            } else {
                navigation.navigate("SignIn")
            }
        } catch (error) {
            console.error('Error retrieving userid:', error);
        }
    };

    fetchUserId();
}, []);
    const [savedArticles, setSavedArticles] = useState([])
    const { itemId, savedArticle } = route.params;
    const { data, error, isLoading } = useGetArticleByIdQuery({ 
        inputLogs: { author_id: userId, article_id: itemId },
      });
      async function saveOffline(articleToSave) {
        try {
          // Retrieve savedArticles from AsyncStorage
          const savedArticles = await AsyncStorage.getItem('savedArticles');
          // Parse savedArticles or initialize an empty array if it's null or undefined
          const parsedArticles = savedArticles ? JSON.parse(savedArticles) : [];
          if (parsedArticles.length >= 5) {
            Alert.alert('Save offline limit reached', 'Remove articles to save new');
            return;
          }
          const existingArticle = parsedArticles.find(article => article.article_id === articleToSave.article_id);
          
          if (existingArticle) {
            // If the article with the same article_id exists, alert the user
            Alert.alert('Article already saved', 'This article has already been saved.');
          } else {
            // If the article with the same article_id does not exist, add it to the saved articles
            parsedArticles.push(articleToSave);
            // Save updated articles back to AsyncStorage
            await AsyncStorage.setItem('savedArticles', JSON.stringify(parsedArticles));
            Alert.alert('Article saved successfully');
          }
        } catch (error) {
          console.error('Error saving article:', error);
          Alert.alert('Error', 'Failed to save article.');
        }
      }
    useEffect(() => {
      const updateSavedArticles = async () => {
        const articles = await AsyncStorage.getItem('savedArticles');
        setSavedArticles(articles ? JSON.parse(articles) : []);
      };
      
      updateSavedArticles();
    }, []);
    
    async function removeOffline(articleToRemove) {
      try {
          const savedArticles = await AsyncStorage.getItem('savedArticles');
         const parsedArticles = savedArticles ? JSON.parse(savedArticles) : [];
          const existingArticleIndex = parsedArticles.findIndex(article => article.article_id === articleToRemove.article_id);
          
          if (existingArticleIndex !== -1) {
              parsedArticles.splice(existingArticleIndex, 1);
              await AsyncStorage.setItem('savedArticles', JSON.stringify(parsedArticles));
              Alert.alert('Article removed successfully');
          } else {
              Alert.alert('Article not found', 'The article to remove was not found in offline storage.');
          }
      } catch (error) {
          console.error('Error removing article:', error);
          Alert.alert('Error', 'Failed to remove article.');
      }
  }
      
  return (
    <Layout onPress={() => navigation.goBack()}>
      {error ? (
                <ScrollView>
                <Text className="mt-4 font-bold text-lg text-custom-blue">
                  {savedArticle.title}
                </Text>
                <Text className="mt-4">{savedArticle.article_id}</Text>
      
      
                <Text className="text-slate-600 text-[16px]">
                  Published in {savedArticle.journal}
                </Text>
                <ContributorItems
                  contributors={savedArticle.contributors}
                />
                <Text>{savedArticle.publication_date}</Text>
                <Text className="mt-8 mb-4 text-justify text-[16px] ">
                  {savedArticle.abstract}
                </Text>
                <View className="flex-row flex-wrap">
                  <KeywordItems keywords={savedArticle.keyword} />
                </View>
                <View className="flex-row justify-between my-4">
                  <View className="items-center">
                    <Text className="font-bold">
                      {savedArticle.total_downloads}
                    </Text>
                    <Text>Total Downloads</Text>
                  </View>
                  <View className="items-center">
                    <Text>{savedArticle.total_reads}</Text>
      
                    <Text>Total Reads</Text>
                  </View>
                  <View className="items-center">
                    <Text>{savedArticle.total_citations}</Text>
      
                    <Text>Total Downloads</Text>
                  </View>
                </View>
                <View className="flex-row">
                  <Button title="Remove offline" onPress={()=>removeOffline(savedArticle)}/><Text> </Text>
                </View>
            
              </ScrollView>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <ScrollView>
          <Text className="mt-4 font-bold text-lg text-custom-blue">
            {data.selected_article[0].title}
          </Text>
          <Text className="mt-4">{data.selected_article[0].article_id}</Text>


          <Text className="text-slate-600 text-[16px]">
            Published in {data.selected_article[0].journal}
          </Text>
          <ContributorItems
            contributors={data.selected_article[0].contributors}
          />
          <Text>{data.selected_article[0].publication_date}</Text>
          <Text className="mt-8 mb-4 text-justify text-[16px] ">
            {data.selected_article[0].abstract}
          </Text>
          <View className="flex-row flex-wrap">
            <KeywordItems keywords={data.selected_article[0].keyword} />
          </View>
          <View className="flex-row justify-between my-4">
            <View className="items-center">
              <Text className="font-bold">
                {data.selected_article[0].total_downloads}
              </Text>
              <Text>Total Downloads</Text>
            </View>
            <View className="items-center">
              <Text>{data.selected_article[0].total_reads}</Text>

              <Text>Total Reads</Text>
            </View>
            <View className="items-center">
              <Text>{data.selected_article[0].total_citations}</Text>

              <Text>Total Downloads</Text>
            </View>
          </View>
          <View className="flex-row">
            <Button title="Save offline" onPress={()=>saveOffline(data.selected_article[0])}/><Text> </Text>
            <SecondaryButton title="Download article"/>
          </View>
        { data.recommendations.length != 0 &&
        <>
          <Text className="mt-8 font-bold text-lg">
            More Articles like this
          </Text>
          <Item  
            title={data.recommendations[0].title}
            id={data.selected_article[0].article_id}
            abstract={data.recommendations[0].abstract}
            navigation={navigation}
          /></>}
        </ScrollView>
      ) : null}
    </Layout>
  );
}