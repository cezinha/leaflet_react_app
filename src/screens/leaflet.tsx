import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  INFINITE_ANIMATION_ITERATIONS,
  LatLng,
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
  AnimationType,
  MapShapeType
} from "react-native-webview-leaflet";
import { mapboxToken } from "../../secrets.json";
import { Container, Header, Icon, Left, Body, Right, Title, Button } from "native-base";
import lodashSample from "lodash.sample";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { DrawerActions } from "@react-navigation/native";

const locations = [
  {
    icon: "⭐",
    position: { lat: 38.895, lng: -77.0366 },
    name: "Washington DC"
  },
  {
    icon: "🎢",
    position: { lat: 37.8399, lng: -77.4442 },
    name: "Kings Dominion"
  },
  {
    icon: "🎢",
    position: { lat: 37.23652, lng: -76.646 },
    name: "Busch Gardens Williamsburg"
  },
  {
    icon: "⚓",
    position: { lat: 36.8477, lng: -76.2951 },
    name: "USS Wisconsin (BB-64)"
  },
  {
    icon: "🏰",
    position: { lat: 28.3852, lng: -81.5639 },
    name: "Walt Disney World"
  }
];

const getDuration = () => Math.floor(Math.random() * 3) + 1;
const getDelay = () => Math.floor(Math.random()) * 0.5;
const iterationCount = "infinite";

function LeafletView({navigation}) {
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 36.850769,
    lng: -76.285873
  });
  const [ownPosition, setOwnPosition] = useState(null);
  const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);

  const onMessageReceived = (message) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        Alert.alert(
          `Map Marker Touched, ID: ${message.payload.mapMarkerID || "unknown"}`
        );

        break;
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        const position = message.payload
          .touchLatLng;
        Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
        break;
      default:
        console.log("App received", message);
    }
  };

  useEffect(() => {
    getLocationAsync();
  });

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    if (!ownPosition) {
      setOwnPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {
          <WebViewLeaflet
            ref={(ref) => {
              setWebViewLeafletRef(ref);
            }}
            backgroundColor={"green"}
            onMessageReceived={onMessageReceived}
            mapLayers={[
              {
                attribution:
                  '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                baseLayerIsChecked: true,
                baseLayerName: "OpenStreetMap.Mapnik",
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              },
              {
                baseLayerName: "Mapbox",
                //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
                attribution:
                  "© <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              }
            ]}
            mapMarkers={[
              ...locations.map(location => {
                return {
                  id: location.name.replace(" ", "-"),
                  position: location.position,
                  icon: location.icon,
                  animation: {
                    duration: getDuration(),
                    delay: getDelay(),
                    iterationCount: INFINITE_ANIMATION_ITERATIONS,
                    type: lodashSample(
                      Object.values(AnimationType)
                    )
                  }
                };
              })
            ]}
            mapCenterPosition={mapCenterPosition}
            ownPositionMarker={
              ownPosition && {
                position: ownPosition,
                icon: "❤️",
                size: [32, 32],
                animation: {
                  duration: getDuration(),
                  delay: getDelay(),
                  iterationCount,
                  type: AnimationType.BOUNCE
                }
              }
            }
            zoom={7}
          />
        }
      </View>
      <View style={styles.mapControls}>
        {locations.map(location => {
          return (
            <Button
              key={(location.position).lat.toString()}
              info
              onPress={() => {
                setMapCenterPosition(location.position);
              }}
              style={styles.mapButton}
            >
              <Text style={styles.mapButtonEmoji}>{location.icon}</Text>
            </Button>
          );
        })}
        <Button
          onPress={() => {
            setMapCenterPosition(ownPosition);
            if (webViewLeafletRef) {
              webViewLeafletRef.setMapCenterPosition();
            }
          }}
          style={styles.mapButton}
          success
        >
          <Text style={styles.mapButtonEmoji}>🎯</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    height: 60,
    backgroundColor: "dodgerblue",
    paddingHorizontal: 10,
    paddingTop: 30,
    width: "100%"
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  mapControls: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 5,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    marginHorizontal: 10,
    padding: 7,
    position: "absolute",
    right: 0
  },
  mapButton: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    width: 42
  },
  mapButtonEmoji: {
    fontSize: 28
  }
});

export default function LeafletScreen({navigation}) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon ios="ios-menu" android="md-menu" name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Leaflet Webview</Title>
        </Body>
        <Right />
      </Header>
      <LeafletView navigation={navigation} />
    </Container>
  );
}