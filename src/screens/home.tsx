import React from "react";
import { View, Text } from "react-native";
import { Button, Container, Header, Left, Icon, Body, Title, Right } from "native-base";
import { DrawerActions } from "@react-navigation/native";

function HomeView({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

export default function HomeScreen({navigation}) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon ios="ios-menu" android="md-menu" name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>App Test</Title>
        </Body>
        <Right />
      </Header>
      <HomeView navigation={navigation} />
    </Container>
  );
}