import {
    Text,
    Pressable,
    Linking,
  } from "react-native";
import { getContributorName, getContributorOrcid } from "../../helpers/utilities";
  
export default ContributorItems = ({ contributors }) =>
  contributors &&
  contributors.split(";").map((contributor, key) => {
    return (
      <Pressable
        key={key}
        onPress={() =>
          Linking.openURL(
            `https://qcuj.online/PHP/?author=${getContributorOrcid(
              contributor
            )}`
          )
        }
      >
        <Text className="underline">{getContributorName(contributor)}</Text>
      </Pressable>
    );
  });

