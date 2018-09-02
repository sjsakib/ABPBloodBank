import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

import bgMessaging from './src/utilities/bgMessaging';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
