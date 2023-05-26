/**
 * @format
 */
import Clarity from '@Clarity';
import messaging from '@react-native-firebase/messaging';
import React from 'react';
import { AppRegistry, LogBox, Platform } from 'react-native';
import { Settings } from 'react-native-fbsdk-next';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import { name as appName } from './app.json';
import App from './src/App';

export async function initPixel() {
  if (Platform.OS === 'ios') {
    const ATT_CHECK = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    if (ATT_CHECK === RESULTS.DENIED) {
      try {
        const ATT = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
        if (ATT === RESULTS.GRANTED) {
          Settings.setAdvertiserTrackingEnabled(true).then(() => {
            Settings.initializeSDK();
            Settings.FacebookAutoLogAppEventsEnabled(true);
          });
        }
      } catch (error) {
        console.error('facebook sdk: ', error);
      } finally {
        // Settings.initializeSDK();
      }
      // Settings.initializeSDK();
      // Settings.setAdvertiserTrackingEnabled(true);
    }
  } else {
    Settings.initializeSDK();
    Settings.setAdvertiserTrackingEnabled(true);
  }
}

function HeadlessCheck({ isHeadless }) {
  React.useEffect(() => {
    initPixel();
    Clarity.initialize();
  }, []);

  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Remove YellowBox on Debug application screen
LogBox.ignoreAllLogs(true);
// AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent(appName, () => HeadlessCheck);
