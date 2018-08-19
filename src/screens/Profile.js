import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Profile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Login',
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="email"
        size={30}
        iconStyle={{
          width: 30,
          height: 30
        }}
        type="material"
        color={tintColor}
      />
    )
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello Ashuganj!!!</Text>
      </View>
    );
  }
}
