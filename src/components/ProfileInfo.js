import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import dateString from '../utilities/dateString';
import LoadingIndicator from './LoadingIndicator';

const ProfileInfo = props => {
  if (!props.userInfo) return <LoadingIndicator />;
  const {
    fbId,
    fbUsername,
    name,
    group,
    phone,
    lastDonation,
    address
  } = props.userInfo;
  const navigation = props.navigation;
  console.log(props.currentUser);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          {!isNaN(fbId) && (
            <Avatar
              rounded
              xlarge
              title={name[0]}
              source={{
                uri: `https://graph.facebook.com/${fbId}/picture?type=large`
              }}
            />
          )}
        </View>
        <View style={styles.topRight}>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Icon raised color="orange" name="drop" type="entypo" />
          <Text style={styles.rowText}>{group}</Text>
        </View>
        <View style={styles.row}>
          <Icon
            raised
            color="orange"
            name="phone"
            type="entypo"
            onPress={() => Linking.openURL(`tel:${phone}`)}
          />
          <Text style={styles.rowText}>{phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon raised color="orange" name="calendar" type="entypo" />
          <Text style={styles.rowText}>
            {lastDonation
              ? dateString(new Date(lastDonation), 'long')
              : 'No record!'}
          </Text>
        </View>
        {address ?  (
          <View style={styles.row}>
            <Icon raised color="orange" name="location" type="entypo" />
            <View style={styles.address}>
              <Text style={styles.rowText}>{address}</Text>
            </View>
          </View>
        ) : null }
        {fbUsername ? (
          <View style={styles.fb}>
            <Icon
              raised
              color="orange"
              name="facebook-f"
              type="font-awesome"
              onPress={() => Linking.openURL(`https://fb.me/${fbUsername}`)}
            />
            <Icon
              raised
              color="orange"
              name="facebook-messenger"
              type="material-community"
              onPress={() => Linking.openURL(`https://m.me/${fbUsername}`)}
            />
          </View>
        ) : null}
      </View>
      {(props.currentUser.uid === props.uid || props.currentUser.admin) && (
        <View style={styles.editButton}>
          <Icon
            name="account-edit"
            raised
            type="material-community"
            color="orange"
            onPress={() =>
              navigation.navigate('EditProfile', { uid: props.uid })
            }
          />
        </View>
      )}
      {/*<Button
        leftIcon={{ name: 'edit' }}
        buttonStyle={styles.editButton}
        rounded
        title="EDIT"
        onPress={() => navigation.navigate('EditProfile')}
      />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  top: {
    flexDirection: 'row'
  },
  topRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
  nameText: {
    // fontFamily: 'sans-serif-light',
    fontSize: 32,
    textAlign: 'center',
    color: 'hsl(200, 15%, 55%)'
  },
  bottom: {
    marginTop: 30
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowText: {
    // fontFamily: 'sans-serif-light',
    flexWrap: 'wrap',
    fontSize: 20,
    marginLeft: 20,
    color: 'hsl(200, 18%, 62%)'
  },
  address: {
    flex: 1,
    flexDirection: 'row'
  },
  fb: {
    flexDirection: 'row',
    justifyContent: 'center'
    // marginBottom: 20
  },
  editButton: {
    // backgroundColor: 'hsl(200, 18%, 62%)',
    // width: 100,
    alignSelf: 'center'
  }
});

export default connect((state, ownProps) => {
  const uid = ownProps.navigation.getParam('uid', state.currentUser.uid);
  return {
    userInfo: state.users[uid],
    currentUser: state.currentUser,
    uid
  };
})(ProfileInfo);
