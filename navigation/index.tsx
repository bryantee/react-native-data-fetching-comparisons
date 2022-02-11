/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ApolloClientTab from '../screens/ApolloClientTab';
import ReactQueryTab from '../screens/ReactQueryTab';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {RTKQueryTab} from "../screens/RTKQueryTab";
import ReduxWithThunkTab from "../screens/ReduxWithThunkTab";
import {Provider} from "react-redux";
import {store as reduxThunkStore} from "../redux+thunk-implementation/redux/store";
import {store as rtkStore} from "../rtk-implementation/store";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={ModalScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const connectRtkScreen = () => <Provider store={rtkStore}><RTKQueryTab/></Provider>;
const connectReduxWithThunkScreen = () => <Provider store={reduxThunkStore}><ReduxWithThunkTab/></Provider>;

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={ApolloClientTab}
        options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
          title: 'Apollo Client',
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{marginRight: 15}}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={ReactQueryTab}
        options={{
          title: 'React-Query',
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={connectRtkScreen}
        options={{
          title: 'Redux RTK',
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={connectReduxWithThunkScreen}
        options={{
          title: 'Redux + Thunks + gql fetch',
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
        }}
      />

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
