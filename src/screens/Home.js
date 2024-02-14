import * as React from "react";
import { useGetArticlesByIssueIdQuery } from "../services/article";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  Linking
} from "react-native";
import Input from "../components/forms/Input";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import { Image } from "react-native"
const image = require("../../assets/images/logo.png")

function getContributorName(item) {
  return item ? item.split("->")[0] : ""
}
function getContributorOrcid(item) {
  return item ? item.split("->")[1] : ""
}

export const ContributorItems = ({contributors}) => (
  contributors 
    && contributors.split(";").map((contributor) => {
        return (
          <Pressable onPress={() => Linking.openURL(
            `https://qcuj.online/PHP/?author=${getContributorOrcid(contributor)}`)}
      >
          <Text className="underline">{getContributorName(contributor)}</Text>
        </Pressable>
        );
       })
  
)

export const KeywordItems = ({keywords}) => (
  keywords 
    && keywords.split(",").map((keyword) => {
        return (
          <View>
            <Text className="rounded-full border border-custom-blue p-2 m-1">{keyword}</Text>
          </View>
        );
       })
)

const Item = ({ id, title, abstract, contributors, keyword, navigation }) => (
  <Pressable onPress={()=>navigation.navigate('Article', {
      itemId: id,
    })} 
  className="px-4 py-8 my-2 border-[0.2px] border-slate-400 rounded">
    <Text className="font-bold text-custom-blue mb-2">{title}</Text>
    <Text className="mb-2">{abstract} ...</Text>
    
    <ContributorItems contributors={contributors}/>
    <View className="flex-row flex-wrap">
      <KeywordItems keywords={keyword}/>
    </View>

  </Pressable>
);
export default function Home({navigation}) {
  const [searchInput, setSearchInput] = React.useState("")
  const { data, error, isLoading } = useGetArticlesByIssueIdQuery({ searchAndFilters: { input: searchInput } });

  return (
    <Layout showHeader={false}>
 
        {error ? (
          <Text>Oh no, there was an error</Text>
        ) : isLoading ? (
          <Text>Loading...</Text>
        ) : data ? (
          <SafeAreaView>
             <View className="flex-row justify-between w-full py-2 border-b border-slate-200 ">
      <Text className="font-bold text-xl text-custom-blue">QCUJ Articles</Text>
      <Image source={image} className=" w-8 h-8"/>
    </View>
            <View>
              <Input text={searchInput} onChangeText={setSearchInput} placeholder="Search articles"/>
            </View>
            <FlatList
              data={data.results}
              renderItem={({ item }) => <Item data={item} id={item.article_id} navigation={navigation} title={item.title} abstract={item.abstract} contributors={item.contributors} keyword={item.keyword} />}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        ) : null}
    </Layout>
  );
}
