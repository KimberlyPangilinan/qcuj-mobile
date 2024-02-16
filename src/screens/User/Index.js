import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Layout from '../../components/Layout'
import { Image } from "react-native";
import { useGetRecommendationsBasedCategoryQuery, useGetRecommendationsBasedHistoryQuery } from '../../services/recommendation';
import { Item, TopItem } from './Browse/Browse';
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
    const { data: data2, error: error2, isLoading: isLoading2 } = useGetRecommendationsBasedCategoryQuery({
        category: "publication_date", 
        period: "" 
      });
    const { data: data3, error: error3, isLoading: isLoading3 } = useGetRecommendationsBasedCategoryQuery({
        category: "total_interactions", 
        period: "monthly" 
    });
    const { data: data4, error: error4, isLoading: isLoading4 } = useGetRecommendationsBasedCategoryQuery({
        category: "total_reads", 
        period: "" 
    });
    const { data: data5, error: error5, isLoading: isLoading5 } = useGetRecommendationsBasedCategoryQuery({
        category: "total_citations", 
        period: "" 
    });
    const { data: data6, error: error6, isLoading: isLoading6 } = useGetRecommendationsBasedCategoryQuery({
        category: "total_downloads", 
        period: "" 
    });
    return (
        <Layout showHeader={false}>
            <View className="flex-row justify-between w-full py-2 border-b border-slate-200 ">
                <Text className="font-bold text-xl text-custom-blue">
                    QCUJ Articles
                </Text>
                <Image source={image} className=" w-8 h-8" />
            </View>
            <ScrollView>
                <Image source={{uri: 'https://i0.wp.com/qcu.edu.ph/wp-content/uploads/2023/07/THUMBNAIL-QCU-JOURNALS-1.png?fit=844%2C474&ssl=1'}} className="w-full h-[24vh]" />
                {/* Recently Published */}
                <View>
                 {  error2 ? (
                        <Text>Oh no, there was an error</Text>) 
                    : isLoading2 ? (
                        <Text>Loading...</Text>) 
                    : data2 ? (
                        <View>
                             { data2 &&
                             <View className="pt-4">
                                 <Text className="font-bold text-lg">Recently Published</Text>
                
                                 <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                                     {data2.recommendations?.map((item, key) => {
                                     return (
                                     <Item key={key} id={item.article_id} navigation={navigation} title={item.title}
                                         abstract={item.abstract.slice(0,200)} keyword={item.keyword.slice(0,40)} />
                                     );
                                     })}
                                 </ScrollView>
                             </View>
                             }
                        </View>)
                    : null }
                </View>               
                {/* Recommendations for you */}
                <View>
                    {
                        error1 ? (
                            <Text>Oh no, there was an error</Text>) 
                        : isLoading1 ? (
                            <Text>Loading...</Text>) 
                        : data1 ? (
                        <>
                            <View className="pt-4">
                                 { data1.history && <Text className="font-bold text-lg">Continue Reading</Text>}
             
                                <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                                     {data1.history?.map((item, key) => (
                                     <Item key={key} id={item.article_id} navigation={navigation} title={item.title}
                                         abstract={item.abstract.slice(0,200)}  />
                                     ))}
                                </ScrollView>
                            </View>
                            <View className="pt-4">
                                { data1.recommendations && <Text className="font-bold text-lg">Recommendations for you</Text>}
            
                                <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                                    {data1.recommendations?.map((item, key) => (
                                    <Item key={key} id={item.article_id} navigation={navigation} title={item.title}
                                        abstract={item.abstract.slice(0,200)} keyword={item.keyword.slice(0,50)} />
                                    ))}
                                </ScrollView>
                            </View>
                           
                        </>
                            ) 
                        : null 
                    }
                </View>
                {/* Monthly Top 5 Picks */}
                <View>
                    {   error3 ? (
                            <Text>Oh no, there was an error</Text>) 
                        : isLoading3? (
                            <Text>Loading...</Text>) 
                        : data3 ? (
                            <View>
                            { data3.recommendations &&
                              <View className="pt-4">
                                  <Text className="font-bold text-lg">{ new Date().toLocaleString('default', { month: 'long' })} Top Picks</Text>
                                  
                                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                                      {data3.recommendations?.map((item, index) => {
                                          return (
                                            <TopItem key={index} index={index+1} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword.slice(0,50)} />
                                          );
                                        })}
                                  </ScrollView>
                              </View>
                            }
                            </View>)
                        : null 
                    }
                </View>
                {/* Most Reads */}
                <View>
                    {   error4 ? (
                            <Text>Oh no, there was an error</Text>) 
                        : isLoading4? (
                            <Text>Loading...</Text>) 
                        : data4 ? (
                            <View>
                            { data4 &&
                              <View className="pt-4">
                                  <Text className="font-bold text-lg">Most Reads</Text>
                                  
                                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                                      {data3.recommendations?.map((item, key) => {
                                          return (
                                            <Item key={key} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword}/>
                                          );
                                        })}
                                  </ScrollView>
                              </View>
                            } 
                            </View>)
                        : null 
                    }
                </View>
                {/* Most Cited */}
                <View>
                    {   error5 ? (
                            <Text>Oh no, there was an error</Text>) 
                        : isLoading5? (
                            <Text>Loading...</Text>) 
                        : data5 ? (
                            <View>
                            { data5 &&
                              <View className="pt-4">
                                  <Text className="font-bold text-lg">Most Cited</Text>
                                  
                                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                                      {data3.recommendations?.map((item, key) => {
                                          return (
                                            <Item key={key} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword}/>
                                          );
                                        })}
                                  </ScrollView>
                              </View>
                            } 
                            </View>)
                        : null 
                    }
                </View>
                {/* Most Downloads */}
                <View>
                    {   error6 ? (
                            <Text>Oh no, there was an error</Text>) 
                        : isLoading6? (
                            <Text>Loading...</Text>) 
                        : data6 ? (
                            <View>
                            { data6 &&
                              <View className="pt-4">
                                  <Text className="font-bold text-lg">Most Downloaded</Text>
                                  
                                  <ScrollView horizontal={true} contentContainerStyle="flex-row overflow-auto">
                                      {data6.recommendations?.map((item, key) => {
                                          return (
                                            <Item key={key} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract.slice(0,200)} keyword={item.keyword}/>
                                          );
                                        })}
                                  </ScrollView>
                              </View>
                            }
                            </View>)
                        : null 
                    }
                </View>
            </ScrollView>
           

        </Layout>
    )
}