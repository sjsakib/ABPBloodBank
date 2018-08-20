import React from 'react';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../actions';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
// import UserInfo from '../components/UserInfo';
// import EditProfile from '../containers/EditProfile';
import { Text, Button, Icon } from 'react-native-elements';

const Profile = ({ currentUser, login }) => {
  if (!currentUser.uid) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text h4>Become a donor today</Text>
          <Text>Enlist your phone and blood group</Text>
        </View>
        <LoginButton onLoginFinished={login} />
      </View>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: async (error, result) => {
      if (error) {
        alert('Login failed. Make sure your internet connection is working');
        return;
      }
      if (result.isCancelled) {
        alert('Login canceled.');
        return;
      }
      const fbCredential = await AccessToken.getCurrentAccessToken();
      const credential = firebase.auth.FacebookAuthProvider.credential(fbCredential.accessToken);
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      const userNewData = currentUser.user.toJSON();

      const userRef = firebase.database().ref('/users/' + userNewData.uid);
      const userSnap = await userRef.once('value');
      const userData = userSnap.exists() ? userSnap.val() : {};
      await userRef.set({ ...userData, fbId: userNewData.providerData[0].uid, name: userNewData.displayName });

      dispatch(updateCurrentUser({ uid: userNewData.uid, admin: userData.admin, editing: true }));
    }
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(Profile);
