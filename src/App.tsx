import Splashscreen from '@components/Splashscreen';
import '@i18n';
// import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from '@routes';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import customTheme from '@theme';
// import axios from 'axios';
import { NativeBaseProvider, StatusBar } from 'native-base';
import React, { FC, Suspense, useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

// import { notificationManager } from './NotificationManager';

enableScreens();

const customTextProps = {
  allowFontScaling: false,
  style: {
    width: Platform.OS === 'android' ? '100%' : 'auto',
  },
};

setCustomTextInput(customTextProps);
setCustomText(customTextProps);

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 3,
      staleTime: 5 * 60 * 1000,
      // refetchInterval: 60 * 1000,
    },
  },
});

export const getWidth: () => string = () => (Platform.OS === 'android' ? '150%' : 'auto');

const App: FC = () => {
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     sendFcmToken();
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  // React.useEffect(() => {
  //   requestUserPermission();
  // }, []);

  // const sendFcmToken = async () => {
  //   try {
  //     await messaging().registerDeviceForRemoteMessages();
  //     const deviceToken = await messaging().getToken();
  //     console.log(deviceToken);
  //     console.log('Your Firebase Token is:', deviceToken);

  //     const res = await axios.post('https://dart-africa.herokuapp.com/device/token', { deviceToken });
  //     console.log('Your Firebase Token is:', deviceToken, 'res is', res);
  //   } catch (err) {
  //     //Do nothing
  //     console.log(err.response.data);
  //     return;
  //   }
  // };

  // React.useEffect(() => {
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     notificationManager.showNotification(
  //       remoteMessage?.messageId,
  //       remoteMessage?.notification?.title,
  //       remoteMessage?.notification?.body,
  //       remoteMessage?.data,
  //       remoteMessage?.options,
  //       remoteMessage?.date || new Date(),
  //     );
  //   });
  //   return unsubscribe;
  // }, []);
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Suspense fallback={<Splashscreen />}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <NativeBaseProvider theme={customTheme}>
            <QueryClientProvider client={queryClient}>
              <StatusBar barStyle="default" />
              <RootStackScreen />
            </QueryClientProvider>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Suspense>
  );
};

export default App;
