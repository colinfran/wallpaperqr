import React from 'react';
import { WebView } from 'react-native-webview';

export default function FAQScreen() {
  return (
    <WebView
      source={{
        uri: 'https://colinfran.com',
      }}
    />
  );
}
