import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import fontColorContrast from 'font-color-contrast';
import { Icon, Toast } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Linking,
  Alert,
} from 'react-native';

import { Text, View } from '../components/Themed';
import JsonContext from '../context';

export default class OpenQrCode extends React.Component {
  static contextType = JsonContext;

  componentDidMount() {
    const json = this.context;
    const { navigation } = this.props;
    const hexcolor = json.json.list[json.selectedCellIndex].qrCodeImage.backgroundColor;
    const contrast = fontColorContrast(hexcolor);

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
      sideMenu: {
        openGestureMode: 'bezel',
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onBackPress}
        >
          <Icon name="arrow-back" style={{ color: contrast, paddingLeft: 10 }} />
          <Text style={{ color: contrast }}>Back</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onSavePress}
        >
          <Text style={{ color: contrast, paddingRight: 12 }}>Save Image</Text>
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
    const base64Code = json.json.list[json.selectedCellIndex].qrCodeImage.url.split(
      'data:image/png;base64,',
    )[1];
    const filename = `${FileSystem.documentDirectory}${
      json.json.list[json.selectedCellIndex].objectId
    }.png`;

    await FileSystem.writeAsStringAsync(filename, base64Code, {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then(() => {})
      .catch((e) => {
        error.log('An error occured while trying to create the image file');
        error.log(e);
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
        Toast.show({
          text: `Image has been added to your ${
            Platform.OS === 'ios' ? 'Photos app' : 'Gallery app'
          }`,
          type: 'success',
          position: 'bottom',
          duration: 4000,
        });
      })
      .catch((e) => {
        error.log('An error occured while trying to add the image file to the media library');
        error.log(e);
        Toast.show({
          text: 'An error occured while trying to create the image file.',
          type: 'danger',
          position: 'bottom',
          duration: 4000,
        });
      });
  }

  onBackPress = () => {
    const { navigation } = this.props;
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: true,
    });
    navigation.navigate('HomeScreen');
  };

  onSavePress = async () => {
    const { navigation } = this.props;
    const parent = navigation.dangerouslyGetParent();

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
    const color1 = json.json.list[json.selectedCellIndex].qrCodeImage.color;
    const color2 = json.json.list[json.selectedCellIndex].qrCodeImage.backgroundColor;
    const { width } = Dimensions.get('window');

    const hexcolor = json.json.list[json.selectedCellIndex].qrCodeImage.backgroundColor;
    const imageQr = json.json.list[json.selectedCellIndex].qrCodeImage;

    const contrast = fontColorContrast(hexcolor);

    // if (status !== 'granted' )

    // console.log(imageQr.url)
    return (
      <View style={[styles.container, { backgroundColor: color2, position: 'relative' }]}>
        <StatusBar barStyle={contrast === '#000000' ? 'dark-content' : 'light-content'} />
        {/* {status !== 'granted' ? (
          <View style={{width: "100%", backgroundColor:'lightgrey', position:'absolute', top: 100, left: 0, flex:1, zIndex: 10000 }}>
            <Text style={{margin: 50}}>You need to provide permissions for this app to access your photos. Go to your settings and change Photos permission for this app.</Text>
          </View>
        ) : null} */}
        <View
          style={[
            styles.qrcodecontainer,
            { flex: 1, backgroundColor: color2, justifyContent: 'center' },
          ]}>
          <Image style={{ width: '100%', height: '100%' }} source={{ uri: imageQr.url }} />
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
