import {
 Form, Input, Icon 
} from 'native-base';
import React from 'react';

import {
 StyleSheet, TouchableOpacity, Alert, Dimensions 
} from 'react-native';
import VCard from 'vcard-creator';
import Carousel from '../../components/LoopedCarousel';
import { Text, View } from '../../components/Themed';
import QRCode from 'react-native-qrcode-svg';
import { HeaderHeightContext } from '@react-navigation/stack';
import randomColor from 'randomcolor';

import JsonContext from '../../context';

export default class StyleScreen extends React.Component {
  static contextType = JsonContext;

  constructor(props) {
    const { width, height } = Dimensions.get('window');
    super(props);

    const bright =  randomColor({luminosity: 'bright'})
    const dark =  randomColor({luminosity: 'dark'})
    this.state = {
      qrCodeColor: bright,
      backgroundColor: dark,

    };
  }

  componentDidMount() {
    // console.log(this.context); // this is your height

    const { navigation } = this.props;
    const json = this.context;
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    navigation.setOptions({
      gesturesEnabled: true,
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onBackPress}
        >
          <Icon name="arrow-back" style={{ color: '#fff', paddingLeft: 10 }} />
          <Text>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  }

  onBackPress = () => {
    const { navigation } = this.props;
    const json = this.context;
    // console.log(json.json)
    const removeJson = () => {
      const newJson = { ...json.json };
      delete newJson.style
      json.updateJson(newJson);

      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: true,
      });
      navigation.navigate('HomeScreen');
    };
    Alert.alert(
      // title
      'Are you sure?',
      // body
      'If you go back, you won\'t be able to continue building a QR wallpaper.',
      [
        {
          text: 'Yes',
          onPress: () => removeJson(),
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
      // clicking out side of alert will not cancel
    );
  };

  renderComponent = (headerHeight) => {
    const json = this.context;
    const {width} = Dimensions.get('window');
    const { qrCodeColor, backgroundColor } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor }]}>
          <View
            style={[
              styles.qrcodecontainer,
              {
                flex: 1,
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                marginBottom: headerHeight,
              },
            ]}>
            <QRCode
              value={json.json?.qrcode}
              size={width - width * 0.25}
              color={qrCodeColor}
              backgroundColor={backgroundColor}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <HeaderHeightContext.Consumer>
        {(headerHeight) => (
          this.renderComponent(headerHeight)
        )}
      </HeaderHeightContext.Consumer>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  qrcodecontainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
});
