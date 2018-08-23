import React from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { Text, Button, Icon } from 'react-native-elements';

const Login = ({ login }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text h4>Become a donor today</Text>
        <Text>Enlist your phone and blood group</Text>
      </View>
      <LoginButton onLoginFinished={login} />
    </View>
  );
};

export default Login;
