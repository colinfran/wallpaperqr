import fontColorContrast from 'font-color-contrast';
import { Icon, Toast } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

import { Text, View } from '../components/Themed';
import JsonContext from '../context';

export default class AddScreenPreview extends React.Component {
  static contextType = JsonContext;

  componentDidMount() {
    const json = this.context;
    const { navigation } = this.props;
    const hexcolor = json.json.list[json.json.list.length - 1].qrCodeImage.backgroundColor;
    const contrast = fontColorContrast(hexcolor);
    navigation.setOptions({
      headerShown: true,
      headerTitleStyle: {
        color: contrast,
      },
      headerTransparent: true,
      sideMenu: {
        openGestureMode: 'bezel',
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('AddScreenQRCode')}
        >
          <Icon name="arrow-back" style={{ color: contrast, paddingLeft: 10 }} />
          <Text style={{ color: contrast }}>Back</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={this.onAddPress}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={{ color: contrast }}>Save</Text>
          <Icon name="add" style={{ color: contrast, paddingRight: 8 }} />
        </TouchableOpacity>
      ),
    });
  }

  onAddPress = () => {
    const { navigation } = this.props;
    const { imageBase64 } = this.state;
    const parent = navigation.dangerouslyGetParent();

    const json = this.context;
    const newJson = { ...json.json };
    const newJsonArray = newJson.list;
    const newJsonObj = { ...newJsonArray[newJsonArray.length - 1] };
    newJsonObj.qrCodeImage.url = imageBase64 || '';
    newJsonObj.finished = true;
    newJsonArray[newJsonArray.length - 1] = newJsonObj;
    newJson.list = newJsonArray;
    json.updateJson(newJson);

    parent.setOptions({
      tabBarVisible: true,
    });
    navigation.navigate('HomeScreen');
    Toast.show({
      text: 'QR Code successfully created.',
      type: 'success',
      duration: 4000,
      position: 'bottom',
    });
  };

  render() {
    const json = this.context;
    const color1 = json.json.list[json.json.list.length - 1].qrCodeImage.color;
    const color2 = json.json.list[json.json.list.length - 1].qrCodeImage.backgroundColor;
    const { width } = Dimensions.get('window');

    const hexcolor = json.json.list[json.json.list.length - 1].qrCodeImage.backgroundColor;
    const contrast = fontColorContrast(hexcolor);

    return (
      <View style={[styles.container, { backgroundColor: color2 }]}>
        <StatusBar barStyle={contrast === '#000000' ? 'dark-content' : 'light-content'} />
        <ViewShot
          style={{ flex: 1 }}
          onCapture={(uri) => this.setState({ imageBase64: uri })}
          captureMode="mount"
          options={{ result: 'data-uri' }}
        >
          <View
            style={[
              styles.qrcodecontainer,
              { flex: 1, backgroundColor: color2, justifyContent: 'center' },
            ]}>
            <QRCode
              value={json.json.list[json.json.list.length - 1].qrCodeImage.string}
              size={width - width * 0.25}
              color={color1}
              backgroundColor={color2}
            />
          </View>
        </ViewShot>
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
