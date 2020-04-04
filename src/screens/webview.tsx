
import React from 'react';
import { Container, Header, Icon, Left, Body, Right, Title, Button } from "native-base";
import { WebView } from 'react-native-webview';
import { DrawerActions } from '@react-navigation/native';
function WebviewView({navigation}) {
  return (
    <WebView source={{ uri: 'http://bl.ocks.org/awoodruff/raw/0883d211538ed05a82fd1b82bd65bf34/' }} />
  );
}

export default function WebviewScreen({navigation}) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon ios="ios-menu" android="md-menu" name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Webview</Title>
        </Body>
        <Right />
      </Header>
      <WebviewView navigation={navigation} />
    </Container>
  );
}