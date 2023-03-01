/**
 * @format
 */
// import messaging from '@react-native-firebase/messaging';
import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

// Remove YellowBox on Debug application screen
LogBox.ignoreAllLogs(true);
// AppRegistry.registerComponent(appName, () => App);
// eslint-disable-next-line no-undef
AppRegistry.registerComponent(appName, () => HeadlessCheck);
