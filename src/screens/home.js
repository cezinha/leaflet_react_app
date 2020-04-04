import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

export default function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.navigate('Leaflet')}>
        <Text>Leaflet</Text>
      </Button>
      <Text>Home</Text>
    </View>
  );
}