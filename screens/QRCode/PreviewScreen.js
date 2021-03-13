import fontColorContrast from 'font-color-contrast';
import { Icon, Toast } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import contrast from 'contrast';
import Draggable from 'react-native-draggable';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import ImageZoom from 'react-native-image-pan-zoom';
import FadeInOut from 'react-native-fade-in-out';

import { Text, View } from '../../components/Themed';
import JsonContext from '../../context';

let timeout; 

export default class PreviewScreen extends React.Component {
  static contextType = JsonContext;

  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }


  componentWillUnmount(){
    clearTimeout(timeout);
  }

  componentDidMount() {
    const json = this.context;
    const { navigation } = this.props;
    const { visible } = this.state;
    this.setState({visible: true})
    const that = this
    timeout = setTimeout(function(){ 
      that.setState({visible: false})
    }, 3000);

    const backgroundColor = json.json.style?.backgroundColor;
    const contrast = fontColorContrast(backgroundColor);
    // let contrast = '#fff'
    // if (contrast(backgroundColor) === 'light') {
    //   contrasts = '#000';
    // }

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
      gesturesEnabled: false,
      swipeEnabled: false,
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
          onPress={this.onSavePress}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          // disabled={!visible}
        >
          <Text style={{ color: contrast }}>Save</Text>
          <Icon name="add" style={{ color: contrast, paddingRight: 8 }} />
        </TouchableOpacity>
      ),
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
          { text: 'Cancel', onPress: () => {} },
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
    const { navigation } = this.props;
    this.refs.viewShot.capture().then(async uri => {
      // console.log("do something with ", uri);
      const imageBase64 = uri.split(
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
              { text: 'Help', onPress: () => navigation.navigate("PermissionsScreen")  },
              { text: 'OK', onPress: () => {} }
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
    const {visible} = this.state
    const contrast = fontColorContrast(backgroundColor);
    const infoBarColor = contrast === '#000000' ? '#7b7b7a' : '#1c1c1e'

    const qrcodesize = width - width * .3
    return (
      <View style={[styles.container, {backgroundColor }]}>
        <StatusBar barStyle={contrast === '#000000' ? 'dark-content' : 'light-content'} />
        <FadeInOut visible={visible} style={{backgroundColor:infoBarColor, padding: 10, borderRadius: 10,position:'absolute', top: Dimensions.get('window').height*.2, zIndex: 5, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{color:contrast}}>Drag QR Code to adjust vertical positioning</Text>
          </FadeInOut>
        <ViewShot
          ref="viewShot"
          style={{ flex: 1, backgroundColor}}
          onCapture={(uri) => this.setState({ imageBase64: uri })}
          captureMode="mount"
          options={{ result: 'data-uri' }}

        >
          <View
            style={
              // {...styles.qrcodecontainer},
              { backgroundColor, flex: 1, justifyContent:'center', alignItems:'center'}
            }>
              <Draggable 
                style={{}} 
                touchableOpacityProps={{activeOpacity:1}} 
                maxX={Dimensions.get('window').width / 2 - (qrcodesize/2)} 
                minX={Dimensions.get('window').width / 2 - (qrcodesize/2)} 
                x={Dimensions.get('window').width / 2 - (qrcodesize/2)} 
                y={Dimensions.get('window').height / 2 - (qrcodesize/2)+80}
              >
              <View style={{}}>
                <QRCode
                        value={json.json?.qrcode}
                        size={qrcodesize}
                        color={qrCodeColor}
                        backgroundColor={backgroundColor}
                      />
              </View>
            </Draggable>
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
