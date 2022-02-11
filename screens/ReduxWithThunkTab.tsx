import {View} from "../components/Themed";
import {Button, StyleSheet} from "react-native";
import {CharacterList} from "../components/CharacterList";
import {useDispatch, useSelector} from "react-redux";
import {fetchCharacters} from "../redux+thunk-implementation/features/characters/charactersThunk";
import {RootState} from "../redux+thunk-implementation/redux/store";

/**
 * This follow very closely to the pattern used by the vendor team
 * in mobile and web.
 * @see https://github.com/lessen-inc/vendor-client-api/blob/main/example/src/demos/workOrder/FetchWorkOrders.tsx
 *
 * I couldn't quite figure out the type safety with useSelector, but didn't invest too much time in it.
 */
export default function ReduxWithThunkTab() {
  const dispatch = useDispatch();
  const {isLoading, error, data} = useSelector<RootState>(state => state.characters.characters);

  return (
    <View style={styles.container}>
      <Button title={"Get Characters"} onPress={() => {
        dispatch(fetchCharacters({}))
      }}/>
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
