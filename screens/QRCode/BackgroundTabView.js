import React, { useState, useEffect, memo } from 'react';
import { View, useWindowDimensions,StyleSheet, Text } from 'react-native';
import { TabView, TabBar,SceneMap } from 'react-native-tab-view';
import HsvColorPicker from 'react-native-hsv-color-picker';
import UnsplashSearch, { UnsplashPhoto } from '../../components/UnsplashSearch';
import MasonryList from "react-native-masonry-list";
import { Container, Header, Content, Input, Item } from 'native-base';
import ImageSearch from "./ImageSearch"

class FirstRoute extends React.PureComponent{
  render(){
    const {hue2, sat2, val2, onSatVal2PickerChange, onHue2PickerChange, backgroundColor} = this.props
    return(
      <View style={{ flex: 1}}>
        <View style={styles.colorPickerContainer}>
          <Text style={{marginBottom: 15,marginTop: 15, fontSize: 20, color: '#fff'}}>Pick your Background</Text>
          <HsvColorPicker
            huePickerHue={hue2}
            onHuePickerDragMove={onHue2PickerChange}
            onHuePickerPress={onHue2PickerChange}
            satValPickerHue={hue2}
            satValPickerSaturation={sat2}
            satValPickerValue={val2}
            onSatValPickerDragMove={onSatVal2PickerChange}
            onSatValPickerPress={onSatVal2PickerChange}
            satValPickerBorderRadius={10}
            huePickerBorderRadius={5}
          />
          <Text style={{marginBottom: 15, fontSize: 14, color:'white'}}>{backgroundColor}</Text>
        </View>
      </View>
    )  
  }
}

// const FirstRoute = (props) =>{ 
//   const {hue2, sat2, val2, onSatVal2PickerChange, onHue2PickerChange, backgroundColor} = props

//   return (
//     <View style={{ flex: 1}}>
//       <View style={styles.colorPickerContainer}>
//         <Text style={{marginBottom: 15,marginTop: 15, fontSize: 20, color: '#fff'}}>Pick your Background</Text>
//         <HsvColorPicker
//           huePickerHue={hue2}
//           onHuePickerDragMove={onHue2PickerChange}
//           onHuePickerPress={onHue2PickerChange}
//           satValPickerHue={hue2}
//           satValPickerSaturation={sat2}
//           satValPickerValue={val2}
//           onSatValPickerDragMove={onSatVal2PickerChange}
//           onSatValPickerPress={onSatVal2PickerChange}
//           satValPickerBorderRadius={10}
//           huePickerBorderRadius={5}
//         />
//         <Text style={{marginBottom: 15, fontSize: 14, color:'white'}}>{backgroundColor}</Text>
//       </View>
//     </View>
//   );
// }

export default function BackgroundTabView(parentProps) {
  const layout = useWindowDimensions();
  // console.log(parentProps)
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Color' },
    { key: 'second', title: 'Image' },
  ]);

  // const renderScene = (props) => {
  //   console.log("RenderScenetest")
  //   switch (props.route.key) {
  //     case 'first':
  //       return <FirstRoute {...props}/>;
  //     case 'second':
  //       return <ImageSearch />;
  //     default:
  //       return null;
  //   }
  // }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: ImageSearch,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ zIndex: 0,backgroundColor: '#414146', width: 113, height: 48, marginHorizontal:0, borderRadius: 6, color: 'black', marginTop: 0}}
      style={{ color: 'black', zIndex: 10000000, backgroundColor: '#1c1c1e',  borderWidth: 2, borderColor: 'white', width: '60%', justifyContent:'center', alignSelf:'center', borderRadius: 8, marginBottom: 10, color: 'black'}}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      swipeEnabled={false}
      initialLayout={{ width: layout.width }}
      style={{ backgroundColor: '#1c1c1e'}}
      renderTabBar={renderTabBar}
    />
  );
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
    flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
