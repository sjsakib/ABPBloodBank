import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Picker,
  DatePickerAndroid
} from 'react-native';
import firebase from 'react-native-firebase';
import {
  Text,
  FormInput,
  FormLabel,
  Button,
  Icon,
  FormValidationMessage,
  Header
} from 'react-native-elements';
import dateString from '../utilities/dateString';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    const {
      name,
      group,
      phone,
      fbId,
      fbUsername,
      address,
      lastDonation
    } = props;
    this.state = {
      name,
      group,
      phone,
      fbId,
      fbUsername,
      address,
      lastDonation,
      nameValid: true,
      phoneValid: true
    };
  }

  async save() {
    let {
      name,
      group,
      phone,
      fbId,
      fbUsername,
      address,
      lastDonation
    } = this.state;
    let valid = true;

    name = name.trim();
    if (!name) {
      this.name.shake();
      valid = false;
      this.setState({ nameValid: false });
    }

    phone = phone ? phone.trim() : '';
    if (!phone.match(/^(\+88)?01\d{9}$/)) {
      console.log(phone);
      this.phone.shake();
      valid = false;
      this.setState({ phoneValid: false });
    }
    if (!valid) return;

    fbUsername = fbUsername ? fbUsername.trim().split('/') : [''];
    fbUsername = fbUsername[fbUsername.length - 1];

    let userRef;
    if (this.props.add) {
      userRef = firebase.database.ref('/users').push();
    } else {
      userRef = firebase.database().ref('/users/' + this.props.uid);
    }
    console.log(address);
    userRef.set({
      name,
      phone,
      group,
      fbId,
      fbUsername,
      address,
      lastDonation,
      admin: this.props.admin
    });
    this.props.navigation.navigate('ProfileInfo');
  }

  async selectDate() {
    this.lastDonation.blur();
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date(this.state.lastDonation)
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({ lastDonation: Number(new Date(year, month, day)) });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          innerContainerStyles={{alignItems: 'center'}}
          backgroundColor="white"
          leftComponent={<Icon color="orange" raised name="close" onPress={() => this.props.navigation.goBack()}/>}
          rightComponent={<Icon color="orange" raised name="check" onPress={() => this.save()}/>}
        />
        <View style={styles.row}>
          <View style={styles.cellLeft}>
            <FormLabel>Name</FormLabel>
            <FormInput
              underlineColorAndroid={this.state.nameValid ? 'grey' : 'red'}
              ref={ref => (this.name = ref)}
              defaultValue={this.state.name}
              placeholder="Type name..."
              onChangeText={text =>
                this.setState({ name: text, nameValid: true })
              }
            />
          </View>
          <View style={styles.cellRight}>
            <FormLabel>Blood Group </FormLabel>
            <Picker
              underlineColorAndroid="grey"
              style={{ marginLeft: 10, color: '#000' }}
              selectedValue={this.state.group}
              mode="dropdown"
              onValueChange={group => this.setState({ group })}>
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          </View>
        </View>
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          ref={ref => (this.phone = ref)}
          underlineColorAndroid={this.state.phoneValid ? 'grey' : 'red'}
          keyboardType="number-pad"
          defaultValue={this.state.phone || '01'}
          placeholder="Phone"
          onChangeText={text =>
            this.setState({ phone: text, phoneValid: true })
          }
        />
        <FormLabel>Facebook Profile</FormLabel>
        <FormInput
          underlineColorAndroid="grey"
          defaultValue={`https://facebook.com/${this.state.fbUsername}`}
          placeholder="Facebook username or profile link"
          onChangeText={text => this.setState({ fbUsername: text })}
        />
        <FormLabel>Address</FormLabel>
        <FormInput
          underlineColorAndroid="grey"
          defaultValue={this.state.address}
          placeholder="Address"
          onChangeText={text => this.setState({ address: text })}
        />
        <FormLabel>Last Donation</FormLabel>
        <FormInput
          underlineColorAndroid="grey"
          ref={ref => (this.lastDonation = ref)}
          defaultValue={
            this.state.lastDonation
              ? dateString(new Date(this.state.lastDonation))
              : 'NO RECORD'
          }
          onFocus={() => this.selectDate()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row'
  },
  cellLeft: {
    flex: 1
  },
  cellRight: {
    flex: 1
  }
});

export default connect((state, ownProps) => state.users[ownProps.uid])(
  EditProfile
);
