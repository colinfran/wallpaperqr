import React,{useLayoutEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Icon,ListItem, Left, Button, Body, Right, List, Content} from 'native-base';

import { Text, View } from '../../components/Themed';

export default function SettingScreen({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor:'transparent',
      headerShown: true,
      title: "",
      headerStyle: {
        backgroundColor: 'transparent'
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={[styles.screen]}>
        <View style={{width: '95%', height: 40,justifyContent: 'center',marginBottom: 30}}>
          <Text style={{color:'#fff', fontSize: 32, fontWeight:'bold'}}>Settings</Text>
        </View>
        <View style={{width: '95%', height: 30,justifyContent: 'center',marginBottom: 10}}>
          <Text style={{color:'#fff', fontSize: 22, fontWeight:'bold', marginLeft: 5}}>Help</Text>
        </View>
        <View style={styles.box}>
          <List style={{width:'100%'}}>
            <ListItem underlayColor="#2B2B2E" touchableHighlightStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} icon button={true} onPress={()=>navigation.navigate('FAQScreen')} >
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon type="MaterialCommunityIcons" name="help-circle-outline" />
                </Button>
              </Left>
              <Body>
                <Text style={{fontSize: 18}}>FAQs</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={()=>navigation.navigate('GuideScreen')} underlayColor="#2B2B2E" touchableHighlightStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} icon style={{borderBottomWidth: 0}} button={true}  >
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon type="MaterialCommunityIcons" name="information-outline" />
                </Button>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={{fontSize: 18}}>Guide</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </View>
      </View>
      <View style={[styles.screen, {marginTop: 30}]}>
        <View style={{width: '95%', height: 30,justifyContent: 'center',marginBottom: 10}}>
          <Text style={{color:'#fff', fontSize: 22, fontWeight:'bold', marginLeft: 5}}>General</Text>
        </View>
        <View style={[styles.box]}>
          <List style={{width:'100%'}}>
            <ListItem onPress={()=>navigation.navigate('RateScreen')} underlayColor="#2B2B2E" touchableHighlightStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} icon style={{}} button={true} >
              <Left>
                <Button style={{ backgroundColor: "#8fd158" }}>
                  <Icon type="MaterialCommunityIcons" name="star-circle-outline" />
                </Button>
              </Left>
              <Body>
                <Text style={{fontSize: 18}}>Rate this app</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={()=>navigation.navigate('LicensesScreen')}  underlayColor="#2B2B2E" icon style={{}} button={true}  >
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon type="MaterialCommunityIcons" name="copyright" />
                </Button>
              </Left>
              <Body>
                <Text style={{fontSize: 18}}>Licenses</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={()=>navigation.navigate('PrivacyPolicyScreen')}  underlayColor="#2B2B2E" touchableHighlightStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} icon style={{borderBottomWidth: 0}} button={true}  >
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon type="MaterialCommunityIcons" name="text-box-outline" />
                </Button>
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text style={{fontSize: 18}}>Privacy Policy</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '95%',
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
});
