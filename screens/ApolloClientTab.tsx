import {Button, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useLazyQuery} from "@apollo/client";
import {CHARACTERS_QUERY} from "../App";
import {CharacterList} from "../components/CharacterList";

/**
 * Simple wrapped function here for simplicity.
 * In the real app we'd probably want to codegen which would handle this for us.
 * Plus include type safety.
 */
function useCharactersLazy() {
  return useLazyQuery(CHARACTERS_QUERY);
}

export default function ApolloClientTab({navigation}: RootTabScreenProps<'TabOne'>) {
  const [getCharacters, {data, loading, error}] = useCharactersLazy()

  return (
    <View style={styles.container}>
      <Button title={"Get Characters"} onPress={() => getCharacters()}/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
      <CharacterList loading={loading} error={error} data={data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
