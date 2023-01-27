import Splashscreen from '@components/Splashscreen';
import '@i18n';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from '@routes';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import customTheme from '@theme';
import { NativeBaseProvider, StatusBar } from 'native-base';
import React, { FC, Suspense, useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';
import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

enableScreens();

const customTextProps = {
  allowFontScaling: false,
  style: {
    fontFamily: 'Satoshi',
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
    },
  },
});

export const getWidth: () => string = () => (Platform.OS === 'android' ? '150%' : 'auto');

const App: FC = () => {
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
