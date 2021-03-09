import {
 Text, Icon, CardItem, Right, Thumbnail, Badge 
} from 'native-base';
import React, {
 useContext, useLayoutEffect, useRef,useState 
} from 'react';
import {
 StyleSheet, TouchableOpacity, Alert, Dimensions, Animated 
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { View } from '../../components/Themed';
import JsonContext from '../../context';

function HomeScreen({ navigation }) {
  const json = useContext(JsonContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const isPressed1 = useRef(false);
  const isPressed2 = useRef(false);

  const [box1BorderStyle, setBox1BorderStyle] = useState({
    borderWidth: 0,
  });

  const [box2BorderStyle, setBox2BorderStyle] = useState({
    borderWidth: 0,
  });

  const rotate1 = animatedValue1.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '3deg', '-3deg'],
  });

  const rotate2 = animatedValue2.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '3deg', '-3deg'],
  });

  const shakeButton1 = () => {
    // don’t run the animation while the button is not pressed
    if (!isPressed1.current) {
      return;
    }
    Animated.sequence([
      Animated.timing(animatedValue1, {
        toValue: 2,
        duration: 80,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue1, {
        toValue: 1,
        duration: 80,
        useNativeDriver: false,
      }),
    ]).start(shakeButton1); // <-- reruns on completion
  };

  const shakeButton2 = () => {
    // don’t run the animation while the button is not pressed
    if (!isPressed2.current) {
      return;
    }
    Animated.sequence([
      Animated.timing(animatedValue2, {
        toValue: 2,
        duration: 80,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: 80,
        useNativeDriver: false,
      }),
    ]).start(shakeButton2); // <-- reruns on completion
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      gesturesEnabled: true,
      headerShown: false,
    });
  }, [navigation]);

  const box1Animate = () => {
    isPressed1.current = true;
    setBox1BorderStyle({ borderWidth: 0.5,
      borderColor: 'red' });
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start(shakeButton1);
    setTimeout(() => {
      isPressed1.current = false;
      Animated.timing(animatedValue1, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      setBox1BorderStyle({
        borderWidth: 0,
      });
    }, 1000);
  };

  const box2Animate = () => {
    isPressed2.current = true;
    setBox2BorderStyle({ borderWidth: 0.5,
      borderColor: 'red' });
    Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start(shakeButton2);
    setTimeout(() => {
      isPressed2.current = false;
      Animated.timing(animatedValue2, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      setBox2BorderStyle({
        borderWidth: 0,
      });
    }, 1000);
  };

  const handleDownloadPress = () => {
    if (
      json.json.info.firstName === '' &&
      json.json.info.firstName === '' &&
      json.json.info.firstName === ''
    ) {
      box1Animate();
    }
    if (!json.json.info.style) {
      box2Animate();
    }
  };

  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = (`${  phoneNumberString}`).replace(/\D/g, '');
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  const onStylePress = () => {
    if (
      json.json.info.firstName === '' &&
      json.json.info.firstName === '' &&
      json.json.info.firstName === ''
    ) {
      box1Animate();
    } else {
      navigation.navigate('StyleScreen');
    }
  };
  console.log(json.json)
  return (
    <View style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.list}>
          <View>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold' }}>Create Wallpaper</Text>
          </View>
          <View>
            <Text>Add your info and styles</Text>
          </View>
          <View>
            <View style={styles.screen}>
              <Animated.View
                style={[box1BorderStyle, styles.boxParent, { transform: [{ rotate: rotate1 }] }]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('InputScreen')}
                  style={[styles.box, { width: '100%', height: '100%' }]}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        paddingRight: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                       <View style={{padding: 5, backgroundColor:'#007AFF', alignItems:'center', justifyContent:'center',  marginLeft: 30, borderRadius: 8}}>
                        <Icon
                          style={{fontSize: 80, ...styles.text}}
                          type="MaterialCommunityIcons"
                          name="qrcode"
                        />
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'transparent' }}>
                      <Text style={[styles.text, { fontSize: 20, backgroundColor: 'transparent' }]}>Contact Info</Text>
                      {json.json.info?.firstName ? (
                          <View style={{ backgroundColor: 'transparent' }}>
                          <Text
                            style={[
                              styles.text,
                              { fontSize: 14, color: '#96969d', marginTop: 10 },
                            ]}>{`${json.json.info?.firstName} ${json.json.info?.lastName}`}</Text>
                          <Text style={[styles.text, { fontSize: 14, color: '#96969d' }]}>{formatPhoneNumber(json.json.info?.cellPhone)}</Text>
                          <Text style={[styles.text, { fontSize: 14, color: '#96969d' }]}>.&nbsp;.&nbsp;.&nbsp;.</Text>
                        </View>
                      ) : (
                        <Text style={[styles.text, { fontSize: 14, color: '#96969d' }]}>
                          Start by pressing here!
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      bottom: 10,
                      backgroundColor: 'transparent',
                    }}>
                    <Icon
                      name={'checkmark-circle'}
                      style={json.json.info?.firstName ? { color: '#4CD964' } : { color: '#1c1c1e' }}
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View style={[styles.screen, { marginTop: 30 }]}>
              <Animated.View
                style={[box2BorderStyle, styles.boxParent, { transform: [{ rotate: rotate2 }] }]}>
                <TouchableOpacity
                  onPress={onStylePress}
                  style={[styles.box, { width: '100%', height: '100%' }]}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        paddingRight: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                       <View style={{padding: 5, backgroundColor:'#FF9501', alignItems:'center', justifyContent:'center',  marginLeft: 30, borderRadius: 8}}>
                        <Icon
                          style={{fontSize: 80, ...styles.text}}
                          type="Ionicons"
                          name="color-palette"
                        />
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'transparent' }}>
                      <View style={{ alignItems: 'flex-start', backgroundColor: 'transparent' }}>
                          <View
                            style={[
                              styles.colorPickContainer,
                              { justifyContent: 'flex-start', backgroundColor: 'transparent' },
                            ]}>
                            <Text style={[styles.text, { fontSize: 20 }]}>QR Code Color</Text>
                          </View>
                          <View
                            style={[
                              styles.colorPickContainer,
                              { marginTop: 20, backgroundColor: 'transparent' },
                            ]}
                          >
                            <Text style={[styles.text, { fontSize: 20 }]}>Background</Text>
                          </View>
                        </View>
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      bottom: 10,
                      backgroundColor: 'transparent',
                    }}>
                    <Icon
                      name={'checkmark-circle'}
                      style={json.json?.style ? { color: '#4CD964' } : { color: '#1c1c1e' }}
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View style={[styles.screen, { marginTop: 30 }]}>
              <TouchableOpacity
                disabled={isPressed1.current || isPressed2.current}
                style={[styles.boxButton]}
                onPress={handleDownloadPress}
                >
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    style={{ fontSize: 18 }}
                    type="AntDesign"
                    name={json.json.ready ? 'smileo' : 'meh'}
                  />
                  <Text style={([styles.text], {marginLeft: 10,  fontSize: 20 })}>Preview & Download</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 100,
  },
  buttonBottom: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  list: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '95%',
    height: '75%',
  },
  fab: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    width: '100%',
    alignSelf: 'center',
    // fontSize: 12
    // justifyContent: "center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    color: '#fff',
    backgroundColor: 'transparent',
  },
  ListItem: {
    width: '100%',
  },
  buttonContainer: {
    // flex: 1,
    // // backgroundColor: 'red',
    // flexDirection: 'row',
    // alignItems:'flex-end',
    // justifyContent:'center'
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '95%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
  },

  boxParent: {
    width: '95%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  boxButton: {
    width: '95%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7b7b7a',
    borderRadius: 10,
  },
  colorPickContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
