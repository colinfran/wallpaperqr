import fontColorContrast from 'font-color-contrast';
import { Icon, Toast } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import { Text, View } from '../../components/Themed';
import JsonContext from '../../context';

export default class PermissionsScreen extends React.Component {
  static contextType = JsonContext;

  componentDidMount() {
    const json = this.context;
    const { navigation } = this.props;
    const backgroundColor = json.json.style?.backgroundColor;

    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    navigation.setOptions({
      headerShown: true,
      gesturesEnabled: false,
      swipeEnabled: false,
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onBackPress}
        >
          <Icon name="arrow-back" style={{ color: 'white', paddingLeft: 10 }} />
          <Text style={{ color: 'white' }}>Back</Text>
        </TouchableOpacity>
      )
    });
  }

  onBackPress = () => {
    const { navigation } = this.props;
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: true,
    });
    navigation.navigate('HomeScreen')
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={{alignItems:'center', marginTop: 50}}>
          <View style={{width: "80%"}}>
            <Text style={{marginBottom: 10, fontSize: 30}}>You can set the wallpaper by following these steps:</Text>
            <Text style={{marginBottom: 10, fontSize: 18}}>1) Open 'Settings', tap 'Wallpaper', then tap 'Choose a New Wallpaper'</Text>
            <Text style={{marginBottom: 10, fontSize: 18}}>2) Find the wallpaper. Tap on the album where your image is saved, then tap on the image.</Text>
            <Text style={{marginBottom: 10, fontSize: 18}}>3) Make sure the wallpaper first the screen. Drag and/or pinch to zoom in and out, so the wallpaper fits the screen.</Text>
            <Text style={{fontSize: 18}}>4) Set the wallpaper. Tap 'Set', then press 'Set Lock Screen' or 'Set Both'.</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  button: {
    flex: 1,
    marginTop: 15,
  },
  buttonText: {
    color: '#000',
  },
  text: {
    color: '#fff',
  },
  qrcodecontainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  colorPickContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
