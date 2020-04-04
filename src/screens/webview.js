
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Drawer, Header, Icon, Left, Body, Right, Title, Button } from "native-base";
import { WebView } from 'react-native-webview';
import SideBar from '../components/sidebar';
export default function WebviewScreen({navigation}) {
  const closeDrawer = () => {
    this.drawer._root.close();
  };

  const openDrawer = () => {
    this.drawer._root.open();
  };

  return (
    <Drawer ref={(ref) => {this.drawer = ref}}
    content={<SideBar navigation={navigation} />}
    onClose={() => closeDrawer()}>
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>React Native Webview Leaflet Demo</Title>
          </Body>
          <Right />
        </Header>
        <WebView source={{ uri: 'http://bl.ocks.org/awoodruff/raw/0883d211538ed05a82fd1b82bd65bf34/' }} />
      </Container>
    </Drawer>
  );
}