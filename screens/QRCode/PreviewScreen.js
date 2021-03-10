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

export default class PreviewScreen extends React.Component {
  static contextType = JsonContext;

  componentDidMount() {
    const json = this.context;
    const { navigation } = this.props;
    const backgroundColor = json.json.style?.backgroundColor;

    const contrast = fontColorContrast(backgroundColor);

    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    navigation.setOptions({
      headerShown: true,
      headerTitleStyle: {
        color: contrast,
      },
      headerTransparent: true,
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Icon name="arrow-back" style={{ color: contrast, paddingLeft: 10 }} />
          <Text style={{ color: contrast }}>Back</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={this.onSavePress}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={{ color: contrast }}>Save</Text>
          <Icon name="add" style={{ color: contrast, paddingRight: 8 }} />
        </TouchableOpacity>
      ),
    });
  }


  async getCameraRollPermissions() {
    let { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (existingStatus !== 'granted') {
      const status = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
      existingStatus = status.status;
    }
    if (existingStatus !== 'granted') {
      Alert.alert(
        'No Notification Permission',
        'Go to setting and turn on permissions for photos',
        [
          { text: 'Cancel', onPress: () => (returnVal = false) },
          { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
        ],
        { cancelable: false },
      );
      return false;
    }
    return true;
  }

  async saveFile() {
    const json = this.context;
    const imageBase64 = this.state.imageBase64.split(
      'data:image/png;base64,',
    )[1];
    const filename = `${FileSystem.documentDirectory}${"QRCode"}.png`;

    await FileSystem.writeAsStringAsync(filename, imageBase64, {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then(() => {})
      .catch((e) => {
        console.error('An error occured while trying to create the image file');
        console.error(e);
        Toast.show({
          text: 'An error occured while trying to create the image file.',
          buttonText: 'Okay',
          type: 'danger',
          duration: 4000,
          position: 'bottom',
        });
      });

    await MediaLibrary.saveToLibraryAsync(filename)
      .then(() => {
        Alert.alert(
          'Wallpaper created successfully',
          `Image has been added to your Photo Library. Please remember to set the image as your lock screen wallpaper.`,
          [
            { text: 'Help', onPress: () => console.log('HelpedPressed') },
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      })
      .catch((e) => {
        console.error('An error occured while trying to add the image file to the media library');
        console.error(e);
        Toast.show({
          text: 'An error occured while trying to create the image file.',
          type: 'danger',
          position: 'bottom',
          duration: 4000,
        });
      });
  }

  onSavePress = async () => {
    const { navigation } = this.props;

    const permissionsAreApproved = await this.getCameraRollPermissions();
    if (permissionsAreApproved) {
      this.saveFile();
      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: true,
      });
      return navigation.navigate('HomeScreen');
    }
  };

  render() {
    const json = this.context;
    const qrCodeColor = json.json.style?.qrCodeColor
    const backgroundColor = json.json.style?.backgroundColor;
    const { width } = Dimensions.get('window');

    const contrast = fontColorContrast(backgroundColor);

    return (
      <View style={[styles.container, {backgroundColor }]}>
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
              { flex: 1, backgroundColor, justifyContent: 'center' },
            ]}>
            <QRCode
              value={json.json?.qrcode}
              size={width - width * 0.25}
              color={qrCodeColor}
              backgroundColor={backgroundColor}
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
