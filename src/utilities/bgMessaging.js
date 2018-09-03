import firebase from 'react-native-firebase';

export default async message => {
  const data = message.data;
  const notification = new firebase.notifications.Notification()
    .setNotificationId(message.messageId)
    .setTitle(data.title)
    .setBody(data.message)
    .setData(data)
    .android.setChannelId(data.channelId)
    .android.setLargeIcon('ic_launcher')
    .android.setBigPicture(data.picture, 'ic_launcher')
    .android.setAutoCancel(true);

  firebase.notifications().displayNotification(notification);

  return Promise.resolve();
};
