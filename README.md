# ABPBloodBank
A blood donor management app with react native and firebase. This app was developed to help [Asroy Bidyapith](https://www.facebook.com/Asroy.biddapith/) with their blood management activity in Ashuganj and nearby areas. Feel free to clone it for your own locality.

The app is available [here.](https://play.google.com/store/apps/details?id=com.abpbloodbank)

## Features
* Search donors with name or address
* Filter with blood group and availability according to last donation date
* Users can sign in with Facebook to enlist their blood group and contact informations
* Users can choose to share their contact informations only with admin, in that case, admin contact is shown in their profile info screen
* Admin can manually add donors or update last donation information
* Admin or user can update their last donation information

## Key technologies/packages used
* React Native
* React Native Firebase
* React Native Elements
* React Navigation
* Redux

# Setps to clone this project

1. First of all you will need to install and configure Android SDK. Follow the `Building Projects with Native Code` section in this [official guide.](https://facebook.github.io/react-native/docs/getting-started)

2. Then clone and rename this project. Renaming can be tricky. Try using [this package.](https://www.npmjs.com/package/react-native-rename)

3. Create a firebase project [here.](https://firebase.google.com/console)

4. A `google-services.json` file contains all of the information required by the Firebase Android SDK to connect to your Firebase project. To automatically generate the json file, follow [this guide](https://github.com/react-native-community/react-native-google-signin/blob/master/get-config-file.md) to generate the file. Once downloaded, place this file in the root of the project at `android/app/google-services.json`. Replace the existing file.

5. Create a realtime database from firebase console with this following security rules.

```json
{
  "rules": {
    "contact_info": {
      "$uid": {
        ".read": "data.child('hidden').val() != true || $uid === auth.uid || root.child('users').child(auth.uid).child('admin').val() == true",
        ".write": "(data.child('hidden').val() != true || $uid === auth.uid || root.child('users').child(auth.uid).child('admin').val() == true) && data.child('admin').val() === newData.child('admin').val()"
      }
    },
    "users": {
      ".read": true,
      "$uid": {
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('admin').val() == true"
      }
    }
  }
}
```

6. Follow the [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started/) for Facebook Android SDK to set up a Facebook app. You don't need to follow the whole guide, just the create a new facebook app, update the `strings.xml` and add the `Key Hash`

7. Install the dependencies with `yarn install`.

8. Now you should be able to run the project with `react-native run-android`


If you need any help, feel free to ping me.


If you clone this project, please keep a link back to [Asroy Bidyapith.](https://www.facebook.com/Asroy.biddapith/) (and maybe the original project too!)