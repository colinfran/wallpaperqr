import {
 Form, Input, Icon 
} from 'native-base';
import React from 'react';

import {
 StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView
} from 'react-native';


import { Text, View } from '../../components/Themed';
import QRCode from 'react-native-qrcode-svg';
import { HeaderHeightContext } from '@react-navigation/stack';
import randomColor from 'randomcolor';

import tinycolor from 'tinycolor2';
import BackgroundTabView from './BackgroundTabView';

import RBSheet from "react-native-raw-bottom-sheet";
import HsvColorPicker from 'react-native-hsv-color-picker';
import BottomSheet from "react-native-gesture-bottom-sheet";


import JsonContext from '../../context';

export default class StyleScreen extends React.Component {
  static contextType = JsonContext;

  constructor(props) {
    const { width, height } = Dimensions.get('window');
    super(props);


    const bright =  randomColor({luminosity: 'bright'})
    const dark =  randomColor({luminosity: 'dark'})
    const colorBright = tinycolor(bright);    
    const colorDark = tinycolor(dark);    
    const colorBrightArray = colorBright.toHsv()
    const colorDarkArray = colorDark.toHsv()


    this.state = {
      selected: "color",
      qrCodeColor: bright,
      backgroundColor: dark,

      hue: colorBrightArray.h,
      sat: colorBrightArray.s,
      val: colorBrightArray.v,

      hue2: colorDarkArray.h,
      sat2: colorDarkArray.s,
      val2: colorDarkArray.v,
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
      gesturesEnabled: false,
      swipeEnabled: false,
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onBackPress}
        >
          <Icon name="arrow-back" style={{ color: '#fff', paddingLeft: 10 }} />
          <Text>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onSavePress}
        >
          <Text style={{ paddingRight: 4 }} >Save</Text>
          <Icon name="save-outline" style={{ color: '#fff', paddingRight: 10, fontSize:20 }} />
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

