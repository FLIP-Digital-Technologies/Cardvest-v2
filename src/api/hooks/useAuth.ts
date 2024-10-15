import { useMixpanel } from '@MixpanelAnalytics';
import { createUser, getUserData, loginUser } from '@api/Auth/auth';
import { LoginUserRequestPayload } from '@api/users/types';
import env from '@env';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import { Adjust, AdjustEvent } from 'react-native-adjust';

const useTrackAnalytics = (eventName: string, data: Record<string, any>) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

  return analytics().logEvent(eventName, {
    ...data,
    event_date: currentDate,
    event_time: currentTime,
  });
};

const useMixpanelUser = (userData: any, mixpanel: any, event: string) => {
  mixpanel.identify(`${userData.id}`);
  mixpanel.getPeople().set({
    username: userData.username,
    email: userData.email,
    phone_number: userData.phonenumber,
  });
  mixpanel.track(event);
};

const handleAdjustEvent = (userId: string, email: string) => {
  const adjustEvent = new AdjustEvent(env.ACC_CRT);
  adjustEvent.setTransactionId(`${userId}-${email}`);
  Adjust.trackEvent(adjustEvent);
};

const handleToast = (status: 'success' | 'error', message: string) => {
  onOpenToast({
    status,
    message,
  });
};

function useCreateUser() {
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel] = useMixpanel();

  return useMutation(
    ['new-user'],
    (userData: any) => createUser(userData),
    {
      onSuccess: async ({ data }) => {
        const { email, id, username, phonenumber, nationality } = data;

        await navigation.navigate('Verify', { email });
        await cacheService.put('firstTime', 'Yes');

        // Track user in Mixpanel
        useMixpanelUser(data, mixpanel, 'SignUp');

        // Track event in Adjust
        handleAdjustEvent(id, email);

        // Firebase Analytics
        await useTrackAnalytics('registered', {
          username,
          email_address: email,
          phone_number: phonenumber,
          country: nationality,
        });

        handleToast('success', 'User created successfully, Kindly login with your email and password.');
      },
      onError: (data: any) => {
        const message = data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred while creating your account';
        handleToast('error', message);
      },
    },
  );
}

function useLoginUser() {
  const navigation = useNavigation<GenericNavigationProps>();
  const queryClient = useQueryClient();
  const [mixpanel] = useMixpanel();

  return useMutation(
    ['login-user'],
    ({ email, password }: LoginUserRequestPayload) => loginUser({ email, password }),
    {
      onSuccess: async ({ data }) => {
        const { user, token } = data;
        const { email_verified, id, username, firstname, lastname, phonenumber, pin_set } = user;

        if (!email_verified) {
          await cacheService.put('temp-login-user', token);
          await navigation.navigate('ResendVerify', { email: user.email });
        } else {
          const currency = await cacheService.get('defaultCurrency') || 'NGN';

          await cacheService.put('login-user', token);
          await queryClient.setQueryData(['login-user'], token);
          await queryClient.setQueryData([`user-currency`], currency);

          const nextScreen = pin_set ? 'Dashboard' : 'SetTransactionPin';
          await navigation.navigate(nextScreen);

          const userData = await getUserData(token);

          // Track user in Mixpanel
          useMixpanelUser(user, mixpanel, 'Login');

          // Firebase Analytics
          await useTrackAnalytics('login', {
            username,
            user_id: id,
          });

          await queryClient.setQueryData([`user`], userData?.data);
          await cacheService.put('user', userData?.data);
          await cacheService.del('temp-login-user');
          await cacheService.put('firstTime', 'Yes');

          handleToast('success', 'Login successful');
        }
      },
      onError: (data: any) => {
        const message = data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred';
        handleToast('error', message);
      },
    },
  );
}

export { useCreateUser, useLoginUser };
