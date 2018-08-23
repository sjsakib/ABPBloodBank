import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Picker, DatePickerAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import { Text, FormInput, FormLabel, Button, Icon, FormValidationMessage } from 'react-native-elements';
import dateString from '../utilities/dateString';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    const { name, group, phone, fbId, address } = props;
    this.state = {
      name,
      group,
      phone,
      fbId,
      address,
      nameValid: true,
      phoneValid: true
    };
  }

  async save() {
    console.log(this.state);
    let { name, group, phone, fbId, address, lastDonation } = this.state;
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

    fbId = fbId ? fbId.trim().split('/') : [''];
    fbId = fbId[fbId.length - 1];

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
      address,
      lastDonation,
      admin: this.props.admin,
    });
    this.props.navigation.navigate('ProfileInfo');
  }

  async selectDate() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date(this.state.lastDonation),
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({ lastDonation: Number(new Date(year, month, day)) });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FormLabel>Name</FormLabel>
        <FormInput
          ref={ref => (this.name = ref)}
          defaultValue={this.state.name}
          placeholder="Type name..."
          onChangeText={text => this.setState({ name: text })}
        />
        <FormLabel>Blood Group </FormLabel>
        <Picker selectedValue={this.state.group} mode="dropdown" onValueChange={group => this.setState({ group })}>
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="O-" value="O-" />
        </Picker>
        <FormLabel>Phone Number</FormLabel>
        <FormInput
          ref={ref => (this.phone = ref)}
          underlineColorAndroid="orange"
          keyboardType="number-pad"
          defaultValue={this.state.phone || '01'}
          placeholder="Phone"
          onChangeText={text => this.setState({ phone: text })}
        />
        <FormLabel>Facebook Profile</FormLabel>
        <FormInput
          underlineColorAndroid="orange"
          defaultValue={`https://facebook.com/${this.state.fbId}`}
          placeholder="Facebook username or profile link"
          onChangeText={text => this.setState({ fbId: text })}
        />
        <FormLabel>Address</FormLabel>
        <FormInput
          underlineColorAndroid="orange"
          defaultValue={this.state.address}
          placeholder="Address"
          onChangeText={text => this.setState({ address: text })}
        />
        <FormLabel>Last Donation</FormLabel>
        <Button title={this.state.lastDonation ? dateString(new Date(this.state.lastDonation)) : 'NO RECORD'} onPress={() => this.selectDate()} />
        <Button raised title="SAVE" onPress={() => this.save()} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default connect((state, ownProps) => state.users[ownProps.uid])(EditProfile);
