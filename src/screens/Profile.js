import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import LoginContainer from '../containers/LoginContainer';
import ProfileInfo from '../components/ProfileInfo';
import EditProfile from '../components/EditProfile';

const Profile = ({ currentUser, editing }) => {
  if (!currentUser.uid) {
    return <LoginContainer />;
  }
  const ProfileNavigator = createStackNavigator(
    {
      ProfileInfo: {
        screen: ProfileInfo
      },
      EditProfile: {
        screen: EditProfile
      }
    },
    {
      headerMode: 'none',
      initialRouteName: editing ? 'EditProfile' : 'ProfileInfo'
    }
  );
  return <ProfileNavigator />;
};

export default connect(state => {
  const uid = state.currentUser.uid;
  const user = state.users[uid];
  return {
    currentUser: state.currentUser,
    editing: user && (!user.group || !user.phone)
  };
})(Profile);
