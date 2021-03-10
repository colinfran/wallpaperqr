import React, { useLayoutEffect } from 'react';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native';
import { Icon 
 } from 'native-base';
import { Text, View } from '../../components/Themed';

export default function PrivacyPolicyScreen({ navigation }) {

  useLayoutEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    navigation.setOptions({
      gesturesEnabled: true,
      headerTintColor:'transparent',
      headerShown: true,
      title: "",
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={()=> navigation.navigate("SettingsScreen")}
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
        uri: 'https://colinfran.github.io/wallpaperqr/privacy-policy.html',
      }}
    />
  );
}
