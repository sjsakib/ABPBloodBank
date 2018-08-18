import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import Profile from './screens/Profile';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'

const customDrawer = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text>ABP</Text>
    </View>
    <View>
      <DrawerItems {...props} />
    </View>
  </View>
);

const MainNavigator = createDrawerNavigator(
  {
    Profile: {
      screen: Profile
    }
  },
  {
    contentComponent: customDrawer
  }
);

// Calling the following function will open the FB login dialogue:
const facebookLogin = async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw new Error('User cancelled request'); // Handle this however fits the flow of your app
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

    console.info(JSON.stringify(currentUser.user.toJSON()))
  } catch (e) {
    console.error(e);
  }
}

export default class App extends React.Component {
  componentDidMount() {
    facebookLogin();
  }
  render() {
    return <MainNavigator />;
  }
}
