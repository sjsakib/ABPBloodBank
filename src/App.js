import React from 'react';
import { View, ActivityIndicator, AsyncStorage, StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import firebase from 'react-native-firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { getReady, updateCurrentUser, updateUserInfo } from './actions';
import Profile from './screens/Profile';
import Donors from './screens/Donors';
import About from './screens/About';
import { Icon } from 'react-native-elements';

// Create the main navigator
const MainNavigator = createMaterialBottomTabNavigator(
  {
    Donors: {
      screen: Donors
    },
    Profile: {
      screen: Profile
    },
    About: {
      screen: About
    }
  },
  {
    shifting: true,
    barStyle: { backgroundColor: '#FF9800' },
    activeTintColor: '#d50000',
    inactiveTintColor: '#e57373',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Donors') {
          iconName = 'water';
        } else if (routeName === 'Profile') {
          iconName = 'account';
        } else if (routeName === 'About') {
          iconName = 'account-group';
        }

        return (
          <Icon name={iconName} color={tintColor} type="material-community" />
        );
      }
    })
  }
);

// Define root component, load current user and data
class App extends React.Component {
  componentDidMount() {
    this.load();
    // this.authenticate();
  }

  async load() {
    const dispatch = this.props.dispatch;

    // load current user from disk
    const currentUser = JSON.parse(
      await AsyncStorage.getItem('currentUser')
    ) || { uid: null, admin: false };
    dispatch(getReady(currentUser));

    //start loading users
    const usersRef = firebase.database().ref('/users');
    usersRef.on('child_added', data => {
      const info = data.val();
      dispatch(updateUserInfo(data.key, info));
      if (data.key === currentUser.uid) {
        dispatch(updateCurrentUser({ uid: data.key, admin: info.admin }));
      }
    });

    usersRef.on('child_changed', data => {
      const info = data.val();
      dispatch(updateUserInfo(data.key, info));
      if (data.key === currentUser.uid) {
        dispatch(updateCurrentUser({ uid: data.key, admin: info.admin }));
      }
    });

    // if user signed in, refresh authentication
    /*if (currentUser.uid) {
      // const
    }*/
  }

  async authenticate() {
    const result = LoginManager.log;
    const accessToken = AccessToken.getCurrentAccessToken();
    console.log(accessToken);
  }

  render() {
    if (!this.props.ready) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <MainNavigator />
      </View>
    );
  }
}

export default connect(state => ({ ready: state.ready }))(App);
