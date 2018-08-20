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
  return createStackNavigator({ ProfileInfo: { screen: () => <ProfileInfo uid={currentUser.uid} /> } });
};

export default connect(state => ({ currentUser: state.currentUser }))(Profile);
