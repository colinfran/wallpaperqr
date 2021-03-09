import { Text, Button, Icon, Card, CardItem, Left, Right, Body, Thumbnail, Badge } from 'native-base';
import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Alert, Share, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { View } from '../../components/Themed';
import JsonContext from '../../context';

function HomeScreen({ navigation }) {
  const json = useContext(JsonContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      gesturesEnabled: true,
      headerShown: false
    });
  }, [navigation]);

   
  return (
    <View style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.list}>
          <View>
            <Text style={{color:'#fff', fontSize: 32, fontWeight:'bold'}}>Create Wallpaper</Text>
          </View>
          <View>
            <Text>Add your info and styles</Text>
          </View>
          <View>

            <View style={styles.screen}>
              <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('InputScreen')} >
                <View style={{backgroundColor: 'transparent',flexDirection:'row', width: '100%', justifyContent:'center'}}>
                  <View style={{backgroundColor: 'transparent',paddingRight: 20, alignItems:'center', justifyContent:'center'}}>
                    <QRCode
                      value={json.json.qrcode ||"wallpaperqr"}
                      size={100}
                    />
                  </View>
                  <View style={{backgroundColor: 'transparent'}}>
                    <Text style={[styles.text, {fontSize: 18, backgroundColor: 'transparent'}]}>Contact Information</Text>
                    {
                      json.json.info?.firstName ? (
                      <View style={{backgroundColor: 'transparent'}}>
                        <Text style={[styles.text, {fontSize: 14,color:'#96969d', marginTop: 10}]}>{`${json.json.info?.firstName} ${json.json.info?.lastName}`}</Text>
                        <Text style={[styles.text, {fontSize: 14,color:'#96969d'}]}>{json.json.info?.cellPhone}</Text>
                        <Text style={[styles.text, {fontSize: 14,color:'#96969d'}]}>.&nbsp;.&nbsp;.&nbsp;.</Text>
                      </View>
                      ) : (
                        <Text style={[styles.text, {fontSize: 14,color:'#96969d'}]}>Start by pressing here!</Text>
                      )
                    }
                  </View>
                </View>
                <Icon name={json.json.info.firstName ? "checkmark-circle" : "alert-circle"} style={json.json.info.firstName ? {color:'#4CD964', marginTop: 20} : {color:'#FFCC00', marginTop: 20}} />
              </TouchableOpacity>
            </View>
            <View style={[styles.screen, {marginTop: 30}]}>
              <TouchableOpacity style={styles.box}>
                <View style={{backgroundColor:'transparent'}}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' , backgroundColor:'transparent' }}>
                    <View style={{  alignItems: 'flex-start', backgroundColor:'transparent' }}>
                      <View
                        style={[styles.colorPickContainer, { justifyContent: 'flex-start', backgroundColor:'transparent'  }]}
                        >
                        <Badge
                          style={{
                            backgroundColor: styles.color || '#007AFF',
                            marginRight: 10,
                            borderColor: 'white',
                            borderWidth: 1,
                          }}>
                          <Text>&ensp;</Text>
                        </Badge>
                        <Text style={[styles.text, { fontSize: 20 }]}>QR Code Color</Text>
                      </View>
                      <View
                        style={[styles.colorPickContainer, { marginTop: 20, backgroundColor:'transparent'  }]}>
                        <Badge
                          style={{
                            backgroundColor: styles.backgroundColor || '#FF9500',
                            marginRight: 10,
                            borderColor: 'white',
                            borderWidth: 1,
                          }}>
                          <Text>&ensp;</Text>
                        </Badge>
                        <Text style={[styles.text, { fontSize: 20 }]}>Background Color</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Icon name={json.json.style?.color ? "checkmark-circle" : "alert-circle"} style={json.json.style?.color ? {color:'#4CD964', marginTop: 20} : {color:'#FFCC00', marginTop: 20}} />
              </TouchableOpacity>
            </View>
            <View style={[styles.screen, {marginTop: 30}]}>
              <TouchableOpacity style={[styles.boxButton]} disabled={!json.json.ready}>
                <View style={{backgroundColor:'transparent', flexDirection:'row', alignItems:'center'}}>
                  <Icon style={{fontSize: 18}} type="AntDesign" name={ json.json.ready ? "smileo" : "meh"} />
                  <Text style={[styles.text],{marginLeft: 10}}>Preview & Download</Text>
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
    backgroundColor:'#000'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 100
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
    borderRadius: 10
  },

  boxButton: {
    width: '95%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555554',
    borderRadius: 10
  },
  colorPickContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
