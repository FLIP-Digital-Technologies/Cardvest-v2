import Splashscreen from '@components/Splashscreen';
import env from '@env';
import '@i18n';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from '@routes';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import customTheme from '@theme';
import { NativeBaseProvider, StatusBar } from 'native-base';
import React, { FC, Suspense, useEffect } from 'react';
import { Platform } from 'react-native';
import { Adjust, AdjustConfig } from 'react-native-adjust';
import { AdjustOaid } from 'react-native-adjust-oaid';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import RNUxcam from 'react-native-ux-cam';
import { MixpanelProvider } from './MixpanelAnalytics';
import NotificationContainer from './NotificationContainer';

// import { CaptureConsole } from '@sentry/integrations';
// import * as Sentry from '@sentry/react-native';
// Sentry.init({
//   dsn: 'https://1e1707ce69834cf180a71be12fbcf40e@o4504776356003840.ingest.sentry.io/4504776371077120',
//   integrations: [
//     new CaptureConsole({
//       levels: ['error'],
//     }),
//   ],
//   // This sets the sample rate to be 10%. You may want this to be 100% while
//   // in development and sample at a lower rate in production
//   // @ts-ignore
//   replaysSessionSampleRate: 0.3,
//   // If the entire session is not sampled, use the below sample rate to sample
//   // sessions when an error occurs.
//   replaysOnErrorSampleRate: 1.0,
// });

enableScreens();

// Setup for react-native-global-props
const customTextProps = {
  allowFontScaling: false,
  style: {
    fontFamily: 'Satoshi',
    // width: Platform.OS === 'android' ? '100%' : 'auto',
  },
};

setCustomText(customTextProps);
setCustomTextInput(customTextProps);

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchInterval: 3 * 60 * 1000,
    },
  },
});

export const getWidth: () => string = () => (Platform.OS === 'android' ? '150%' : 'auto');

const App: FC = () => {
  Adjust.getSdkVersion(function (sdkVersion) {
    console.log('Adjust SDK version: ' + sdkVersion);
  });
  useEffect(() => {
    const adjustConfig = new AdjustConfig(env.ADJ_TOKEN, AdjustConfig.EnvironmentSandbox);

    if (Platform.OS === 'android') {
      AdjustOaid.readOaid();
    }
    Adjust.initSdk(adjustConfig);
    return () => {
      Adjust.componentWillUnmount();
    };
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
  const configuration = {
    userAppKey: 'zufsj0ftpxzwy91',
    enableAutomaticScreenNameTagging: false,
    enableImprovedScreenCapture: true,
  };
  RNUxcam.startWithConfiguration(configuration);

  // Overlay over screens
  const overlay = {
    type: 2,
    color: 0x39ca95,
    hideGestures: true,
    screens: [
      'LoginPage', 'SignUpPage', 'SetTransactionPin',
      'LoginBackPage', 'WithdrawalPage', 'WithdrawalUSDT'
    ],
  };

  RNUxcam.applyOcclusion(overlay);

  return (
    <Suspense fallback={<Splashscreen />}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <NativeBaseProvider theme={customTheme}>
            <QueryClientProvider client={queryClient}>
              <MixpanelProvider>
                <NotificationContainer>
                  <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
                  <RootStackScreen />
                </NotificationContainer>
              </MixpanelProvider>
            </QueryClientProvider>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Suspense>
  );
};

export default App;
