import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Button, Icon } from 'react-native-elements';

const ProfileInfo = ({ fbId, name, group, navigation }) => {
  return (
    <View style={styles.container}>
      <Avatar rounded size="large" source={fbId && { uri: `https://graph.facebook.com/${fbId}/picture?type=large` }} />
      <Text>{name}</Text>
      <View style={styles.row}>
        <Icon name="drop" type="entypo" color="tomato" />
        <Text>{group}</Text>
      </View>
      <Button
        icon={<Icon type="entypo" color="white" size={15} name="edit" />}
        buttonStyle={{
          backgroundColor: 'rgba(92, 99,216, 1)',
          width: 300,
          height: 45,
          borderRadius: 5
        }}
        rounded
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  row: {
    flexDirection: 'row'
  }
});

export default connect((state, ownProps) => state.users[ownProps.uid])(ProfileInfo);
