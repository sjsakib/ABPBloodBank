import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import Login from '../components/Login';
import { updateCurrentUser, savingUser } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    login: async (error, result) => {
      if (error) {
        alert('Login failed. Make sure your internet connection is working.');
        return;
      }
      if (result.isCancelled) {
        alert('Login canceled.');
        return;
      }
      dispatch(savingUser());
      const fbCredential = await AccessToken.getCurrentAccessToken();
      const credential = firebase.auth.FacebookAuthProvider.credential(
        fbCredential.accessToken
      );
      const currentUser = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);
      const userNewData = currentUser.user.toJSON();

      const userRef = firebase.database().ref('/users/' + userNewData.uid);
      const userSnap = await userRef.once('value');
      const userData = userSnap.exists() ? userSnap.val() : {};
      await userRef.set({
        ...userData,
        fbId: userNewData.providerData[0].uid,
        name: userNewData.displayName
      });

      dispatch(
        updateCurrentUser({
          uid: userNewData.uid,
          admin: userData.admin
        })
      );
      AsyncStorage.setItem(
        'currentUser',
        JSON.stringify({ uid: userNewData.uid, admin: userData.admin })
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    savingUser: state.savingUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
