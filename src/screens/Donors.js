import React from 'react';
import { View, Text } from 'react-native';
import ListContainer from '../containers/ListContainer';
import { Icon } from 'react-native-elements';


export default class Profile extends React.Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <ListContainer />
      </View>
    );
  }
}
