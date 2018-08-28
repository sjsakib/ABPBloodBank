import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { Text, Button, Icon } from 'react-native-elements';

const Login = ({ login, savingUser }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text h4>Become a donor today</Text>
        <Text>Enlist your phone number and blood group</Text>
      </View>
      {savingUser ? (
        <ActivityIndicator size="large" />
      ) : (
        <LoginButton onLoginFinished={login} />
      )}
    </View>
  );
};

export default Login;
