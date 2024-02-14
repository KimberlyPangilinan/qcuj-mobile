import { View, Text , Button, SafeAreaView} from 'react-native'
import React from 'react'
import { useGetArticleByIdQuery } from "../services/article";
import Layout from "../components/Layout";
export default function Article({ route, navigation }) {
    const { itemId, otherParam } = route.params;
    const { data, error, isLoading } = useGetArticleByIdQuery({ 
        inputLogs: { author_id: "0", article_id: itemId },
      });
  return (
    
    <Layout onPress={() => navigation.goBack()}>
   
        {error ? (
          <Text>Oh no, there was an error{error.error}</Text>
        ) : isLoading ? (
          <Text>Loading...</Text>
        ) : data ? (
          <SafeAreaView>
            <Text className="font-bold text-lg ">{data.selected_article[0].title}</Text>
            <Text>{data.selected_article[0].abstract}</Text>
          </SafeAreaView>
        ) : null}
    </Layout>
  
    
  
  )
}