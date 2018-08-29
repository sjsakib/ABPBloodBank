import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StyleSheet,
  Picker,
  DatePickerAndroid,
  Modal,
  ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import {
  Text,
  FormInput,
  FormLabel,
  Button,
  Icon,
  FormValidationMessage,
  Header,
  CheckBox
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
      lastDonation,
      hidden
    } = props;
    this.state = {
      name,
      group,
      phone,
      fbId,
      fbUsername,
      address,
      lastDonation,
      hidden,
      nameValid: true,
      phoneValid: true,
      groupValid: true
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
      lastDonation,
      hidden
    } = this.state;
    let valid = true;

    name = name && name.trim();
    if (!name) {
      this.name.shake();
      valid = false;
      this.setState({ nameValid: false });
    }

    phone = phone ? phone.trim() : '';
    if (!phone.match(/^(\+88)?01\d{9}$/)) {
      this.phone.shake();
      valid = false;
      this.setState({ phoneValid: false });
    }
    if (!group || group === 'none') {
      valid = false;
      this.setState({ groupValid: false });
    }
    if (!valid) return;

    fbUsername = fbUsername ? fbUsername.trim().split(/[/?=]/) : [''];
    fbUsername = fbUsername[fbUsername.length - 1];

    const uid = this.props.uid;

    let userRef;
    if (uid === 'NEW') {
      userRef = firebase
        .database()
        .ref('/users')
        .push();
    } else {
      userRef = firebase.database().ref('/users/' + this.props.uid);
    }
    this.setState({ saving: true });
    await userRef.set({
      name,
      phone,
      group,
      fbId,
      fbUsername,
      address,
      lastDonation,
      hidden,
      admin: this.props.admin
    });
    this.props.navigation.navigate(uid === 'NEW' ? 'List' : 'ProfileInfo', {
      uid: this.props.uid
    });
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
      <ScrollView style={styles.container}>
        <Header
          innerContainerStyles={{ alignItems: 'center' }}
          backgroundColor="white"
          leftComponent={
            <Icon
              color="#5e6977"
              raised
              name="close"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          rightComponent={
            <Icon
              color="#5e6977"
              raised
              name="check"
              onPress={() => this.save()}
            />
          }
        />
        <View style={styles.row}>
          <View style={styles.cellLeft}>
            <FormLabel>Name</FormLabel>
            <FormInput
              underlineColorAndroid={this.state.nameValid ? 'grey' : 'red'}
              ref={ref => (this.name = ref)}
              defaultValue={this.state.name || ''}
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
              style={{
                marginLeft: 10,
                color: this.state.groupValid ? 'gray' : 'red'
              }}
              selectedValue={this.state.group || 'none'}
              mode="dropdown"
              onValueChange={group =>
                this.setState({ group, groupValid: true })
              }>
              <Picker.Item label="none" value="none" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
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
          defaultValue={this.state.fbUsername || ''}
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
              : 'NO RECORD!'
          }
          onFocus={() => this.selectDate()}
        />
        <CheckBox
          title="Share contact information only with Admin"
          checkedColor="#5e6977"
          textStyle={{color: '#86939e'}}
          checked={this.state.hidden}
          onPress={() => this.setState({ hidden: !this.state.hidden })}
        />
        <Modal
          transparent={true}
          visible={this.state.saving === true}
          onRequestClose={() => console.log('trying to close')}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, .5)'
            }}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>
      </ScrollView>
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

export default connect((state, ownProps) => {
  const uid = ownProps.navigation.getParam('uid', state.currentUser.uid);
  return { ...state.users[uid], uid };
})(EditProfile);
