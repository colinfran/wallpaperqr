import React, { Component } from "react";
import { Icon, } from "native-base";
import { Text, View } from '../../components/Themed';

import { StyleSheet, TouchableOpacity, Alert, Dimensions, } from 'react-native';

import Carousel from '../../components/LoopedCarousel';

import Image from 'react-native-scalable-image';
import { HeaderHeightContext } from '@react-navigation/stack';

import IntroGif from "../../assets/images/blankmock.gif"

import Image1 from "../../assets/images/1.png"
import Image2 from "../../assets/images/2.png"
import Image3 from "../../assets/images/3.png"
import Image4 from "../../assets/images/4.png"
import Image5 from "../../assets/images/5.png"
import Image6 from "../../assets/images/6.png"
import Image7 from "../../assets/images/7.png"
import Image8 from "../../assets/images/8.png"

const dataArray = [
  Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8
];
export default class AccordionExample extends Component {

  componentDidMount() {
    const { navigation } = this.props;
    this._carousel.animateToPage(0);
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
          onPress={this.goBack}
        >
          <Icon name="arrow-back" style={{ color: '#fff', paddingLeft: 10 }} />
          <Text>Back</Text>
        </TouchableOpacity>
      ),
    });
  }

  goBack = () => {
    const { navigation } = this.props;
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: true,
    });
    navigation.navigate("SettingsScreen")
  }

  renderComponent = (headerHeight) => {
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    let size = {
      height: height-headerHeight,
      width
    }
    return (
      <View style={{flex:1, borderRadius: 8, backgroundColor:'transparent'}}>
        <Carousel
          currentPage={0}
          keyboardShouldPersistTaps="handled"
          delay={2000}
          style={size}
          autoplay={false}
          pageInfo={true}
          ref={(component) => {
            this._carousel = component;
          }}
          isLooped={false}
          pageInfoBackgroundColor="#fff">
          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={IntroGif}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>Create a wallpaper with a scannable QR code</Text>
              </View>
            </View>
          </View>
          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[0]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>To start, press the first button that says 'Contact Info'</Text>
              </View>
            </View>
          </View>

          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[1]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>Enter in your information</Text>
              </View>
            </View>
          </View>

          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[2]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>Press the 'Save' button when you are finished enterring in information</Text>
              </View>
            </View>
          </View>

          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[3]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>Next, click the QR Code color and Background button.</Text>
              </View>
            </View>
          </View>

          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[4]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>This will take you to a page that allows you to set the styling of your wallpaper. Press on either the background or the QR code to open up the color picker. When done hit the save button in the top right.</Text>
              </View>
            </View>
          </View>

          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[5]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>With all the necessary information built out, you are ready to download your wallpaper. Click 'Preview and Download'.</Text>
              </View>
            </View>
          </View>

          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[6]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>You will be taken to a preview screen where you can see what your wallpaper looks like at full size. When you are ready, hit the 'Save' button in the top right. Make sure you set the correct permissions for photos. </Text>
              </View>
            </View>
          </View>

          <View style={styles.slide1}>
            <Image width={Dimensions.get('window').width*.6} source={dataArray[7]}/>
            <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginBottom:100}}>
              <View style={{backgroundColor:'transparent', width: '80%', }}>
              <Text style={{textAlign:'center'}}>If your photo downloads successfully to your phone, you should see a 'Wallpaper succesfully created' popup. This will remind you to set your wallpaper in your settings. Thats it!</Text>
              </View>
            </View>
          </View>
        </Carousel>
      </View>
    );
  }

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
    height: Dimensions.get('window').height + 100,
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
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d4d4d',
    // paddingBottom: 100,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
    paddingBottom: 200,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#373737',
    paddingBottom: 200,
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    paddingBottom: 200,
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    paddingBottom: 200,
  },
  slide6: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
    paddingBottom: 200,
  },
  slide7: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0B',
    paddingBottom: 200,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
  },
  boxButton: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B2B2E',
    borderRadius: 10,
  },
  image:{ 
    // width:'90%',
    // height: '90%'
  }
});
