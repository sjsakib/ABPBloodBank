# ABPBloodBank
A blood donor management app with react native and firebase. This app was developed to help [Asroy Bidyapith](https://www.facebook.com/Asroy.biddapith/) with their blood management activity in Ashuganj and nearby areas. Feel free to clone it for your own locality.

The app is available [here.](https://play.google.com/store/apps/details?id=com.abpbloodbank)

## Features
* Search donors with name or address
* Filter with blood group and availability according to last donation date
* Users can sign in with Facebook to enlist their blood group and contact informations
* Users can choose to share their contact informations only with admin
* Admin can manually add donors
* Admin or user can update their last donation information

## Key technologies/packages used
* React Native
* React Native Firebase
* React Native Elements
* React Navigation
* Redux

### Firebase security rule
Here's the firebase security rule in case you need it to clone the project
```json
{
  "rules": {
    "contact_info": {
      "$uid": {
        ".read": "data.child('hidden').val() != true || $uid === auth.uid || root.child('users').child(auth.uid).child('admin').val() == true",
        ".write": "data.child('hidden').val() != true || $uid === auth.uid || root.child('users').child(auth.uid).child('admin').val() == true"
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
