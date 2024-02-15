import { Text, View } from "react-native";
export default KeywordItems = ({ keywords }) =>
  keywords &&
  keywords.split(",").map((keyword, key) => {
    return (
      <View key={key}>
        <Text className="rounded-full border border-custom-blue p-2 m-1">
          {keyword}
        </Text>
      </View>
    );
  });