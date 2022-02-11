import {Button, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useQuery} from "react-query";
import request from "graphql-request";
import {CHARACTERS_QUERY, GRAPHQL_ENDPOINT} from "../App";
import {CharacterList} from "../components/CharacterList";

/**
 * React-Query convention is to write a custom hook that wraps your request.
 * If we codegen (we should), this will be handled for us. And type safe.
 */
function useCharacters() {
  return useQuery('characters', async () => request(GRAPHQL_ENDPOINT, CHARACTERS_QUERY),
    {
      enabled: false,
    }
  );
}

export default function ReactQueryTab() {
  const {data, refetch, isLoading, error} = useCharacters();

  return (
    <View style={styles.container}>
      <Button title={"Get Characters"} onPress={() => refetch()}/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
      <CharacterList loading={isLoading} error={error} data={data}/>
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
