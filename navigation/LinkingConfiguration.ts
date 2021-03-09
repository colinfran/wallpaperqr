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
              AddScreenPreview: 'preview',
              OpenQrCode: 'open',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'two',
              FAQScreen: 'faq',
              LicensesScreen: 'licenses',
              PrivacyPolicy: 'privacy',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
