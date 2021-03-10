import React from 'react';
import { WebView } from 'react-native-webview';

export default function LicensesScreen() {
  return (
    <WebView
    scalesPageToFit={false}
      source={{
        uri: 'https://colinfran.github.io/wallpaperqr/license.html',
      }}
      style={{ marginTop: 20 }}
    />
  );
}
