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
// import { useQueryClient, useQuery } from '@tanstack/react-query';
import navigationService from '@utils/Nav';
import { cacheService } from '@utils/cache';
import React, { FC, useEffect, useLayoutEffect } from 'react';
import { notificationManager } from '../NotificationManager';
// import { routeOverlayOption } from './routeOptions';
import { MainStackScreen } from './stacks/MainStack';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const AuthStackScreen: FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="LoginBack"
        component={LoginBackPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUpStep2"
        component={Step2}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUpStep3"
        component={Step3}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Verify"
        component={VerifyPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ResendVerify"
        component={ResendVerifyEmailPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordEnterEmailPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Reset"
        component={ResetPage}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export const RootStackScreen: FC = () => {
  const [data, setData] = React.useState();
  React.useLayoutEffect(() => {
    async function fetchData() {
      try {
        const res = await cacheService.get('user');
        setData(JSON.parse(res || {}));
        return res;
      } catch (error) {
        console.log('erarr', JSON.stringify(error));
      }
    }
    fetchData();
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      sendFcmToken();
      console.log('Authorization status:', authStatus);
    }
  }

  React.useEffect(() => {
    requestUserPermission();
  }, []);

  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('Your Firebase Token is:', 'deviceToken');
      const deviceToken = await messaging().getToken();
      await cacheService.put('@DeviceToken', deviceToken);
      console.log('Your Firebase Token is:', deviceToken);

      // const res = await axios.post(`${env.API_URL}/push-notification/register`, {
      //   token: deviceToken,
      //   description: deviceInfoModule.getDeviceId(),
      //   user_id: data?.id,
      //   type: 'register',
      // });
      console.log('Your Firebase Token is:', deviceToken, 'res');
    } catch (err) {
      //Do nothing
      console.error(err);
      return;
    }
  };

  React.useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      notificationManager.showNotification(
        remoteMessage?.messageId,
        remoteMessage?.data?.title || remoteMessage?.notification?.title,
        remoteMessage?.data?.message || remoteMessage?.notification?.body,
        remoteMessage?.data,
        remoteMessage?.options,
        remoteMessage?.date || new Date(Date.now() + 30000), // TODO: god abeg
      );
    });
    return unsubscribe;
  }, []);
  const navigation = useNavigation<GenericNavigationProps>();
  useLayoutEffect(() => {
    async function fetchToks() {
      try {
        const toks = await cacheService.get('login-user');
        const res = await cacheService.get('firstTime');
        if (res !== 'Yes') {
          await navigation.navigate('Intro');
          return;
        } else if (res === 'Yes' && toks.length === 0) {
          await navigation.navigate('Login');
          return;
        } else if (res === 'Yes' && toks.length > 0) {
          navigation.navigate('LoginBack');
        }
      } catch (error) {
        return false;
      }
    }
    fetchToks();
  }, []);
  useEffect(() => {
    navigationService.navigation = navigation;
  }, [navigation]);
  return (
    <RootStack.Navigator>
      <React.Fragment>
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Intro"
          component={IntroPage}
          options={{
            headerShown: false,
          }}
        />
      </React.Fragment>
      <React.Fragment>
        <RootStack.Screen
          name="Dashboard"
          component={MainStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="SetTransactionPin"
          component={SetTransactionPin}
          options={{
            headerShown: false,
          }}
        />
      </React.Fragment>
    </RootStack.Navigator>
  );
};
