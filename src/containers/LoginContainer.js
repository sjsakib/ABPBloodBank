import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import Login from '../components/Login';
import { updateCurrentUser } from '../actions';

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
      const newUserData = { ...userData, uid: userNewData.uid, fbId: userNewData.providerData[0].uid, name: userNewData.displayName, new: true };
      await userRef.set(newUserData);

      dispatch(updateCurrentUser(newUserData));

      await AsyncStorage.setItem('currentUser', JSON.stringify(newUserData));
      
    }
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
