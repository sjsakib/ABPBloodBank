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
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Avatar
            rounded
            xlarge
            title={name[0]}
            source={
              !isNaN(fbId) && {
                uri: `https://graph.facebook.com/${fbId}/picture?type=large`
              }
            }
          />
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
              : 'No record'}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon raised color="orange" name="location" type="entypo" />
          <Text style={styles.rowText}>{address}</Text>
        </View>
        {fbUsername && (
          <View style={styles.fb}>
            <Icon
              raised
              color="orange"
              name="facebook-f"
              type="font-awesome"
              onPress={() =>
                Linking.openURL(`https://facebook.com/${fbUsername}`)
              }
            />
            <Icon
              raised
              color="orange"
              name="facebook-messenger"
              type="material-community"
              onPress={() => Linking.openURL(`https://m.me/${fbUsername}`)}
            />
          </View>
        )}
      </View>
      <Button
        leftIcon={{ name: 'edit' }}
        buttonStyle={styles.editButton}
        rounded
        title="EDIT"
        onPress={() => navigation.navigate('EditProfile')}
      />
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
    fontFamily: 'sans-serif-light',
    fontSize: 32,
    textAlign: 'center'
  },
  bottom: {
    marginTop: 30
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    marginLeft: 20
  },
  fb: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  editButton: {
    // backgroundColor: "orange",
    width: 120,
    alignSelf: 'center'
  }
});

export default connect((state, ownProps) => ({
  userInfo: state.users[ownProps.uid]
}))(ProfileInfo);
