import firebase from 'react-native-firebase';

export default async message => {
  const data = message.data;
  const notification = new firebase.notifications.Notification()
    .setNotificationId(message.messageId)
    .setTitle(data.title)
    .setBody(data.message)
    .setData(data)
    .android.setChannelId(data.channelId)
    .android.setBigPicture(data.picture);

  firebase.notifications().displayNotification(notification);

  return Promise.resolve();
};
