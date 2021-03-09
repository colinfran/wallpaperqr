import { Icon, Badge } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

import ColorPicker from '../components/ColorPicker/ColorPicker';
import { Text, View } from '../components/Themed';
import JsonContext from '../context';

export default class AddScreenQRCode extends React.Component {
  static contextType = JsonContext;

  constructor(props) {
    super(props);
    this.state = {
      color1: '#ffffff',
      color2: '#000000',
      qrCode: '',
      isModalOpen: false,
      selectedOption: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setOptions({
      sideMenu: {
        openGestureMode: 'bezel',
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => navigation.navigate('InputScreen')}>
          <Icon name="arrow-back" style={{ color: '#fff', paddingLeft: 10 }} />
          <Text>Back</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={this.onNextPress}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Next</Text>
          <Icon name="arrow-forward" style={{ color: '#fff', paddingRight: 8 }} />
        </TouchableOpacity>
      ),
    });
  }

  setColor1Func = (color) => {
    this.setState({ color1: color });
  };

  setColor2Func = (color) => {
    this.setState({ color2: color });
  };

  renderModalContent = () => {
    let topText = 'Select color for QR Code';
    const { color1, color2, selectedOption } = this.state;
    if (selectedOption === 'color1') {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Text style={{ color: '#000', textAlign: 'center', marginTop: 10 }}>{topText}</Text>
          <ColorPicker
            color={color1}
            onColorChange={this.setColor1Func}
            thumbSize={40}
            sliderSize={40}
            noSnap
            row={false}
            swatches
          />
          <Text style={{ color: '#000', textAlign: 'center', marginTop: 10 }}>{color1}</Text>
        </View>
      );
    } else if (selectedOption === 'color2') {
      topText = 'Select background color';
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <ColorPicker
            color={color2}
            onColorChange={this.setColor2Func}
            thumbSize={40}
            sliderSize={40}
            noSnap
            row={false}
            swatches
          />
          <Text style={{ color: '#000', textAlign: 'center', marginTop: 10 }}>{color2}</Text>
        </View>
      );
    } else return null;
  };

  onNextPress = () => {
    const { color1, color2 } = this.state;
    const { navigation } = this.props;
    const json = this.context;
    const newJson = { ...json.json };
    const newJsonArray = newJson.list;
    const newJsonObj = { ...newJsonArray[newJsonArray.length - 1] };
    newJsonObj.qrCodeImage.color = color1;
    newJsonObj.qrCodeImage.backgroundColor = color2;
    newJsonArray[newJsonArray.length - 1] = newJsonObj;
    newJson.list = newJsonArray;
    // console.log(newJsonObj.qrCodeImage);
    json.updateJson(newJson);
    // console.log(color1, color2)
    navigation.navigate('AddScreenPreview');
  };

  render() {
    const json = this.context;

    const width = Dimensions.get('window').width;
    const { color1, color2, isModalOpen } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: color2 }]}>
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

        <View style={{ height: 200 }}>
          <View
            style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <TouchableOpacity
                style={[styles.colorPickContainer, { justifyContent: 'flex-start' }]}
                onPress={() => {
                  this.setState({ selectedOption: 'color1', isModalOpen: !isModalOpen });
                }}>
                <Badge
                  style={{
                    backgroundColor: color1,
                    marginRight: 10,
                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  <Text>&ensp;&ensp;</Text>
                </Badge>
                <Text style={{ fontSize: 20 }}>Code Color</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorPickContainer, { marginTop: 20 }]}
                onPress={() => {
                  this.setState({ selectedOption: 'color2', isModalOpen: !isModalOpen });
                }}>
                <Badge
                  style={{
                    backgroundColor: color2,
                    marginRight: 10,
                    borderColor: 'white',
                    borderWidth: '.5',
                  }}>
                  <Text>&ensp;&ensp;</Text>
                </Badge>
                <Text style={{ fontSize: 20 }}>Background Color</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{}}>
          <Modal
            isVisible={isModalOpen}
            style={{
              backgroundColor: '#fff',
              marginTop: 200,
              marginLeft: 45,
              marginRight: 45,
              marginBottom: 200,
            }}
            onBackdropPress={() => this.setState({ isModalOpen: false })}>
            <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center' }}>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Button title="Close" onPress={() => this.setState({ isModalOpen: false })} />
                </View>
                {this.renderModalContent()}
              </View>
            </View>
          </Modal>
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
