import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GenericNavigationProps } from '@routes/types';
import ForgetPasswordEnterEmailPage from '@scenes/ForgetPasswordEnterEmailPage';
import IntroPage from '@scenes/IntroPage';
import LoginBackPage from '@scenes/LoginBackPage';
import LoginPage from '@scenes/LoginPage';
import ResendVerifyEmailPage from '@scenes/ResendVerifyEmailPage';
import ResetPage from '@scenes/ResetPage';
import SetTransactionPin from '@scenes/SetTransactionPin';
import SignUpPage from '@scenes/SignUpPage';
import Step2 from '@scenes/SignUpPage/Step2';
import Step3 from '@scenes/SignUpPage/Step3';
import VerifyPage from '@scenes/VerifyPage';
import navigationService from '@utils/Nav';
import { cacheService } from '@utils/cache';
import React, { FC, useEffect, useLayoutEffect, useState, Fragment } from 'react';
import { notificationManager } from '../NotificationManager';
import { MainStackScreen } from './stacks/MainStack';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen: FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginPage} />
    <AuthStack.Screen name="LoginBack" component={LoginBackPage} />
    <AuthStack.Screen name="SignUp" component={SignUpPage} />
    <AuthStack.Screen name="SignUpStep2" component={Step2} />
    <AuthStack.Screen name="SignUpStep3" component={Step3} />
    <AuthStack.Screen name="Verify" component={VerifyPage} />
    <AuthStack.Screen name="ResendVerify" component={ResendVerifyEmailPage} />
    <AuthStack.Screen name="ForgetPassword" component={ForgetPasswordEnterEmailPage} />
    <AuthStack.Screen name="Reset" component={ResetPage} />
  </AuthStack.Navigator>
);

const RootStackScreen: FC = () => {
  const [_data, setData] = useState<any>({});
  const navigation = useNavigation<GenericNavigationProps>();

  useEffect(() => {
    (async () => {
      try {
        const userData = await cacheService.get('user');
        setData(JSON.parse(userData || '{}'));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setData({});
      }
    })();
  }, []);

  useEffect(() => {
    const requestUserPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          await sendFcmToken();
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    const sendFcmToken = async () => {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const deviceToken = await messaging().getToken();
        await cacheService.put('@DeviceToken', deviceToken);
        console.log('FCM Token:', deviceToken);
      } catch (err) {
        console.error('Token extraction error:', err);
      }
    };

    requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('New FCM message:', JSON.stringify(remoteMessage));
      notificationManager.showNotification(
        remoteMessage?.messageId,
        remoteMessage?.data?.title || remoteMessage?.notification?.title,
        remoteMessage?.data?.message || remoteMessage?.notification?.body,
        remoteMessage?.data,
        remoteMessage?.options,
        remoteMessage?.date || new Date(Date.now() + 3000),
      );
    });
    return unsubscribe;
  }, []); // No need for requestUserPermission as dependency

  useLayoutEffect(() => {
    (async () => {
      try {
        const toks = await cacheService.get('login-user');
        const firstTime = await cacheService.get('firstTime');
        if (firstTime !== 'Yes') {
          navigation.navigate('Intro');
        } else if (toks.length === 0) {
          navigation.navigate('Login');
        } else {
          navigation.navigate('LoginBack');
        }
      } catch (error) {
        console.error('Error in token fetch:', error);
      }
    })();
  }, [navigation]);

  useEffect(() => {
    navigationService.navigation = navigation;
  }, [navigation]);

  return (
    <RootStack.Navigator>
      <Fragment>
        <RootStack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Intro" component={IntroPage} options={{ headerShown: false }} />
        <RootStack.Screen name="Dashboard" component={MainStackScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="SetTransactionPin" component={SetTransactionPin} options={{ headerShown: false }} />
      </Fragment>
    </RootStack.Navigator>
  );
};

export { AuthStackScreen, RootStackScreen };
