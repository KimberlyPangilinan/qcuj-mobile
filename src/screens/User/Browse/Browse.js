import * as React from "react";
import { useGetArticlesByIssueIdQuery } from "../../../services/article";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  Linking,
} from "react-native";
import Input from "../../../components/forms/Input";
import Layout from "../../../components/Layout";
import ContributorItems from "../../../components/articles/ContributorItems";
import KeywordItems from "../../../components/articles/KeywordItems";


const Item = ({ id, title, abstract, contributors, keyword, navigation }) => (
  <Pressable
    onPress={() =>
      navigation.navigate("Article", {
        itemId: id,
      })
    }
    className="px-4 py-8 my-2 border-[0.2px] border-slate-400 rounded"
  >
    <Text className="font-bold text-custom-blue mb-2">{title}</Text>
    <Text className="mb-2">{abstract} ...</Text>

    <ContributorItems contributors={contributors} />
    <View className="flex-row flex-wrap">
      <KeywordItems keywords={keyword} />
    </View>
  </Pressable>
);
export default function Browse({ navigation }) {
  const [searchInput, setSearchInput] = React.useState("");
  const { data, error, isLoading } = useGetArticlesByIssueIdQuery({
    searchAndFilters: { input: searchInput },
  });

  return (
    <Layout showHeader={false}>

      {error ? (
        <Text>Oh no, there was an error</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <SafeAreaView>
          
          <View>
            <Input
              text={searchInput}
              onChangeText={setSearchInput}
              placeholder="Search articles"
            />
          </View>
          <FlatList
            data={data.results}
            renderItem={({ item,key }) => (
              <Item
                key={key}
                data={item}
                id={item.article_id}
                navigation={navigation}
                title={item.title}
                abstract={item.abstract}
                contributors={item.contributors}
                keyword={item.keyword}
              />
            )}
            keyExtractor={(item) => item.article_id}
          />
        </SafeAreaView>
      ) : null}
    </Layout>
  );
}