  onSavePress = () => {
    const { navigation } = this.props;
    const { imageUrl, backgroundColor, qrCodeColor } = this.state;
    const json = this.context;
    let newJson = json.json
    newJson.style = {
      qrCodeColor,
      backgroundColor
    } 
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: true,
    });
    navigation.navigate('HomeScreen');
    json.updateJson(newJson);
  };


  openBottomSheet = (val) => {
    this.setState({selected: val})
    // this.bottomSheet.show()
    this.RBSheet.open()
  }

  onSatValPickerChange = ({ saturation, value }) => {
    console.log(value)
    const {hue} = this.state
    this.setState({
      sat: saturation,
      val: value,
    });
    let color = tinycolor.fromRatio({ h:hue, s:saturation, v:value });
    this.setState({qrCodeColor:color.toHexString() })
  }

  onHuePickerChange = ({ hue }) => {
    const {sat,val} = this.state
    this.setState({
      hue,
    });
    let color = tinycolor.fromRatio({ h: hue, s: sat, v: val });
    this.setState({qrCodeColor: color.toHexString() })
  }

  onSatValPickerChange2 = ({ saturation, value }) => {
    console.log(value)
    const {hue2} = this.state
    this.setState({
      sat2: saturation,
      val2: value,
    });
    let color = tinycolor.fromRatio({ h:hue2, s:saturation, v:value });
    this.setState({backgroundColor: color.toHexString() })
  }

  onHuePickerChange2 = ({ hue }) => {
    const {sat2,val2} = this.state
    this.setState({
      hue2: hue,
    });
    let color = tinycolor.fromRatio({ h: hue, s: sat2, v: val2 });

    // console.log(color)

    this.setState({backgroundColor: color.toHexString() })
    // console.log(color.toHexString())
  }

  renderColorSheet = () => {
    const { hue, sat, val, qrCodeColor } = this.state;

    // console.log(hue, sat, val)
    return (
      <View style={{backgroundColor:'#1c1c1e'}}>
        <View style={styles.colorPickerContainer, {backgroundColor:'#1c1c1e'}}>
          <Text style={{marginBottom: 15, fontSize: 20, backgroundColor:'#1c1c1e' }}>Pick your QR Code color</Text>
          <HsvColorPicker
            huePickerHue={hue}
            onHuePickerDragMove={this.onHuePickerChange}
            onHuePickerPress={this.onHuePickerChange}
            satValPickerHue={hue}
            satValPickerSaturation={sat}
            satValPickerValue={val}
            onSatValPickerDragMove={this.onSatValPickerChange}
            onSatValPickerPress={this.onSatValPickerChange}
            satValPickerBorderRadius={10}
            huePickerBorderRadius={5}
          />
          <Text style={{fontSize: 14, backgroundColor:'#1c1c1e', borderWidth: 0, textAlign:'center'}}>{qrCodeColor}</Text>
        </View>
      </View>
    )
  }

  renderBackgroundSheet = () => {
    const {hue2, sat2, val2, backgroundColor} = this.state
    // console.log(backgroundColor)
    return (
      <View style={{backgroundColor:'#1c1c1e'}}>
        <View style={styles.colorPickerContainer ,{ backgroundColor:'#1c1c1e'}}>
          <Text style={{fontSize: 20, backgroundColor:'#1c1c1e'}}>Pick Your Background</Text>
          <HsvColorPicker
            huePickerHue={hue2}
            onHuePickerDragMove={this.onHuePickerChange2}
            onHuePickerPress={this.onHuePickerChange2}
            satValPickerHue={hue2}
            satValPickerSaturation={sat2}
            satValPickerValue={val2}
            onSatValPickerDragMove={this.onSatValPickerChange2}
            onSatValPickerPress={this.onSatValPickerChange2}
            satValPickerBorderRadius={10}
            huePickerBorderRadius={5}
          />
          <Text style={{fontSize: 14, backgroundColor:'#1c1c1e', borderWidth: 0, textAlign:'center'}}>{backgroundColor}</Text>
        </View>
      </View>
    )
  }

  renderComponent = (headerHeight) => {
    const json = this.context;
    const {width, height} = Dimensions.get('window');
    const { qrCodeColor, backgroundColor, selected, } = this.state;


    return (
      
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={[styles.container, { backgroundColor ,  position: 'relative' }]} onPress={() => this.openBottomSheet("background")}>
          <View style={[styles.container, { backgroundColor}]}>
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
                <TouchableOpacity onPress={() => this.openBottomSheet("color")}>
                  <QRCode
                    value={json.json?.qrcode}
                    size={width - width * 0.3}
                    color={qrCodeColor}
                    backgroundColor={backgroundColor}
                  />
                </TouchableOpacity>
              
            </View>
            <View>
            <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center', alignSelf:'center'}}>
              <View style={{textAlign:'center', position:'absolute', bottom: 100,backgroundColor: "transparent", justifyContent: 'center', alignItems: 'center', height: 35, marginTop: 15}}>
                <Text>Press on the QR and</Text>
                <Text>the background to style your QR</Text>          
              </View>
            </View>
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={height*.5}
              openDuration={250}
              closeOnDragDown={true}
              dragFromTopOnly={true}
              // dragFromTopOnly={true}
              customStyles={{
                container: {
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: '#1c1c1e'
                },
                wrapper: {backgroundColor:'transparent'}
              }}
            >
              <View
                style={[
                  styles.qrcodecontainer,
                  {
                    flex: 1,
                    backgroundColor: '#1c1c1e',
                    justifyContent: 'center',
                    width: '100%'
                  },
                ]}>
                {selected === "color" ? (
                  this.renderColorSheet()
                ) : (
                  null
                )}
                {selected === "background" ? (
                  this.renderBackgroundSheet()
                ) : (
                  null
                )}
              </View>
            </RBSheet>
            </View>
          </View>
        </TouchableOpacity>
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
  colorPickerContainer: {
    // flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
