import React, { useLayoutEffect } from 'react';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native';
import { Icon 
 } from 'native-base';
import { Text, View } from '../../components/Themed';

export default function RateScreen({ navigation }) {

  const goBack = () => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: true,
    });
    navigation.navigate("SettingsScreen")
  }

  useLayoutEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    navigation.setOptions({
      gesturesEnabled: false,
      swipeEnabled: false,
      headerTintColor:'transparent',
      headerShown: true,
      title: "",
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={goBack}
        >
          <Icon name="arrow-back" style={{ color: '#fff', paddingLeft: 10 }} />
          <Text>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  return (
    <WebView
    scalesPageToFit={false}
      source={{
        uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfe9zudYw7BSy_HBjyx3DZMiSDQTmgHN73NWvd1zLeOqc6WDw/viewform?usp=sf_link',
      }}
    />
  );
}
