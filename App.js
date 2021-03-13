import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Root } from 'native-base'
import React, { useState, useLayoutEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as Sentry from 'sentry-expo';

import JsonContext from './context'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

Sentry.init({
  dsn: 'https://882c766cdc2841ba9c1a4a952db5cd21@o549413.ingest.sentry.io/5672182',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [json, setJson] = useState({});
  const [selectedCellIndex, setSelectedCellIndex] = useState(0);

  const updateSelectedCellIndex = (index) => {
    // console.log(index)
    setSelectedCellIndex(index);
  };

  const updateJson = async (val) => {
    setJson(val);
    await AsyncStorage.setItem('json', JSON.stringify(val));
    // console.log(val)
  };

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };

  useLayoutEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    };

    const retrieveData = async () => {
      let value = await AsyncStorage.getItem('json');
      if (value === null) {
        value = {
          info: {
            firstName: '',
            lastName: '',
            cellPhone: '',
            email: '',
            job: '',
            company: '',
            website: '',
          },
          qrcode: '',
        };
        updateJson(value);
      }
      else{
        updateJson(JSON.parse(value));;
      }
    };
    lockOrientation();

    loadFonts();
    retrieveData();
  }, []);

  // console.log(json)

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
    return (
  <SafeAreaProvider style={{ backgroundColor: '#000' }}>
      <Root style={{ backgroundColor: '#000' }}>
      <JsonContext.Provider
  value={{
					  json,
					  updateJson,
					  selectedCellIndex,
					  setSelectedCellIndex: updateSelectedCellIndex,
					}}
				>
  <Navigation colorScheme={colorScheme} />
				</JsonContext.Provider>
			</Root>
		</SafeAreaProvider>
  );
        // }
}
