import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ListContainer from '../containers/ListContainer';
import ProfileInfo from '../components/ProfileInfo';
import EditProfile from '../components/EditProfile';

const DonorsNavigator = createStackNavigator(
  {
    List: { screen: ListContainer },
    ProfileInfo: { screen: ProfileInfo },
    EditProfile: { screen: EditProfile }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default class Donors extends React.Component {
  render() {
    return <DonorsNavigator />;
  }
}
