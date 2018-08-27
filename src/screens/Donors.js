import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import ListContainer from '../containers/ListContainer';
import ProfileInfo from '../components/ProfileInfo';
import EditProfile from '../components/EditProfile';
import { Icon } from 'react-native-elements';

const DonorsNavigator = createStackNavigator(
  {
    List: { screen: ListContainer },
    ProfileInfo: { screen: ProfileInfo },
    EditProfile: { screen: EditProfile },
  },
  { headerMode: 'none' }
);

export default class Donors extends React.Component {
  render() {
    return <DonorsNavigator />;
  }
}
