import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LeafletScreen from "./src/screens/leaflet";
import HomeScreen from "./src/screens/home";
import WebviewScreen from "./src/screens/webview";
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Leaflet" component={LeafletScreen} />
          <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}