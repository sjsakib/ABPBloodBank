import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import LoginContainer from '../containers/LoginContainer';
import ProfileInfo from '../components/ProfileInfo';
import EditProfile from '../components/EditProfile';

const Profile = ({ currentUser }) => {
  console.log(currentUser);
  if (!currentUser.uid) {
    return <LoginContainer />;
  }
  const ProfileNavigator = createStackNavigator(
    {
      ProfileInfo: {
        screen: ({ navigation }) => (
          <ProfileInfo uid={currentUser.uid} navigation={navigation} />
        )
      },
      EditProfile: {
        screen: ({ navigation }) => (
          <EditProfile uid={currentUser.uid} navigation={navigation} />
        )
      }
    },
    { headerMode: 'none' }
  );
  return <ProfileNavigator />;
};

export default connect(state => ({ currentUser: state.currentUser }))(Profile);
