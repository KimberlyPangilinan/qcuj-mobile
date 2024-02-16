import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Layout from '../../components/Layout'
import { Image } from "react-native";
import { useGetRecommendationsBasedCategoryQuery, useGetRecommendationsBasedHistoryQuery } from '../../services/recommendation';
import { Item } from './Browse/Browse';
import * as SecureStore from 'expo-secure-store';
import { getUserId } from '../../helpers/utilities';
const image = require("../../../assets/images/logo.png");


export default function Index({navigation}) {

    const [token, setToken] = React.useState('');
    const [userId, setUserId] = React.useState();
    React.useEffect(() => {
        const getToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('token');
                const userId = await getUserId()
                if (token) {
                    setToken(token);   
                    setUserId(userId)
                } else {
                    navigation.navigate("SignIn")
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
        };

        getToken();
    }, []);
    const { data: data1, error: error1, isLoading: isLoading1 } = useGetRecommendationsBasedHistoryQuery(userId);
    const { data: data2, error: error2, isLoading: isLoading2 } = useGetRecommendationsBasedCategoryQuery("publication_date");
    const { data: data3, error: error3, isLoading: isLoading3 } = useGetRecommendationsBasedCategoryQuery("total_downloads");
    const { data: data4, error: error4, isLoading: isLoading4 } = useGetRecommendationsBasedCategoryQuery("total_reads");
    return (
        <Layout showHeader={false}>
            <View className="flex-row justify-between w-full py-2 border-b border-slate-200 ">
                <Text className="font-bold text-xl text-custom-blue">
                    QCUJ Articles
                </Text>
                <Image source={image} className=" w-8 h-8" />
            </View>
            <View>
            {error1 || error2 || error3 ||error4? (
                <Text>Oh no, there was an error{error2.error}</Text>
            ) : isLoading1 || isLoading2 || isLoading3 || isLoading4 ? (
                <Text>Loading...</Text>
            ) : data1 || data2 || data3 || data4 ? (
            <ScrollView>
                <Image source={{uri: 'https://i0.wp.com/qcu.edu.ph/wp-content/uploads/2023/07/THUMBNAIL-QCU-JOURNALS-1.png?fit=844%2C474&ssl=1'}} className="w-full h-[24vh]" />
                { data1 &&                 
                <View className="pt-4">
                  <Text className="font-bold text-lg">Recommendations for you</Text>
                  
                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                      {data1.recommendations.map((item, key) => {
                          return (
                            <Item key={key} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword}/>
                          );
                        })}
                      </ScrollView>
                  </View>
                }
              { data2 &&
              <View className="pt-4">
                  <Text className="font-bold text-lg">Recently Published</Text>
                  
                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                      {data2.recommendations.map((item, key) => {
                          return (
                            <Item key={key} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword}/>
                          );
                        })}
                  </ScrollView>
              </View>
            }
             { data3 &&
              <View className="pt-4">
                  <Text className="font-bold text-lg">Most Downloaded</Text>
                  
                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                      {data3.recommendations.map((item, key) => {
                          return (
                            <Item key={key} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword}/>
                          );
                        })}
                  </ScrollView>
              </View>
            }
            { data4 &&
              <View className="pt-4 pb-8">
                  <Text className="font-bold text-lg">Most Reads</Text>
                  
                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                      {data3.recommendations.map((item, key) => {
                          return (
                            <Item key={key} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword}/>
                          );
                        })}
                  </ScrollView>
              </View>
            } 
              </ScrollView>
           ): null }
            </View>
        </Layout>
    )
}