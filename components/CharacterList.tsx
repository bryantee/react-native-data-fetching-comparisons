import {Text, View} from "./Themed";
import {ScrollView, Image} from "react-native";

type Props = {
  loading: boolean;
  error: any;
  data: {
    characters: {
      results: {
        id: number;
        name: string;
        image: string;
      }[];
    };
  };
}

export function CharacterList({loading, error, data}: Props) {
  return <ScrollView>
    {loading && <Text>Loading...</Text>}
    {error && <Text>Error! {error.message}</Text>}

    {data?.characters?.results?.map((character) => (
      <View key={character.id}>
        <Text key={character?.id}>{character.name}</Text>
        <Image source={{uri: character.image}} style={{width: 100, height: 100}}/>
      </View>
    ))}
  </ScrollView>
}
