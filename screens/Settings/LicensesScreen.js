import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default function FAQScreen() {
  return (
    <WebView
      source={{
        uri: 'https://github.com/facebook/react-native'
      }}
      style={{ marginTop: 20 }}
    />
  );
}