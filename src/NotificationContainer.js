import env from '@env';
// import { useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Linking, Platform } from 'react-native';

// import pushTokenApi from '../api/push-token';
// import useAuth from '../auth/useAuth';

// Push Notification implementation.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const modelName = Device.modelName;

const processNotification = response => {
  const notificationContent = response?.notification?.request?.content;
  let url = notificationContent.data?.url;
  const type = notificationContent.data?.type;
  console.log(response, 'response');
  // CARDVEST Notification data structure
  // export interface Data {
  //   type: string; // "transactional | news"
  //   url: string; // "cardvest://transactions/<reference>"
  // }

  if (type === 'news') {
    url += `?title=${notificationContent.title}&body=${notificationContent.body}`;
  }

  Linking.openURL(url);
};
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };
  console.log(message, 'kjdkd');

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export default function NotificationContainer({ children }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [data, setData] = useState();
  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const AppToken = await cacheService.get('login-user');
        console.log(modelName, AppToken, 'first');
        const res = await cacheService.get('user');
        if (JSON.parse(res || {})?.id !== data?.id) {
          setData(JSON.parse(res || {}));
          console.log('locked in ', modelName, AppToken);
        }
        return res;
      } catch (error) {
        console.log('errr' - JSON.stringify(error));
      }
    }
    fetchData();
  });

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    console.log('bird', modelName, lastNotificationResponse);
    if (data) {
      console.log('bird', modelName, 'naje000');
      registerForPushNotificationsAsync().then(token => {
        console.log(
          'data',
          'we have made our promise and returning data for you to send to backend',
          modelName,
          'aje',
          token,
        );
        if (token) sendTokenToBackend(token);
      });
    }

    if (lastNotificationResponse) {
      processNotification(lastNotificationResponse);
    }

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      processNotification(response);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('kljkdkd', notification);
      setNotification(notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  async function registerForPushNotificationsAsync() {
    try {
      let token;
      let deviceToken;
      let devicePushToken = await cacheService.get('@DeviceToken');
      console.log('hjehkjehk', Device.isDevice);
      if (Device.isDevice) {
        console.log('Device is physical', Device.isDevice);
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        console.log(existingStatus, 'Permission does exist', Device.isDevice);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          // console.log("Failed to get push token for push notification!");
          return;
        }
        console.log('floak', token);
        deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
        console.log(existingStatus, 'jjekhjehkjehk', Device.isDevice, deviceToken);
        token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@flip_digitals/cardvest' })).data;
        console.log(modelName, 'forco', deviceToken, token, 'flip_digitals');
      } else {
        // console.log("Must use a physical device for Push Notifications");
        return;
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      return { token, deviceToken };
    } catch (error) {
      console.log(error);
    }
  }

  const sendTokenToBackend = async ({ token, deviceToken }) => {
    // sendPushNotification(token);
    console.log('phone', modelName, token, 'is the token and device token by my side', deviceToken);
    try {
      const AppToken = await cacheService.get('login-user');
      console.log(modelName, token, 'token is here and want to send push notification');
      const res = await axios.post(
        `${env.API_URL}/push-notification/register`,
        {
          device_token: deviceToken,
          expo_token: token,
          device_desc: modelName,
          user_id: data?.id,
          type: 'register',
        },
        {
          headers: { Authorization: `Bearer ${AppToken}` },
        },
      );
      console.log('Your Expo Token is:', token, 'res is', res);
    } catch (error) {
      console.log('posing err -', JSON.stringify(error));
    }
    // pushTokenApi.registerPushTokenMock(tokenData);
  };

  return children;
}
