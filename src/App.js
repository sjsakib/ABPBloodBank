import React from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { getReady, updateCurrenUser, updateUserInfo } from './actions';
import Profile from './screens/Profile';
import Donors from './screens/Donors';
import { Icon } from 'react-native-elements';

// Create the main navigator
const MainNavigator = createBottomTabNavigator(
  {
    Donors: {
      screen: Donors
    },
    Profile: {
      screen: Profile
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Donors') {
          iconName = 'drop';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        }

        return (
          <Icon name={iconName} size={30} color={tintColor} type="entypo" />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'orange'
    }
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
      if (data.key === currentUser.uid && info.admin) {
        dispatch(updateCurrenUser({ uid: data.key, amdin: true }));
      }
    });

    usersRef.on('child_changed', data => {
      const info = data.val();
      dispatch(updateUserInfo(data.key, info));
      if (data.key === currentUser.uid && info.admin) {
        dispatch(updateCurrenUser({ uid: data.key, amdin: true }));
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
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return <MainNavigator />;
  }
}

export default connect(state => ({ ready: state.ready }))(App);
