import env from '@env';
// import { useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
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

export default function NotificationContainer({ children }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  // const queryClient = useQueryClient();
  // const data: any = queryClient.getQueryData(['user']);
  const [data, setData] = useState();
  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const AppToken = await cacheService.get('login-user');
        console.log(modelName, AppToken);
        const res = await cacheService.get('user');
        setData(JSON.parse(res || {}));
        return res;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    console.log(data, 'bird', modelName);
    if (data) {
      registerForPushNotificationsAsync().then(token => {
        console.log(data, 'bird', modelName, 'aje', token);
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

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  async function registerForPushNotificationsAsync() {
    try {
      let token;
      let deviceToken;
      if (Device.isDevice) {
        console.log('jjekhjehkjehk', Device.isDevice);
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          // console.log("Failed to get push token for push notification!");
          return;
        }
        deviceToken = (await Notifications.getDevicePushTokenAsync()).data;
        token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@cardvest/cardvest' })).data;
        console.log(modelName, 'forco', deviceToken, token);
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
    console.log(modelName, token);
    try {
      const AppToken = await cacheService.get('login-user');
      console.log(modelName, token);
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
      console.log(JSON.stringify(error));
    }
    // pushTokenApi.registerPushTokenMock(tokenData);
  };

  return children;
}
