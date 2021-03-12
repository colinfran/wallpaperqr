import { Form, Item, Input, Icon, Label } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import VCard from 'vcard-creator';
import { Keyboard } from 'react-native';
import Carousel from '../../components/LoopedCarousel';

import { Text, View } from '../../components/Themed';
import JsonContext from '../../context';

export default class InputScreen extends React.Component {
  static contextType = JsonContext;

  constructor(props) {
    const { width, height } = Dimensions.get('window');

    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      job: '',
      company: '',
      website: '',

      formErrors: {
        firstName: false,
        lastName: false,
        phoneNumber: false,
      },

      size: { width, height },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const json = this.context;
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    this.onButtonPress(0);
    navigation.setOptions({
      gesturesEnabled: false,
      swipeEnabled: false,
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onBackPress}
        >
          <Icon name="arrow-back" style={{ color: '#fff', paddingLeft: 10 }} />
          <Text>Cancel</Text>
        </TouchableOpacity>
      ),
    });
    if (json.json.info) {
      const {
        firstName,
        lastName,
        cellPhone,
        email,
        job,
        company,
        website,
        qrCodeImage,
      } = json.json.info;
      this.setState({
        firstName,
        lastName,
        cellPhone,
        email,
        job,
        company,
        website,
        qrCodeImage,
        contentOnPage: true,
      });
    }
  }

  onBackPress = () => {
    const { navigation } = this.props;
    const json = this.context;
    // console.log(json.json)
    const removeJson = () => {
      const newJson = { ...json.json };
      newJson.info = {
        firstName: '',
        lastName: '',
        cellPhone: '',
        email: '',
        job: '',
        company: '',
        website: '',
      };
      newJson.qrcode = '';
      if (newJson?.style){
        delete newJson.style
      }
      json.updateJson(newJson);

      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: true,
      });
      navigation.navigate('HomeScreen', { component: { name: 'InputScreen', options: { bottomTabs: { visible: false, animate: true } } }, })
      // navigation.navigate('HomeScreen');
    };
    Alert.alert(
      // title
      'Are you sure?',
      // body
      "If you go back, you won't be able to continue building a QR wallpaper.",
      [
        {
          text: 'Yes',
          onPress: () => removeJson(),
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
      // clicking out side of alert will not cancel
    );
  };

  onButtonPress = (index) => {
    Keyboard.dismiss();
    this._carousel.animateToPage(index);
  };

  saveData = () => {
    if (this.formCheck()) {
      return;
    }
    const { navigation } = this.props;
    const {
 firstName, lastName, cellPhone, email, job, company, website 
} = this.state;

    const myVCard = new VCard();
    myVCard.addName(lastName, firstName);
    myVCard.addPhoneNumber(cellPhone, 'CELL');
    if (email !== '') {
      myVCard.addEmail(email);
    }
    if (company !== '') {
      myVCard.addCompany(company);
    }
    if (job !== '') {
      myVCard.addJobtitle(job);
    }
    if (website !== '') {
      myVCard.addURL(website);
    }

    const val = {
      firstName,
      lastName,
      cellPhone,
      email,
      job,
      company,
      website,
    };
    const json = this.context;
    // console.log(json.json)
    const newJson = { ...json.json };
    newJson.info = val;
    newJson.qrcode = myVCard.toString();
    json.updateJson(newJson);

    // console.log(myVCard.toString())
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: true,
    });
    navigation.navigate('HomeScreen');
  };

  formCheck = () => {
    const json = this.context;
    const { firstName, lastName, cellPhone } = this.state;
    const obj = {
      firstName: false,
      lastName: false,
      cellPhone: false,
    };
    let returnVal = false;
    if (firstName === '') {
      obj.firstName = true;
      returnVal = true;
      this.onButtonPress(0);
    } else if (lastName === '') {
      obj.lastName = true;
      returnVal = true;
      this.onButtonPress(0);
    } else if (cellPhone === '') {
      obj.cellPhone = true;
      returnVal = true;
      this.onButtonPress(1);
    }
    this.setState({ formErrors: obj });
    return returnVal;
  };

  _onLayoutDidChange = (e) => {
    const { layout } = e.nativeEvent;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  render() {
    const json = this.context;
    // console.log(json.json)
    const {
 formErrors, firstName, lastName, cellPhone, email, job, company, website 
} = this.state;
    // console.log(json)
    // console.log(formErrors)

    const formatPhoneNumber = (phoneNumberString) => {
      const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
      const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        const intlCode = match[1] ? '+1 ' : '';
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      }
      return null;
    };

    return (
      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
        <Carousel
          currentPage={0}
          keyboardShouldPersistTaps="handled"
          style={this.state.size}
          autoplay={false}
          pageInfo
          currentPage={2}
          ref={(component) => {
            this._carousel = component;
          }}
          isLooped={false}
          pageInfoBackgroundColor="#fff">
          <View style={styles.slide1}>
            <Text style={[styles.text, { marginBottom: 10 }]}>Enter your name</Text>
            <View style={{ width: '75%', backgroundColor: 'transparent' }}>
              <Form>
                <Item floatingLabel error={formErrors.firstName}>
                  <Label style={{ color: 'lightgrey' }}>First name (Required)</Label>
                  <Input
                    value={firstName}
                    style={[styles.text]}
                  autoCorrect={false}
                    onChangeText={(val) => this.setState({ firstName: val })}
                  />
                </Item>
                <Item floatingLabel error={formErrors.lastName} style={{ marginTop: 20 }}>
                  <Label style={{ color: 'lightgrey' }}>Last name (Required)</Label>
                  <Input
                    value={lastName}
                    style={styles.text}
                  autoCorrect={false}
                    onChangeText={(val) => this.setState({ lastName: val })}
                  />
                </Item>
              </Form>
              <View style={[styles.screen, { marginTop: 30 }]}>
                <TouchableOpacity
                  keyboardShouldPersistTaps="handled"
                  style={styles.boxButton}
                  onPress={() => this.onButtonPress(1)}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slide2}>
            <Text style={[styles.text, { marginBottom: 10 }]}>Enter your cell</Text>
            <View style={{ width: '75%', backgroundColor: 'transparent' }}>
              <Item floatingLabel error={formErrors.cellPhone}>
                <Label style={{ color: 'lightgrey' }}>Cell number (Required)</Label>
                <Input
                  value={formatPhoneNumber(cellPhone)}
                  style={styles.text}
                  keyboardType="number-pad"
                  onChangeText={(val) => this.setState({ cellPhone: val })}
                  returnKeyType="done"
                />
              </Item>
              <View style={[styles.screen, { marginTop: 30 }]}>
                <TouchableOpacity style={styles.boxButton} onPress={() => this.onButtonPress(2)}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slide3}>
            <Text style={[styles.text, { marginBottom: 10 }]}>Enter your email</Text>
            <View style={{ width: '75%', backgroundColor: 'transparent' }}>
              <Item floatingLabel>
                <Label style={{ color: 'lightgrey' }}>Email</Label>
                <Input
                  value={email}
                  style={styles.text}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(val) => this.setState({ email: val })}
                />
              </Item>
              <View style={[styles.screen, { marginTop: 30, backgroundColor: 'transparent' }]}>
                <TouchableOpacity style={styles.boxButton} onPress={() => this.onButtonPress(3)}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>
                    {email === '' ? 'Skip' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slide4}>
            <Text style={[styles.text, { marginBottom: 10 }]}>Enter your Job</Text>
            <View style={{ width: '75%', backgroundColor: 'transparent' }}>
              <Item floatingLabel>
                <Label style={{ color: 'lightgrey' }}>Job</Label>
                <Input
                autoCapitalize="none"
                autoCorrect={false}
                  value={job}
                  style={styles.text}
                  onChangeText={(val) => this.setState({ job: val })}
                />
              </Item>
              <View style={[styles.screen, { marginTop: 30, backgroundColor: 'transparent' }]}>
                <TouchableOpacity
                  style={[styles.boxButton, { backgroundColor: '#424242' }]}
                  onPress={() => this.onButtonPress(4)}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>
                    {job === '' ? 'Skip' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slide5}>
            <Text style={[styles.text, { marginBottom: 10 }]}>Enter your Company</Text>
            <View style={{ width: '75%', backgroundColor: 'transparent' }}>
              <Item floatingLabel>
                <Label style={{ color: 'lightgrey' }}>Company</Label>
                <Input
                autoCapitalize="none"
                autoCorrect={false}
                  value={company}
                  style={styles.text}
                  onChangeText={(val) => this.setState({ company: val })}
                />
              </Item>
              <View style={[styles.screen, { marginTop: 30, backgroundColor: 'transparent' }]}>
                <TouchableOpacity style={styles.boxButton} onPress={() => this.onButtonPress(5)}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>
                    {company === '' ? 'Skip' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slide6}>
            <Text style={[styles.text, { marginBottom: 10 }]}>Enter your Website</Text>
            <View style={{ width: '75%', backgroundColor: 'transparent' }}>
              <Item floatingLabel>
                <Label style={{ color: 'lightgrey' }}>Website</Label>
                <Input
                  value={website}
                  style={styles.text}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(val) => this.setState({ website: val })}
                />
              </Item>
              <View style={[styles.screen, { marginTop: 30, backgroundColor: 'transparent' }]}>
                <TouchableOpacity style={styles.boxButton} onPress={() => this.onButtonPress(6)}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>
                    {website === '' ? 'Skip' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.slide7}>
            <Text style={[styles.text, { marginBottom: 10, fontSize: 30 }]}>
              That's all we need
            </Text>
            <Text style={[styles.text, { marginBottom: 10, fontSize: 30 }]}>to build your QR!</Text>
            <Text style={[styles.text, { marginBottom: 10, fontSize: 20 }]}>
              Press save to continue
            </Text>
            <View style={{ width: '75%', backgroundColor: 'transparent' }}>
              <View style={[styles.screen, { marginTop: 30 }]}>
                <TouchableOpacity style={styles.boxButton} onPress={this.saveData}>
                  <Text style={[styles.text, { fontSize: 16, fontWeight: '400' }]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height + 100,
  },
  button: {
    flex: 1,
    marginTop: 15,
  },
  buttonText: {
    color: '#000',
  },
  text: {
    color: '#fff',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d4d4d',
    paddingBottom: 200,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#424242',
    paddingBottom: 200,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#373737',
    paddingBottom: 200,
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    paddingBottom: 200,
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    paddingBottom: 200,
  },
  slide6: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
    paddingBottom: 200,
  },
  slide7: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0B',
    paddingBottom: 200,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
  },
  boxButton: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B2B2E',
    borderRadius: 10,
  },
});
