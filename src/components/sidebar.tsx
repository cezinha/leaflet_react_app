import React from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";

export default function SideBar({navigation}) {
  return(
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Button onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Leaflet')}>
        <Text>Leaflet</Text>
      </Button>
      <Button onPress={() => navigation.navigate('WebviewScreen')}>
        <Text>Webview</Text>
      </Button>
    </View>
  );
}