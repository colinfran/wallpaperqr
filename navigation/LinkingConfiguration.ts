import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          QrCodes: {
            screens: {
              HomeScreen: 'one',
              InputScreen: 'add',
              StyleScreen: 'style',
              AddScreenQRCode: 'code',
              PreviewScreen: 'preview',
              OpenQrCode: 'open',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'two',
              FAQScreen: 'faq',
              LicenseScreen: 'license',
              PrivacyPolicy: 'privacy',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
