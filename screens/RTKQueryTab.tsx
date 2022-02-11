import {Button, StyleSheet} from "react-native";
import {View} from "../components/Themed";
import {CharacterList} from "../components/CharacterList";
import {useLazyGetCharactersQuery} from "../rtk-implementation/services/characters";

/**
 * RTK Query follows very similar api as React-Query & Apollo-Client
 * There's just more boiler plate in setting up the redux store.
 * @see ../../rtk-implementation/
 */
export function RTKQueryTab() {
  const [trigger, {data, isLoading, error}] = useLazyGetCharactersQuery();

  return (
    <View style={styles.container}>
      <Button title={"Get Characters"} onPress={() => trigger('')}/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
      <CharacterList loading={isLoading} error={error} data={data}/>
    </View>
  )
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
