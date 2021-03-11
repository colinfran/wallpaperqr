import React, { Component } from "react";
import {TouchableOpacity} from 'react-native'
import { Container, Header, Content, Accordion,Icon } from "native-base";
import { Text, View } from '../../components/Themed';

const dataArray = [
  { title: "What does WallpaperQR do?", content: "WallpaperQR generates wallpapers by combining your favorite colors with a scannable QR that, when scanned, will open to the 'Add New Contacts' page on your mobile device. This is perfect for networking and easily sharing your contact information.", indexInArray: 0, first: true },
  { title: "How do I generate a wallpaper?", content: "Add your information first, then select your favorite colors. Once you have completed those steps, you will be able to download your wallpaper.", indexInArray: 1 },
  { title: "How do I set the wallpaper?", content: "You can set the wallpaper by following these steps:\n\n1) Open 'Settings', tap 'Wallpaper', then tap 'Choose a New Wallpaper'\n\n2) Find the wallpaper. Tap on the album where your image is saved, then tap on the image.\n\n3) Make sure the wallpaper first the screen. Drag and/or pinch to zoom in and out, so the wallpaper fits the screen.\n\n4) Set the wallpaper. Tap 'Set', then press 'Set Lock Screen' or 'Set Both'.", indexInArray: 1 },
  { title: "What happens when someone scans my QR code?", content: "When someone scans your QR code, it will open to the 'Add New Contacts' page on their mobile device, allowing them to easily add your contact info.", indexInArray: 1 },
  { title: "I have accidently denied photo permission to WallpaperQR. How can I fix this?", content: "You will need to change the photo permissions for this app in your 'Settings' app by doing the following:\n\n1) Open the 'Settings' app\n2)Scroll down and tap on 'WallpaperQR'\n\n3) Tap on 'Photos' and make sure that either 'Add Photos Only' or 'All Photos' is selected.\n\nOnce you have completed these steps, you should be able to download your wallpapers from the WallpaperQR app.", indexInArray: 1 },
  { title: "I couldn't find the answer to my question.", content: "If you have any questions that were not answered, please reach out by email to colin.franceschini@gmail.com.", indexInArray: 2, last: true }
];
export default class FAQScreen extends Component {

  componentDidMount() {
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

  _renderHeader(item, expanded) {

    const firstItemClosed = item?.first && !expanded ? {marginTop: 60} : {}
    const firstItemOpened = item?.first && expanded ? {marginTop: 60, borderColor: 'black', borderTopWidth:1} : {}
    const InBetweenItemClosed =  !item?.first && !item?.last && !expanded ? {} :  {}
    const InBetweenItemOpened =  !item?.first && !item?.last && expanded ? {} :  {borderColor: 'black', borderTopWidth:1}
    const lastItemClosed = item?.last && !expanded ? {marginBottom: 60, borderBottomLeftRadius: 8, borderBottomRightRadius: 8} : {}
    const lastItemOpened =  item?.last && expanded ? {borderColor: 'black', borderTopWidth:1} :  {}

    const firstItemRadius = item?.first ? {borderTopLeftRadius: 8, borderTopRightRadius: 8} : {}
    const lastItemRadiusClosed = item?.last && !expanded ? {borderBottomLeftRadius: 8, borderBottomRightRadius: 8} : {}
    const lastItemRadiusOpened = item?.last && expanded ? {} : {}
    return (
      <View style={[ firstItemClosed, firstItemOpened, InBetweenItemClosed, InBetweenItemOpened, lastItemClosed,lastItemOpened]}>
        <View style={{backgroundColor:'transparent', alignSelf: 'center', width:'90%'}}>
          <View 
            style={[{
              flexDirection: "row",
              padding: 40,
              justifyContent: "space-between",
              alignItems: "center" ,
              backgroundColor: "#1c1c1e", }, firstItemRadius, lastItemRadiusClosed, lastItemRadiusOpened]}
          >
          <Text style={{ fontWeight: "600", width: '90%' }}>
              {" "}{item.title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize: 18, color:'white' }} name="ios-chevron-up-circle-outline" />
              : <Icon style={{ fontSize: 18, color:'white' }} name="ios-chevron-down-circle-outline" />}
          </View>
        </View>
      </View>
    );
  }
  _renderContent(item) {
    const lastItem = item?.last ? {borderBottomLeftRadius: 8, borderBottomLeftRadius: 8, marginBottom: 60} : {}
    return (
      <View style={[{backgroundColor:'transparent', alignSelf: 'center', width:'90%'}, lastItem]}>
        <Text
        style={[{
          backgroundColor: "#1c1c1e",
          padding: 30,
          fontStyle: "italic"
        }]}
      >
        {item.content}
      </Text>
      </View>
      
    );
  }

  render() {
    return (
      <View style={{flex:1, borderRadius: 8, backgroundColor:'transparent'}}>
        <View  style={{borderRadius: 8, backgroundColor:'transparent'}}>
          <Accordion   
            ref={c => (this.component = c)}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent} 
            dataArray={dataArray} 

            expanded={[]}
            style={{backgroundColor:'transparent', borderRadius: 8}}
            showsVerticalScrollIndicator={false}

          />
        </View>
      </View>
    );
  }
}